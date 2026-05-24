/**
 * Base class for OpenAI-compatible providers.
 *
 * Shared by OpenAI, GitHub Copilot, and OpenRouter providers.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types.ts";

function shouldTryNextModel(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const code = String((err as { code?: unknown })?.code ?? "").toLowerCase();
  const type = String((err as { type?: unknown })?.type ?? "").toLowerCase();
  const msg = String(err).toLowerCase();

  return (
    status === 403 ||
    status === 429 ||
    code.includes("quota") ||
    code.includes("rate") ||
    type.includes("quota") ||
    type.includes("rate") ||
    msg.includes("quota") ||
    msg.includes("rate limit") ||
    msg.includes("rate_limit") ||
    msg.includes("too many requests") ||
    msg.includes("permission_error") ||
    msg.includes("insufficient") ||
    msg.includes("exhausted")
  );
}

export function parseModelFallbacks(value?: string): string[] {
  return (value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildModelChain(primary: string, fallbacks: string[]): string[] {
  const seen = new Set<string>();
  const chain: string[] = [];

  for (const model of [primary, ...fallbacks]) {
    if (seen.has(model)) continue;
    seen.add(model);
    chain.push(model);
  }

  return chain;
}

export abstract class OpenAICompatibleProvider implements LlmProvider {
  abstract readonly name: string;
  protected readonly client: OpenAI;
  protected readonly model: string;
  protected readonly models: string[];

  constructor(opts: { apiKey?: string; baseURL?: string; model: string; fallbackModels?: string[] }) {
    this.model = opts.model;
    this.models = buildModelChain(opts.model, opts.fallbackModels ?? []);
    this.client = new OpenAI({
      apiKey: opts.apiKey,
      baseURL: opts.baseURL,
    });
  }

  async call(prompt: string, maxTokens: number): Promise<string> {
    let lastError: unknown;

    for (let i = 0; i < this.models.length; i++) {
      const model = this.models[i]!;
      try {
        const response = await this.client.chat.completions.create({
          model,
          max_completion_tokens: maxTokens,
          messages: [{ role: "user", content: prompt }],
        });
        const text = response.choices[0]?.message?.content;
        if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
        return text;
      } catch (err) {
        lastError = err;
        const nextModel = this.models[i + 1];
        if (!nextModel || !shouldTryNextModel(err)) throw err;
        console.error(`[providers/${this.name}] model "${model}" unavailable, trying "${nextModel}"`);
      }
    }

    throw lastError instanceof Error ? lastError : new Error(`All ${this.name} models failed`);
  }
}
