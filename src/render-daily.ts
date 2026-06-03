import "dotenv/config";
import fs from "node:fs";
import { loadCollectedSnapshot, rawSnapshotPath } from "./collect.ts";
import { saveFallbackDailyReports } from "./daily-fallback.ts";
import { toCstDateStr } from "./date.ts";

function resolveSnapshotPath(): string {
  if (process.env["RAW_SNAPSHOT_PATH"]) return process.env["RAW_SNAPSHOT_PATH"];
  if (process.argv[2]) return process.argv[2]!;
  return rawSnapshotPath(toCstDateStr(new Date()));
}

async function main(): Promise<void> {
  const snapshotPath = resolveSnapshotPath();
  if (!fs.existsSync(snapshotPath)) {
    throw new Error(`snapshot not found: ${snapshotPath}`);
  }

  const snapshot = loadCollectedSnapshot(snapshotPath);
  const { radarPath, opportunityPath } = saveFallbackDailyReports(snapshot);

  if (radarPath) {
    console.log(`  Saved ${radarPath}`);
  } else {
    console.log("  Preserved existing ai-radar.md");
  }

  if (opportunityPath) {
    console.log(`  Saved ${opportunityPath}`);
  } else {
    console.log("  Preserved existing ai-opportunity.md");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

