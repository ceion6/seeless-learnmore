#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "[publish-local] expected branch 'main', got '$CURRENT_BRANCH'"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "[publish-local] tracked changes detected; commit or stash them before running automation"
  exit 1
fi

if [[ -z "${GITHUB_TOKEN:-}" ]] && command -v gh >/dev/null 2>&1; then
  GITHUB_TOKEN="$(gh auth token 2>/dev/null || true)"
  export GITHUB_TOKEN
fi

if [[ -z "${DIGEST_REPO:-}" ]]; then
  REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
  case "$REMOTE_URL" in
    git@github.com:*)
      DIGEST_REPO="${REMOTE_URL#git@github.com:}"
      DIGEST_REPO="${DIGEST_REPO%.git}"
      ;;
    https://github.com/*)
      DIGEST_REPO="${REMOTE_URL#https://github.com/}"
      DIGEST_REPO="${DIGEST_REPO%.git}"
      ;;
  esac
  export DIGEST_REPO
fi

echo "[publish-local] pulling latest main..."
git pull --rebase origin main

echo "[publish-local] installing dependencies..."
corepack pnpm install --frozen-lockfile

TODAY="$(date +%F)"
RAW_SNAPSHOT_FILE="digests/${TODAY}/raw-data.json"
if [[ -f "$RAW_SNAPSHOT_FILE" ]]; then
  export RAW_SNAPSHOT_PATH="$RAW_SNAPSHOT_FILE"
  echo "[publish-local] using collected snapshot ${RAW_SNAPSHOT_FILE}"
elif [[ "${PUBLISH_REQUIRE_SNAPSHOT:-0}" == "1" ]]; then
  echo "[publish-local] required snapshot missing: ${RAW_SNAPSHOT_FILE}"
  exit 1
else
  echo "[publish-local] snapshot missing; falling back to live fetch"
fi

echo "[publish-local] running daily digest..."
corepack pnpm start

WEEKDAY="$(date +%u)"
MONTHDAY="$(date +%d)"

if [[ "$WEEKDAY" == "1" ]]; then
  echo "[publish-local] running weekly rollup..."
  corepack pnpm weekly
fi

if [[ "$MONTHDAY" == "01" ]]; then
  echo "[publish-local] running monthly rollup..."
  corepack pnpm monthly
fi

echo "[publish-local] updating manifest..."
corepack pnpm manifest

git add digests/ manifest.json feed.xml

if git diff --cached --quiet; then
  echo "[publish-local] no new digest changes"
  exit 0
fi

git config user.name "${GIT_AUTHOR_NAME:-seeless-local-bot}"
git config user.email "${GIT_AUTHOR_EMAIL:-seeless-local-bot@users.noreply.github.com}"

git commit -m "digest: ${TODAY} local publish"
git push origin main

echo "[publish-local] published successfully"
