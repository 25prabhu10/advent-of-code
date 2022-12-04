import { readFile } from 'node:fs/promises'

const str = await readFile('./input.txt', { encoding: 'utf-8' })

const rucksacks = str.split('\n')
const duplicates = []

// part 1
// for (const rucksack of rucksacks) {
//   const compOne = new Set(rucksack.slice(0, rucksack.length / 2).split(''))
//   const compTwo = rucksack.slice(rucksack.length / 2, rucksack.length)

// part 2
for (let index = 0; index < rucksacks.length; index += 3) {
  const elfOne = new Set(rucksacks[index].split(''))
  const elfTwo = rucksacks[index + 1]
  const elfThree = rucksacks[index + 2]

  for (let char of elfOne) {
    if (elfTwo.includes(char) && elfThree.includes(char)) {
      let ascii = char.charCodeAt(0)

      if (ascii > 96) {
        ascii -= 96
      } else {
        ascii -= 38
      }

      duplicates.push(ascii)
      break
    }
  }
}

console.log(duplicates.reduce((a, b) => a + b, 0))
