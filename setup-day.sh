#!/usr/bin/env bash

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

# create files and directory for the given day
mkdir "$name"

touch "$javascriptFile"
touch "$pythonFile"
touch "$name/input.txt"
touch "$name/example.txt"
touch "$name/README.md"


# templates
javascriptTemplate="import { readFile } from 'node:fs/promises'

const txt = await readFile('./example.txt', { encoding: 'utf-8' })
"

pythonTemplate="\"\"\"
Advent of Code 2022, Day $(printf %02d "$1")
\"\"\"

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, \"example.txt\")

with open(INPUT_FILE, \"r\", encoding=\"UTF-8\") as str_file:
    txt = str_file.read().splitlines()
    "

echo "$javascriptTemplate" > "$javascriptFile"
echo "$pythonTemplate" > "$pythonFile"