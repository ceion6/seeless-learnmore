/**
 * OpenRouter provider — OpenAI-compatible endpoint via openrouter.ai.
 *
 * Env vars:
 *   OPENROUTER_API_KEY  - API key
 *   OPENROUTER_MODEL    - model name (default: anthropic/claude-sonnet-4)
 */

import { OpenAICompatibleProvider, parseModelFallbacks } from "./openai-compatible.ts";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export class OpenRouterProvider extends OpenAICompatibleProvider {
  readonly name = "openrouter";

  constructor(opts?: { apiKey?: string; model?: string; fallbackModels?: string[] }) {
    const model = opts?.model ?? process.env["OPENROUTER_MODEL"] ?? "anthropic/claude-sonnet-4";
    super({
      apiKey: opts?.apiKey ?? process.env["OPENROUTER_API_KEY"],
      baseURL: OPENROUTER_BASE_URL,
      model,
      fallbackModels: opts?.fallbackModels ?? parseModelFallbacks(process.env["OPENROUTER_MODEL_FALLBACKS"]),
    });
  }
}
