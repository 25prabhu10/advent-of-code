"""
Advent of Code 2022, Day 05
"""

import copy
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")


def perform_procedure(stacks_of_crates, rearrangement_procedure):
    """Perform operations based on the procedure"""

    old_crane = copy.deepcopy(stacks_of_crates)
    new_crane = copy.deepcopy(stacks_of_crates)

    for procedure in rearrangement_procedure:
        procedure = procedure.split(" ")

        num_of_items_to_move = int(procedure[1])
        take_from_stack = int(procedure[3])
        place_into_stack = int(procedure[5])

        for _ in range(0, num_of_items_to_move):
            old_crane[place_into_stack].insert(0, old_crane[take_from_stack].pop(0))

        crane_removed_items = new_crane[take_from_stack][0:num_of_items_to_move]
        del new_crane[take_from_stack][0:num_of_items_to_move]

        new_crane[place_into_stack] = crane_removed_items + new_crane[place_into_stack]

    return (old_crane, new_crane)


def get_top_crates(stacks_of_crates):
    """Return top creates as a string"""

    top_crates = ""

    for stacks in range(1, len(stacks_of_crates)+1):
        top_crates = top_crates + stacks_of_crates[stacks][0].replace("[", "").replace("]", "")

    return top_crates


with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    # split on empty lines
    drawing = str_file.read().split("\n\n")

    drawing_of_crates = drawing[0].split("\n")
    rearrangement_procedure = drawing[1].split("\n")

    horizontal_crates_drawing = [re.findall(r".{1,4}", row) for row in drawing_of_crates[:-1]]

    initial_stacks_of_crates = {}

    # create initial stacks from drawing
    for row in horizontal_crates_drawing:
        for index, crate in enumerate(row):
            crate = crate.strip()
            if crate != "":
                if index+1 in initial_stacks_of_crates:
                    initial_stacks_of_crates[index+1].append(crate)
                else:
                    initial_stacks_of_crates[index+1] = [crate]


    [old_crane, new_crane] = perform_procedure(initial_stacks_of_crates, rearrangement_procedure)

    # part 1
    old_top_crates = get_top_crates(old_crane)
    print(old_top_crates)

    # part 2
    new_top_crates = get_top_crates(new_crane)
    print(new_top_crates)
