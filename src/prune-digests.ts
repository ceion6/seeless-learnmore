import fs from "node:fs";
import path from "node:path";
import { toCstDateStr } from "./date.ts";

const DATE_DIR_RE = /^\d{4}-\d{2}-\d{2}$/;

export function pruneRawSnapshots(digestsDir: string, today: string, retentionDays = 7): string[] {
  const cutoff = new Date(`${today}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - retentionDays + 1);
  const cutoffDate = cutoff.toISOString().slice(0, 10);
  const deleted: string[] = [];

  for (const entry of fs.readdirSync(digestsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !DATE_DIR_RE.test(entry.name) || entry.name >= cutoffDate) continue;

    const rawPath = path.join(digestsDir, entry.name, "raw-data.json");
    if (!fs.existsSync(rawPath)) continue;
    fs.rmSync(rawPath);
    deleted.push(rawPath);
  }

  return deleted;
}

function main(): void {
  const deleted = pruneRawSnapshots("digests", toCstDateStr(new Date()));
  console.log(`  Removed ${deleted.length} expired raw snapshots`);
  for (const filepath of deleted) console.log(`  Removed ${filepath}`);
}

if (process.argv[1]?.endsWith("prune-digests.ts")) main();
