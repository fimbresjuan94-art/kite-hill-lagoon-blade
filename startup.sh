#!/bin/sh
# Revive contract: bring the preview up if it is down. Idempotent.
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev > /tmp/ridge-dev.log 2>&1 &
exit 0
