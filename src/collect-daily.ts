import "dotenv/config";
import { collectDailySnapshot, saveCollectedSnapshot } from "./collect.ts";
import { pruneRawSnapshots } from "./prune-digests.ts";
import { saveWebState } from "./web.ts";

async function main(): Promise<void> {
  const { snapshot, webState } = await collectDailySnapshot();
  const snapshotPath = saveCollectedSnapshot(snapshot);
  const prunedSnapshots = pruneRawSnapshots("digests", snapshot.dateStr);
  saveWebState(webState);
  console.log(`  Saved ${snapshotPath}`);
  console.log(`  Removed ${prunedSnapshots.length} expired raw snapshots`);
  console.log("  Saved digests/web-state.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
