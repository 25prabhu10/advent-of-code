import { readFile } from 'node:fs/promises'

const str = await readFile('./input.txt', { encoding: 'utf-8' })

const rounds = str.split('\n')

/**
 * Rock defeats Scissors
 * Paper defeats Rock
 * Scissors defeats Paper
 */

// part 1
// const roundStrategy = {
//   'A Y': 'win',
//   'B Z': 'win',
//   'C X': 'win',
//   'A X': 'draw',
//   'B Y': 'draw',
//   'C Z': 'draw',
//   'A Z': 'lose',
//   'B X': 'lose',
//   'C Y': 'lose',
// }

// const points = {
//   X: 1,
//   Y: 2,
//   Z: 3,
//   win: 0,
//   draw: 3,
//   lose: 6,
// }

// const getScore = (round) => {
//   return points[roundStrategy[round]] + points[round[2]]
// }

// part 2
const roundStrategy = {
  X: { A: 'scissors', B: 'rock', C: 'paper' }, // lose
  Y: { A: 'rock', B: 'paper', C: 'scissors' }, // draw
  Z: { A: 'paper', B: 'scissors', C: 'rock' }, // win
}

const points = {
  rock: 1,
  paper: 2,
  scissors: 3,
  X: 0,
  Y: 3,
  Z: 6,
}

const getScore = (playerA, strategy) => {
  return points[strategy] + points[roundStrategy[strategy][playerA]]
}

let totalScore = 0

for (const round of rounds) {
  const [playerA, , strategy] = round

  totalScore += getScore(playerA, strategy)
}

console.log(totalScore)
