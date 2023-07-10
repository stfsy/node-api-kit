#!/bin/bash

set -e

if [ -z $inputPath ]; then
  echo No Path given. Will create documentation from scratch.

  find . -mindepth 1 -wholename "./lib/*/*.md"|while read path; do
    echo "Removing $path"
    rm $path
  done
fi