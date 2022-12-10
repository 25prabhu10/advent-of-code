import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const allMotions = txt.split('\n')

/**
 *
 * @param {number[][]} rope of n knots
 * @returns {Set<string>} all unique positions visited by tail
 */
function getAllPositionsVisitedByTail(rope, allMotions) {
  const X = 0
  const Y = 1

  const HEAD = 0
  const TAIL = rope.length - 1

  const allPositionsOfTail = new Set()

  for (const motion of allMotions) {
    const [direction, steps] = motion.split(' ')

    for (let i = 0; i < parseInt(steps); i++) {
      const moveXBy = direction === 'R' ? 1 : direction === 'L' ? -1 : 0
      const moveYBy = direction === 'U' ? 1 : direction === 'D' ? -1 : 0

      rope[HEAD][X] += moveXBy
      rope[HEAD][Y] += moveYBy

      for (let j = 1; j < rope.length; j++) {
        const dx = rope[j - 1][X] - rope[j][X]
        const dy = rope[j - 1][Y] - rope[j][Y]

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          if (dx === 0) rope[j][Y] += dy > 0 ? 1 : -1
          else if (dy === 0) rope[j][X] += dx > 0 ? 1 : -1
          else {
            rope[j][X] += dx > 0 ? 1 : -1
            rope[j][Y] += dy > 0 ? 1 : -1
          }
        }
      }

      allPositionsOfTail.add(rope[TAIL].join(''))
    }
  }

  return allPositionsOfTail
}

// part 1
const ropeWith2Knots = [
  [0, 0],
  [0, 0],
]
console.log(getAllPositionsVisitedByTail(ropeWith2Knots, allMotions).size)

// part 2
const ropeWith10Knots = [
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
console.log(getAllPositionsVisitedByTail(ropeWith10Knots, allMotions).size)
