import { OpenAICompatibleProvider, parseModelFallbacks } from "./openai-compatible.ts";

export class DeepSeekProvider extends OpenAICompatibleProvider {
  readonly name = "deepseek";

  constructor(opts?: { apiKey?: string; model?: string; fallbackModels?: string[] }) {
    const model = opts?.model ?? process.env["DEEPSEEK_MODEL"] ?? "deepseek-chat";
    super({
      apiKey: opts?.apiKey ?? process.env["DEEPSEEK_API_KEY"],
      baseURL: "https://api.deepseek.com",
      model,
      fallbackModels: opts?.fallbackModels ?? parseModelFallbacks(process.env["DEEPSEEK_MODEL_FALLBACKS"]),
    });
  }
}
