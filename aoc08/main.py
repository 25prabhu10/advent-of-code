"""
Advent of Code 2022, Day 08
"""

from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
INPUT_FILE = Path(SCRIPT_DIR, "input.txt")

with open(INPUT_FILE, "r", encoding="UTF-8") as str_file:
    txt = str_file.read().splitlines()

    grid = [[int(height) for height in item] for item in txt]

    def check_if_tree_is_visible(tree_height, x, y):
        """Check visibility of tree"""

        num_of_non_visible_sides = 0
        top = 0
        right = 0
        bottom = 0
        left = 0

        a = x - 1
        while a >= 0:
            top+=1

            if tree_height <= grid[a][y]:
                num_of_non_visible_sides+=1
                break
            a-=1

        b = y + 1
        while b < len(grid[x]):
            right+=1

            if tree_height <= grid[x][b]:
                num_of_non_visible_sides+=1
                break
            b+=1

        c = x + 1
        while c < len(grid):
            bottom+=1

            if tree_height <= grid[c][y]:
                num_of_non_visible_sides+=1
                break
            c+=1

        d = y - 1
        while d >= 0:
            left+=1

            if tree_height <= grid[x][d]:
                num_of_non_visible_sides+=1
                break
            d-=1

        return [num_of_non_visible_sides != 4, top, right, bottom, left]

    num_of_visible_trees = 0
    visibility_of_tress = []

    for i, row in enumerate(grid[1:-1], 1):
        for j, tree in enumerate(row[1:-1], 1):
            [is_visible, top, right, bottom, left] = check_if_tree_is_visible(tree, i, j)

            if is_visible:
                num_of_visible_trees+=1

            visibility_of_tress.append(top * right * bottom * left)


    # number of trees visible on the perimeter
    # are equal to (perimeter of the grid) - 4
    # we should remove 4 from the total perimeter because
    # the 4 trees on the edges are counted twice
    num_of_trees_on_edges = 2 * (len(grid) + len(grid[0])) - 4

    # part 1
    print(num_of_visible_trees + num_of_trees_on_edges)

    # part 2
    print(max(visibility_of_tress))
