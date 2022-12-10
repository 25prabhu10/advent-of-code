"""
Advent of Code 2022, Day 06
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")


def get_index_of_first_unique_str(buffer, size):
    """Get index of 1st unique string of length n in a buffer"""
    unique_str = []

    for index, char in enumerate(buffer):
        if len(unique_str) == size:
            return index

        if char in unique_str:
            last_found_index = unique_str.index(char)
            unique_str = unique_str[last_found_index+1:]

        unique_str.append(char)

    return 0


with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    txt = str_file.read().splitlines()

    for buffer in txt:
        # part 1
        print(get_index_of_first_unique_str(buffer, 4))

        # part 2
        print(get_index_of_first_unique_str(buffer, 14))
