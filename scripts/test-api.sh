#!/bin/bash

source ./.env.dev

if [[ -z "${GITHUB_ACTIONS}" ]]; then
  npm run test
else
  npm run test:ci
fi