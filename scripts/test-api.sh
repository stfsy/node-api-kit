#!/bin/bash

set -ex

test() {
    # do not allow --only if running on cicd environment
    if [[ -z "${GITHUB_ACTIONS}" ]]; then
        npm run test
    else
        npm run test:ci
    fi
}

# check whether we are connected to the internet
# before downloading dependencies
resetDependencies() {
    # reset tracing dependencies only if we are not running on GH
    if [[ -z "${GITHUB_ACTIONS}" ]]; then
        npm un @discue/open-telemetry-tracing
        npm -D i @discue/open-telemetry-tracing
    fi
}

test

curl --head www.google.com &>"/dev/null"
if [[ "${?}" == 0 ]]; then
    trap resetDependencies ERR EXIT
    
    # test with noop tracing library now
    npm i -D @discue/open-telemetry-tracing@npm:@discue/open-telemetry-tracing-noop
    
    test
fi