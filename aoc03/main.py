"""
Advent of Code 2022, Day 03
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

def get_priority(char):
    """Get priority of an alphabet"""
    ascii_number = ord(char)

    if ascii_number > 96:
        ascii_number -= 96
    else:
        ascii_number -= 38
    return ascii_number

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    rucksacks = str_file.read().splitlines()

    # part 1
    duplicates_list_one = []
    for rucksack in rucksacks:
        compartment_one = set(rucksack[:len(rucksack) // 2])
        compartment_two = rucksack[len(rucksack) // 2:]

        for char in compartment_one:
            if char in compartment_two:
                duplicates_list_one.append(get_priority(char))
                break

    print(sum(duplicates_list_one))

    # part 2
    duplicates_list_two = []
    for index in range(0, len(rucksacks), 3):
        elf_one = set(rucksacks[index])
        elf_two = rucksacks[index + 1]
        elf_three = rucksacks[index + 2]

        for char in elf_one:
            if char in elf_two and char in elf_three:
                duplicates_list_two.append(get_priority(char))
                break

    print(sum(duplicates_list_two))
