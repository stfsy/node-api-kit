#!/bin/bash

set -ex

declare -r inputPath=$1

generateDocsForPath() {
  local path=$1
  local filename="$(basename -- $path .js)"
  local folder="$(dirname $path)"

  local input="${path}"
  local output="$folder/$(echo $filename | awk '{ print toupper($0) }' | tr '-' '_')".md

  npx documentation build $input \
    --markdown-toc true \
    --format md \
    --output $output \
    --shallow 
}

if [ -z $inputPath ]; then
  echo No Path given. Will create documentation from scratch.

  find . -mindepth 1 -wholename "./lib/*/*.js"|while read path; do
    generateDocsForPath $path
  done
else
  echo Generating documentation for $inputPath
  generateDocsForPath $inputPath
fi