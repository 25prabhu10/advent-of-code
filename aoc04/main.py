"""
Advent of Code 2022, Day 04
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    pairs_list = str_file.read().splitlines()

    completely_overlapped_pairs = 0
    non_overlapping_pairs = 0

    for pair in pairs_list:
        [elf_one, elf_two] = pair.split(",")

        [start1, end1] = [int(x) for x in elf_one.split("-")]
        [start2, end2] = [int(x) for x in elf_two.split("-")]

        # part 1
        if (start1 <= start2 and end2 <= end1) or (start2 <= start1 and end1 <= end2):
            completely_overlapped_pairs += 1

        # part 2
        if (start1 < start2 and end1 < start2) or (start2 < start1 and end2 < start1):
            non_overlapping_pairs += 1

    # part 1
    print(completely_overlapped_pairs)

    # part 2
    overlapped_pairs = len(pairs_list) - non_overlapping_pairs
    print(overlapped_pairs)
