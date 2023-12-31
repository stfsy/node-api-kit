#!/bin/bash

set -e

export API_HOST_BASE_URL=http://127.0.0.1:3000
export FIREBASE_CONFIG='{ "projectId": "test-project", "locationId": "test-location" }'
export GCLOUD_PROJECT=test-project
export FUNCTION_TARGET=test-function
export K_REVISION=test-revision
export K_SERVICE=test-service
export NODE_ENV=development
export NODE_OPTIONS="--require ./tracing/tracing.cjs --trace-warnings"

export DSQ_OT_USE_SIMPLE_SPAN_PROCESSOR=true
npx nodemon lib/api