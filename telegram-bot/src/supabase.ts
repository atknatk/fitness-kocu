import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserKey = "atakan" | "tuvik";

export interface UserProgress {
  currentWeightKg: number | null;
  weightChange: number;
  workoutStreak: number;
  waterYesterday: number;
  checklistYesterday: { completed: number; total: number };
  weeklyWorkoutsCompleted: number;
  weeklyWorkoutsTotal: number;
}

export async function getProgress(
  userKey: UserKey,
  startingWeightKg: number
): Promise<UserProgress> {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const [weightRes, streakRes, waterRes, checklistRes, workoutRes] =
    await Promise.all([
      // Latest weight
      supabase
        .from("weight_logs")
        .select("weight_kg")
        .eq("user_key", userKey)
        .order("date", { ascending: false })
        .limit(1),

      // Workout streak
      supabase
        .from("streaks")
        .select("current_streak")
        .eq("user_key", userKey)
        .eq("streak_type", "workout")
        .limit(1),

      // Yesterday's water
      supabase
        .from("water_intake")
        .select("glasses")
        .eq("user_key", userKey)
        .eq("date", yesterday)
        .limit(1),

      // Yesterday's checklist
      supabase
        .from("daily_checklist")
        .select("completed")
        .eq("user_key", userKey)
        .eq("date", yesterday),

      // This week's workouts (last 7 days)
      supabase
        .from("workout_logs")
        .select("completed, date, exercise_id")
        .eq("user_key", userKey)
        .gte("date", new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0])
        .lte("date", today),
    ]);

  const currentWeight =
    weightRes.data?.[0]?.weight_kg ?? null;

  const weightChange = currentWeight
    ? Number((currentWeight - startingWeightKg).toFixed(1))
    : 0;

  const workoutStreak =
    streakRes.data?.[0]?.current_streak ?? 0;

  const waterYesterday =
    waterRes.data?.[0]?.glasses ?? 0;

  const checklistItems = checklistRes.data ?? [];
  const checklistCompleted = checklistItems.filter(
    (item: { completed: boolean }) => item.completed
  ).length;

  // Count unique workout days in last 7 days
  const workoutDates = new Set(
    (workoutRes.data ?? [])
      .filter((log: { completed: boolean }) => log.completed)
      .map((log: { date: string }) => log.date)
  );

  return {
    currentWeightKg: currentWeight,
    weightChange,
    workoutStreak,
    waterYesterday,
    checklistYesterday: {
      completed: checklistCompleted,
      total: checklistItems.length || 5,
    },
    weeklyWorkoutsCompleted: workoutDates.size,
    weeklyWorkoutsTotal: 5,
  };
}
