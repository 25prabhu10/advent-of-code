#!/bin/bash

if [ $# != 1 ]; then
    echo "Usage: $(basename "$0") <day-number>" >&2
    exit 1
fi

if [ ! -d .git ]; then
    echo "must be run from root of advent-of-code repository" >&2
    exit 1
fi

name="$(printf "aoc%02d" "$1")"

mkdir "$name"

touch "$name/index.js"
touch "$name/main.py"
touch "$name/input.txt"
touch "$name/problem.txt"
touch "$name/example.txt"
