"""
Advent of Code 2022, Day 07
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    txt = str_file.read().splitlines()
    
