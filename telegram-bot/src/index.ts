import {
  getUser,
  getUsers,
  getCurrentWeek,
  getTodayDayIndex,
  getTodayPlan,
  BotUser,
  UserKey,
} from "./users";
import { getProgress } from "./supabase";
import { buildContext } from "./context";
import { generateMessage } from "./bedrock";
import { sendTelegramMessage } from "./telegram";
import { MessageType } from "./prompts";
import {
  getTodayMeals,
  formatMealMessage,
  generateShoppingList,
} from "./meals";

// =====================================================================
// Lambda Event Types
// =====================================================================

interface BotEvent {
  messageType: MessageType;
  target: "atakan" | "tuvik" | "all";
}

// =====================================================================
// Lambda Handler
// =====================================================================

export async function handler(event: BotEvent): Promise<{
  statusCode: number;
  body: string;
}> {
  console.log("Event received:", JSON.stringify(event));

  const { messageType, target } = event;

  if (!messageType || !target) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing messageType or target" }),
    };
  }

  const users: BotUser[] =
    target === "all" ? getUsers() : [getUser(target as UserKey)];

  const results: { user: string; success: boolean; error?: string }[] = [];

  for (const user of users) {
    try {
      console.log(
        `Processing ${messageType} for ${user.name} (${user.key})...`
      );

      if (!user.chatId) {
        throw new Error(`No chat ID configured for ${user.key}`);
      }

      let message: string;

      if (messageType === "meal_plan") {
        // Direct format - no AI needed
        const dayIndex = getTodayDayIndex();
        const currentWeek = getCurrentWeek(user);
        const todayPlan = getTodayPlan(user, currentWeek, dayIndex);
        const meals = getTodayMeals(user.key, dayIndex);
        const waterTarget = user.programType === "female_recomp" ? 8 : 10;
        message = formatMealMessage(
          meals,
          dayIndex,
          todayPlan.type,
          user.name,
          waterTarget
        );
      } else if (messageType === "shopping_list") {
        // Direct format - no AI needed
        message = generateShoppingList(user.key);
      } else {
        // AI-generated messages via Bedrock
        const progress = await getProgress(user.key, user.startingWeightKg);
        console.log(
          `Progress fetched for ${user.name}:`,
          JSON.stringify(progress)
        );

        const context = buildContext(user, progress);
        console.log(
          `Context built for ${user.name}, week ${context.currentWeek + 1}`
        );

        message = await generateMessage(context, messageType);
      }

      console.log(
        `Message for ${user.name}: ${message.substring(0, 80)}...`
      );

      await sendTelegramMessage(user.chatId, message);
      console.log(`Message sent to ${user.name} successfully`);

      results.push({ user: user.key, success: true });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : String(error);
      console.error(`Error processing ${user.name}:`, errorMsg);
      results.push({ user: user.key, success: false, error: errorMsg });
    }
  }

  const allSucceeded = results.every((r) => r.success);

  return {
    statusCode: allSucceeded ? 200 : 207,
    body: JSON.stringify({ results }),
  };
}

// =====================================================================
// Local execution support (for testing)
// =====================================================================

if (require.main === module) {
  const messageType = (process.argv[2] as MessageType) || "morning";
  const target = (process.argv[3] as "atakan" | "tuvik" | "all") || "all";

  console.log(`\nRunning locally: messageType=${messageType}, target=${target}\n`);

  handler({ messageType, target })
    .then((result) => {
      console.log("\nResult:", JSON.stringify(result, null, 2));
    })
    .catch((err) => {
      console.error("Fatal error:", err);
      process.exit(1);
    });
}
