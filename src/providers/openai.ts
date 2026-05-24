/**
 * OpenAI provider — wraps the openai SDK.
 *
 * Env vars:
 *   OPENAI_API_KEY   - API key
 *   OPENAI_BASE_URL  - endpoint override (optional)
 *   OPENAI_MODEL     - model name (default: gpt-4o)
 */

import { OpenAICompatibleProvider, parseModelFallbacks } from "./openai-compatible.ts";

export class OpenAIProvider extends OpenAICompatibleProvider {
  readonly name = "openai";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string; fallbackModels?: string[] }) {
    const model = opts?.model ?? process.env["OPENAI_MODEL"] ?? "gpt-4o";
    super({
      apiKey: opts?.apiKey ?? process.env["OPENAI_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["OPENAI_BASE_URL"],
      model,
      fallbackModels: opts?.fallbackModels ?? parseModelFallbacks(process.env["OPENAI_MODEL_FALLBACKS"]),
    });
  }
}
