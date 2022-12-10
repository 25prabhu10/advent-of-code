import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const pairsList = txt.split('\n')

let completelyOverlappedPairs = 0
let notOverlappingPairs = 0

for (let pair of pairsList) {
  pair = pair.split(',')

  const [start1, end1] = pair[0].split('-').map((x) => parseInt(x))
  const [start2, end2] = pair[1].split('-').map((x) => parseInt(x))

  // part 1
  if (
    (start1 <= start2 && end2 <= end1) ||
    (start2 <= start1 && end1 <= end2)
  ) {
    completelyOverlappedPairs++
  }

  // part 2
  if (
    (start1 < start2 && end1 < start2) ||
    (start2 < start1 && end2 < start1)
  ) {
    notOverlappingPairs++
  }
}

// part 1
console.log(completelyOverlappedPairs)

// part 2
const allOverlappedPairs = pairsList.length - notOverlappingPairs
console.log(allOverlappedPairs)
