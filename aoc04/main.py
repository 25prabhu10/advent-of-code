with open("./input.txt", "r", encoding="UTF-8") as str_file:
    str = str_file.read()
    
    pairsList = str.split('\n')

    completelyOverlappedPairs = 0
    notOverlappingPairs = 0

    for pair in pairsList:
        pair = pair.split(',')

        [start1, end1] = [int(x) for x in pair[0].split('-')]
        [start2, end2] = [int(x) for x in pair[1].split('-')]

        # part 1
        if start1 <= start2 and end2 <= end1 or start2 <= start1 and end1 <= end2:
            completelyOverlappedPairs+=1

        # part 2
        if start1 < start2 and end1 < start2 or start2 < start1 and end2 < start1:
            notOverlappingPairs+=1
        
    # part 1
    print(completelyOverlappedPairs)

    # part 2
    allOverlappedPairs = len(pairsList) - notOverlappingPairs
    print(allOverlappedPairs)
