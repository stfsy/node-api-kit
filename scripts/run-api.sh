#!/bin/bash

set -e

export API_HOST_BASE_URL=http://localhost:3000
export NODE_OPTIONS="--require ./tracing.cjs --trace-warnings"

npx nodemon node lib/index