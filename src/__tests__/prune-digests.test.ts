import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { pruneRawSnapshots } from "../prune-digests.ts";

const tempDirs: string[] = [];

function createDigest(root: string, date: string, withRaw = true): void {
  const dir = path.join(root, date);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "ai-radar.md"), "keep");
  if (withRaw) fs.writeFileSync(path.join(dir, "raw-data.json"), "{}");
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe("pruneRawSnapshots", () => {
  it("keeps seven days of raw snapshots and all rendered reports", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "seeless-prune-"));
    tempDirs.push(root);
    createDigest(root, "2026-06-05");
    createDigest(root, "2026-06-06");
    createDigest(root, "2026-06-12");

    const deleted = pruneRawSnapshots(root, "2026-06-12");

    expect(deleted).toEqual([path.join(root, "2026-06-05", "raw-data.json")]);
    expect(fs.existsSync(path.join(root, "2026-06-05", "ai-radar.md"))).toBe(true);
    expect(fs.existsSync(path.join(root, "2026-06-06", "raw-data.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "2026-06-12", "raw-data.json"))).toBe(true);
  });

  it("ignores non-date folders and dates without raw snapshots", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "seeless-prune-"));
    tempDirs.push(root);
    createDigest(root, "2026-05-01", false);
    fs.mkdirSync(path.join(root, "archive"));
    fs.writeFileSync(path.join(root, "web-state.json"), "{}");

    expect(pruneRawSnapshots(root, "2026-06-12")).toEqual([]);
    expect(fs.existsSync(path.join(root, "web-state.json"))).toBe(true);
  });
});
