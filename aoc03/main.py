with open("./input.txt", "r", encoding="UTF-8") as str_file:
    str = str_file.read()

    rucksacks = str.split('\n')
    duplicates = []

    # part 1
    # for rucksack in rucksacks:
    #     compOne = set(rucksack[:len(rucksack) // 2])
    #     compTwo = rucksack[len(rucksack) // 2:]

    # part 2
    for index in range(0, len(rucksacks), 3):
        elfOne = set(rucksacks[index])
        elfTwo = rucksacks[index + 1]
        elfThree = rucksacks[index + 2]

        for char in elfOne:
            if char in elfTwo and char in elfThree:
                ascii = ord(char)

                if ascii > 96:
                    ascii -= 96
                else:
                    ascii -= 38

                duplicates.append(ascii)
                break
    
    print(sum(duplicates))
