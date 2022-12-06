"""
Advent of Code 2022, Day 01
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    # split on empty lines
    text_content = str_file.read().split("\n\n")

    # store total calories for each elf
    calories_per_elf = [map(int, line.splitlines()) for line in text_content]
    total_calories_per_elf = [sum(elf) for elf in calories_per_elf]

    # part 1
    print(max(total_calories_per_elf))

    # part 2
    total_calories_per_elf.sort(reverse=True)
    print(sum(total_calories_per_elf[:3]))
