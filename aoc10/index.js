import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const signalStrengths = []
let cycles = 0
let x = 1

let sprite = '###                                     '.split('')
let currentRow = []
const display = []

const instructions = txt.split('\n')

function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop())
  else arr.push(arr.shift())
  return arr
}

function extractInfo(instruction) {
  let cyclesToComplete = 0
  let addX = 0

  if (instruction.includes('noop')) {
    cyclesToComplete = 1
  } else {
    cyclesToComplete = 2
    addX = parseInt(instruction.split(' ')[1])
  }

  return [cyclesToComplete, addX]
}

for (const instruction of instructions) {
  let [cyclesToComplete, addX] = extractInfo(instruction)

  for (let i = 0; i < cyclesToComplete; i++) {
    cycles++

    if ((cycles - 20) % 40 === 0) {
      signalStrengths.push(x * cycles)
    }

    if (currentRow.length === 40) {
      display.push(...currentRow)
      currentRow = []
    }

    currentRow.push(sprite[(cycles - 1) % 40])
  }

  if (addX !== 0) {
    x += addX

    for (let i = 0; i < Math.abs(addX); i++) {
      if (addX > 0) {
        sprite = arrayRotate(sprite, true)
      } else {
        sprite = arrayRotate(sprite)
      }
    }
  }
}

// part 1
console.log(signalStrengths.reduce((a, b) => a + b, 0))

// part 2
display.push(...currentRow)

for (const pixel of display.join('').match(/.{1,40}/g)) {
  console.log(pixel)
}
