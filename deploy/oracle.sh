#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${ORACLE_HOST:-ubuntu@144.24.117.17}"
KEY="${ORACLE_SSH_KEY:-$HOME/.ssh/oracle-ubuntu.key}"

rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  -e "ssh -i $KEY" \
  "$ROOT/" \
  "$HOST:~/yash-suthar-portfolio/"

ssh -i "$KEY" "$HOST" 'cd ~/yash-suthar-portfolio && docker compose up -d --build'
