import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const rounds = txt.split('\n')

/**
 * Rock defeats Scissors
 * Paper defeats Rock
 * Scissors defeats Paper
 *
 * (A is "rock", B is "paper", and C is "scissors")
 */
const ALL_POSSIBLE_OUTCOMES = {
  'A rock': 'draw',
  'A paper': 'win',
  'A scissors': 'lose',
  'B rock': 'lose',
  'B paper': 'draw',
  'B scissors': 'win',
  'C rock': 'win',
  'C paper': 'lose',
  'C scissors': 'draw',
}

const POINTS = {
  rock: 1,
  paper: 2,
  scissors: 3,
  lose: 0,
  draw: 3,
  win: 6,
}

/**
 * Calculate score for given strategy
 * @param {string[]} rounds
 * @param {Object} ROUND_STRATEGY
 * @returns {number[]} points per round
 */
function calculateScore(rounds, ROUND_STRATEGY) {
  const scoresPerRound = []

  for (const [playerA, _, strategy] of rounds) {
    const playerB = ROUND_STRATEGY[strategy][playerA]
    const outcome = ALL_POSSIBLE_OUTCOMES[`${playerA} ${playerB}`]

    scoresPerRound.push(POINTS[outcome] + POINTS[playerB])
  }

  return scoresPerRound
}

// part 1
const OLD_ROUND_STRATEGY = {
  X: { A: 'rock', B: 'rock', C: 'rock' },
  Y: { A: 'paper', B: 'paper', C: 'paper' },
  Z: { A: 'scissors', B: 'scissors', C: 'scissors' },
}

const scoresPerRound = calculateScore(rounds, OLD_ROUND_STRATEGY)
console.log(scoresPerRound.reduce((a, b) => a + b, 0))

// part 2
const NEW_ROUND_STRATEGY = {
  X: { A: 'scissors', B: 'rock', C: 'paper' }, // lose
  Y: { A: 'rock', B: 'paper', C: 'scissors' }, // draw
  Z: { A: 'paper', B: 'scissors', C: 'rock' }, // win
}

const NewScoresPerRound = calculateScore(rounds, NEW_ROUND_STRATEGY)
console.log(NewScoresPerRound.reduce((a, b) => a + b, 0))
