import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { UserContext, MessageType, buildPrompt } from "./prompts";

const MODEL_ID = "eu.anthropic.claude-haiku-4-5-20251001-v1:0";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "eu-central-1",
});

export async function generateMessage(
  context: UserContext,
  messageType: MessageType
): Promise<string> {
  const { system, user } = buildPrompt(context, messageType);

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 512,
    system,
    messages: [
      {
        role: "user",
        content: user,
      },
    ],
    temperature: 0.8,
  };

  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));

  const text = responseBody.content?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Bedrock");
  }

  return text.trim();
}
