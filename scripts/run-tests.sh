#!/bin/bash
set -e
export NODE_ENV=test
pnpm exec vitest run --config vitest.config.ts
