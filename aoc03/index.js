import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const rucksacks = txt.split('\n')

/**
 * Get priority of an alphabet
 * @param {*} char
 * @returns {number} priority of the character
 */
function get_priority(char) {
  let asciiNumber = char.charCodeAt(0)

  if (asciiNumber > 96) asciiNumber -= 96
  else asciiNumber -= 38

  return asciiNumber
}

// part1
const duplicatesListOne = []
for (const rucksack of rucksacks) {
  const compartmentOne = new Set(
    rucksack.slice(0, rucksack.length / 2).split('')
  )
  const compartmentTwo = rucksack.slice(rucksack.length / 2, rucksack.length)

  for (const char of compartmentOne) {
    if (compartmentTwo.includes(char)) {
      duplicatesListOne.push(get_priority(char))
      break
    }
  }
}
console.log(duplicatesListOne.reduce((a, b) => a + b, 0))

// part 2
const duplicatesListTwo = []

for (let index = 0; index < rucksacks.length; index += 3) {
  const elfOne = new Set(rucksacks[index].split(''))
  const elfTwo = rucksacks[index + 1]
  const elfThree = rucksacks[index + 2]

  for (let char of elfOne) {
    if (elfTwo.includes(char) && elfThree.includes(char)) {
      duplicatesListTwo.push(get_priority(char))
      break
    }
  }
}
console.log(duplicatesListTwo.reduce((a, b) => a + b, 0))
