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

javascriptFile="$name/index.js"
pythonFile="$name/main.py"

mkdir "$name"

touch "$javascriptFile"
touch "$pythonFile"
touch "$name/input.txt"
touch "$name/problem.txt"
touch "$name/example.txt"


javascriptTemplate="import { readFile } from 'node:fs/promises'

const str = await readFile('./example.txt', { encoding: 'utf-8' })
"

pythonTemplate="with open(\"./example.txt\", \"r\", encoding=\"UTF-8\") as str_file:
    str = str_file.read()
    "


echo "$javascriptTemplate" > "$javascriptFile"
echo "$pythonTemplate" > "$pythonFile"