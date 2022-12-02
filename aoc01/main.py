from functools import reduce

with open("./input.txt", "r", encoding="UTF-8") as str_file:
    str = str_file.read()
    
    elves = [[int(calorie) for calorie in line.split("\n")] for line in str.split('\n\n')]
    
    totalCaloriesPerElf = [reduce(lambda a, b: a + b, elf) for elf in elves]
    
    # part 1
    maxCalories = max(totalCaloriesPerElf)
    print(maxCalories)

    # part 2
    totalCaloriesPerElf.sort(reverse=True)
    print(totalCaloriesPerElf[0] + totalCaloriesPerElf[1] + totalCaloriesPerElf[2])
    
