import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const drawing = txt.split('\n\n')
const drawingOfCrates = drawing[0].split('\n')
const rearrangementProcedure = drawing[1].split('\n')

const horizontalCratesDrawing = drawingOfCrates
  .map((row) => row.match(/.{1,4}/g))
  .slice(0, -1)

const initialStacksOfCrates = {}

// create initial stacks from drawing
for (const crate of horizontalCratesDrawing) {
  for (let index = 0; index < crate.length; index++) {
    crate[index] = crate[index].trim()

    if (crate[index] !== '') {
      typeof initialStacksOfCrates[index + 1] === 'undefined'
        ? (initialStacksOfCrates[index + 1] = Array(crate[index]))
        : initialStacksOfCrates[index + 1].push(crate[index])
    }
  }
}

/**
 * Perform operations based on the procedure
 * @param {Object} stacksOfCrates
 * @returns {[Array<string>[]]} new stack after performing procedure
 */
function performProcedure(stacksOfCrates) {
  const oldCrane = JSON.parse(JSON.stringify(stacksOfCrates))
  const newCrane = JSON.parse(JSON.stringify(stacksOfCrates))

  for (let i = 0; i < rearrangementProcedure.length; i++) {
    const procedure = rearrangementProcedure[i].split(' ')

    const numOfItemsToMove = procedure[1]
    const takeFromStack = procedure[3]
    const placeIntoStack = procedure[5]

    for (let j = 0; j < numOfItemsToMove; j++) {
      oldCrane[placeIntoStack].unshift(oldCrane[takeFromStack].shift())
    }

    newCrane[placeIntoStack].unshift(
      ...newCrane[takeFromStack].splice(0, numOfItemsToMove)
    )
  }

  return [oldCrane, newCrane]
}

/**
 * Return top creates as a string
 * @param {Object} stacksOfCrates
 * @returns {string} top crates
 */
function getTopCrates(stacksOfCrates) {
  let topCrates = ''

  for (const stacks in stacksOfCrates) {
    topCrates =
      topCrates + stacksOfCrates[stacks][0].replace('[', '').replace(']', '')
  }

  return topCrates
}

const [oldCrane, newCrane] = performProcedure(initialStacksOfCrates)

// part 1
const oldTopCrates = getTopCrates(oldCrane)
console.log(oldTopCrates)

// part 2
const newTopCrates = getTopCrates(newCrane)
console.log(newTopCrates)
