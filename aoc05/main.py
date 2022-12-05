import re
import copy
import itertools


def performProcedure(stacksOfCrates, rearrangementProcedure):
    oldCrane = copy.deepcopy(stacksOfCrates)
    newCrane = copy.deepcopy(stacksOfCrates)

    for i in range(0, len(rearrangementProcedure)):
        procedure = rearrangementProcedure[i].split(" ")

        numOfItemsToMove = int(procedure[1])
        takeFromStack = int(procedure[3])
        placeIntoStack = int(procedure[5])

        for j in range(0, numOfItemsToMove):
            oldCrane[placeIntoStack].insert(0, oldCrane[takeFromStack].pop(0))

        craneRemovedItems = newCrane[takeFromStack][0:numOfItemsToMove]
        del newCrane[takeFromStack][0:numOfItemsToMove]

        newCrane[placeIntoStack] = craneRemovedItems + newCrane[placeIntoStack]

    return (oldCrane, newCrane)


def getTopCrates(stacksOfCrates):
    topCrates = ""

    for stacks in range(1, len(stacksOfCrates)+1):
        topCrates = topCrates + stacksOfCrates[stacks][0].replace("[", "").replace("]", "")

    return topCrates


with open("./input.txt", "r", encoding="UTF-8") as str_file:
    str = str_file.read()
    
    drawing = str.split("\n\n")
    drawingOfCrates = drawing[0].split("\n")
    rearrangementProcedure = drawing[1].split("\n")

    horizontalCratesDrawing = [re.findall(r'.{1,4}', row) for row in drawingOfCrates[:-1]]

    initialStacksOfCrates = {}

    # create initial stacks from drawing
    for row in horizontalCratesDrawing:
        for index, crate in enumerate(row):
            crate = crate.strip()
            if crate != "":
                if index+1 in initialStacksOfCrates:
                    initialStacksOfCrates[index+1].append(crate)
                else:
                    initialStacksOfCrates[index+1] = [crate]


    [oldCrane, newCrane] = performProcedure(initialStacksOfCrates, rearrangementProcedure)

    # part 1
    oldTopCrates = getTopCrates(oldCrane)
    print(oldTopCrates)

    # part 2
    newTopCrates = getTopCrates(newCrane)
    print(newTopCrates)
