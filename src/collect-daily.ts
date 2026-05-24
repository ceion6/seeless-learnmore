import "dotenv/config";
import { collectDailySnapshot, saveCollectedSnapshot } from "./collect.ts";
import { saveWebState } from "./web.ts";

async function main(): Promise<void> {
  const { snapshot, webState } = await collectDailySnapshot();
  const snapshotPath = saveCollectedSnapshot(snapshot);
  saveWebState(webState);
  console.log(`  Saved ${snapshotPath}`);
  console.log("  Saved digests/web-state.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
