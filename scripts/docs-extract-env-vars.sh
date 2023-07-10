#!/bin/bash

set -e

declare -r prefix=$(grep -aoE -e "ENV_VAR_PREFIX = .*" lib/configuration/service.js | grep -aoE -e "'[A-Z_].*'" | tr -d "'" )
declare -r suffix=""

grep -aoE -e "getApiEnvVar\('[A-Z_].*'," lib/configuration/service.js | grep -aoE -e "'[A-Z_].*'" | tr -d "'" | sed "s/.*/${prefix}_&/"
grep -aoE -e "getEnvVar\('[A-Z_].*=" lib/configuration/service.js | grep -aoE -e "'[A-Z_].*'" | tr -d "'"