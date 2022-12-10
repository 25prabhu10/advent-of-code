import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', {
  encoding: 'utf-8',
})

const bufferList = txt.split('\n')

function getIndexOfFirstUniqueStr(buffer, size) {
  const uniqueString = []

  for (let i = 0; i < buffer.length; i++) {
    if (uniqueString.length === size) {
      return i
    }

    if (uniqueString.includes(buffer[i])) {
      const lastFoundIndex = uniqueString.indexOf(buffer[i])
      uniqueString.splice(0, lastFoundIndex + 1)
    }

    uniqueString.push(buffer[i])
  }

  return 0
}

for (const buffer of bufferList) {
  // part 1
  console.log(getIndexOfFirstUniqueStr(buffer, 4))

  // part 2
  console.log(getIndexOfFirstUniqueStr(buffer, 14))
}
