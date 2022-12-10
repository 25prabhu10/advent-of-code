import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const grid = txt
  .split('\n')
  .map((item) => item.split('').map((height) => parseInt(height)))

/**
 *
 * @param {number} treeHeight
 * @param {number} x
 * @param {number} y
 * @returns {Array} visibility of tree
 */
function checkIfTreeIsVisible(treeHeight, x, y) {
  let numOfNonVisibleSides = 0
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0

  for (let i = x - 1; i >= 0; i--) {
    top++

    if (treeHeight <= grid[i][y]) {
      numOfNonVisibleSides++
      break
    }
  }

  for (let j = y + 1; j < grid[x].length; j++) {
    right++

    if (treeHeight <= grid[x][j]) {
      numOfNonVisibleSides++
      break
    }
  }

  for (let i = x + 1; i < grid.length; i++) {
    bottom++

    if (treeHeight <= grid[i][y]) {
      numOfNonVisibleSides++
      break
    }
  }

  for (let j = y - 1; j >= 0; j--) {
    left++

    if (treeHeight <= grid[x][j]) {
      numOfNonVisibleSides++
      break
    }
  }

  return [numOfNonVisibleSides !== 4, top, right, bottom, left]
}

let numOfVisibleTrees = 0
const visibilityOfTress = []

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    const [isVisible, top, right, bottom, left] = checkIfTreeIsVisible(
      grid[i][j],
      i,
      j
    )
    if (isVisible) {
      numOfVisibleTrees++
    }

    visibilityOfTress.push(top * right * bottom * left)
  }
}

// number of trees visible on the perimeter
// are equal to (perimeter of the grid) - 4
// we should remove 4 from the total perimeter because
// the 4 trees on the edges are counted twice
const numOfTreesOnEdges = 2 * (grid.length + grid[0].length) - 4

// part 1
console.log(numOfVisibleTrees + numOfTreesOnEdges)

// part 2
console.log(Math.max(...visibilityOfTress))

// function addToSeen() {
//   const h = grid.length
//   const w = grid[0].length

//   const seen = [...Array(w)].map((_) => Array(w).fill(0))

//   for (let y = 0; y < h; y++) {
//     let eH = -1
//     let wH = -1

//     for (let x = 0; x < w; x++) {
//       const east = grid[y][x]
//       const west = grid[y][w - x - 1]

//       if (east > eH) {
//         seen[y][x] += 1
//         eH = east
//       }

//       if (west > wH) {
//         seen[y][w - x - 1] += 1
//         wH = west
//       }
//     }
//   }

//   for (let x = 0; x < w; x++) {
//     let nH = -1
//     let sH = -1

//     for (let y = 0; y < h; y++) {
//       const north = grid[h - y - 1][x]
//       const south = grid[y][x]

//       if (south > sH) {
//         seen[y][x] += 1
//         sH = south
//       }

//       if (north > nH) {
//         seen[h - y - 1][x] += 1
//         nH = north
//       }
//     }
//   }

//   console.log(seen.flat().filter((t) => t !== 0).length)
// }

// // not working
// function see(x, y) {
//   let h = grid.length
//   let w = grid[0].length

//   let treeHeight = grid[y][x]
//   let out = 1

//   let temp = 0
//   for (let i = x; i <= 0; i++) {
//     if (grid[y][i] < treeHeight) {
//       temp++
//     } else if (grid[y][i] === treeHeight) {
//       temp++
//       break
//     } else {
//       break
//     }
//   }

//   out *= temp

//   temp = 0
//   for (let i = x + 1; i < w; i++) {
//     if (grid[y][i] < treeHeight) {
//       temp++
//     } else if (grid[y][i] === treeHeight) {
//       temp++
//       break
//     } else {
//       break
//     }
//   }

//   out *= temp

//   temp = 0
//   for (let j = y; j < 0; j++) {
//     if (grid[j][x] < treeHeight) {
//       temp++
//     } else if (grid[j][x] === treeHeight) {
//       temp++
//       break
//     } else {
//       break
//     }
//   }
//   out *= temp

//   temp = 0
//   for (let j = y + 1; j < h; j++) {
//     if (grid[j][x] < treeHeight) {
//       temp++
//     } else if (grid[j][x] === treeHeight) {
//       temp++
//       break
//     } else {
//       break
//     }
//   }
//   out *= temp

//   return out
// }

// let h = grid.length
// let w = grid[0].length

// const seenNew = [...Array(w)].map((_) => Array(w).fill(0))

// for (let y = 0; y < h; y++) {
//   for (let x = 0; x < w; x++) {
//     seenNew[y][x] = see(x, y)
//   }
// }
// console.log(seenNew.flat().filter((t) => t !== 0).length)
// addToSeen()
