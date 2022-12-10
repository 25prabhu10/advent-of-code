"""
Advent of Code 2022, Day 09
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")


def get_all_positions_visited_by_tail(rope, all_motions):
    """Get all unique positions visited by tail"""

    X = 0
    Y = 1

    HEAD = 0
    TAIL = len(rope) - 1

    all_positions_of_tail = set()

    for motion in all_motions:
        [direction, steps] = motion.split(" ")

        for _ in range(0, int(steps)):
            move_x_by = 1 if direction == "R" else -1 if direction == "L" else 0
            move_y_by = 1 if direction == "U" else -1 if direction == "D" else 0

            rope[HEAD][X] += move_x_by
            rope[HEAD][Y] += move_y_by

            for j in range(1, len(rope)):
                dx = rope[j - 1][X] - rope[j][X]
                dy = rope[j - 1][Y] - rope[j][Y]

                if abs(dx) > 1 or abs(dy) > 1:
                    if dx == 0:
                        rope[j][Y] += 1 if dy > 0 else -1
                    elif dy == 0:
                        rope[j][X] += 1 if dx > 0 else -1
                    else:
                        rope[j][X] += 1 if dx > 0 else -1
                        rope[j][Y] += 1 if dy > 0 else -1

            all_positions_of_tail.add("".join(map(str, rope[TAIL])))

    return all_positions_of_tail

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    txt = str_file.read().splitlines()

    # part 1
    rope_with_2_knot = [
        [0, 0],
        [0, 0],
    ]
    print(len(get_all_positions_visited_by_tail(rope_with_2_knot, txt)))

    # part 2
    rope_with_10_knots = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]
    print(len(get_all_positions_visited_by_tail(rope_with_10_knots, txt)))
