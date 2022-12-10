import { readFile } from 'node:fs/promises'

const txt = await readFile('./input.txt', { encoding: 'utf-8' })

const terminalOutput = txt.split('\n')

function Directory(name = '') {
  this.name = name
  this.files = []
  this.children = []
  this.parent = null
  this.size = 0
}

class FileSystem {
  constructor() {
    this.root = null
    this.pwd = null
    this.treeSize = 0
    this.sizes = []
  }

  addDirectory(name) {
    const dir = new Directory(name)

    if (!this.root) {
      this.root = dir
      this.pwd = this.root
    } else {
      dir.parent = this.pwd

      this.pwd.children.push(dir)
    }
  }

  addFile(name, size) {
    this.pwd.files.push(name)
    this.pwd.size += size
  }

  changeDirectory(name) {
    if (!this.pwd) this.addDirectory(name)
    else if (name === '..') {
      this.pwd = this.pwd.parent
    } else this.pwd = this.pwd.children.find((child) => child.name === name)
  }

  traverseDirectory(node = this.root) {
    for (const item of node.children) {
      node.size += this.traverseDirectory(item)
    }

    // if (node.size < 100000) {
    // this.treeSize += node.size
    // console.log(`${node.name}: ${this.treeSize}`)
    // }

    this.sizes.push(node.size)

    return node.size
  }
}

const fileSystem = new FileSystem()

for (const line of terminalOutput) {
  if (line.includes('$ cd')) {
    const dirName = line.replace('$ cd', '').trim()

    fileSystem.changeDirectory(dirName)

    // console.log(`Move into: ${dirName}`)
  } else if (line.includes('dir')) {
    const dirName = line.replace('dir', '').trim()

    fileSystem.addDirectory(dirName)

    // console.log(`Directory: ${dirName}`)
  } else if (line.includes('$ ls')) {
    continue
  } else {
    const [size, name] = line.split(' ')

    fileSystem.addFile(name, +size)

    // console.log(`File: ${name}`)
  }

  //   console.log(fileSystem)
}

fileSystem.traverseDirectory()

const temp = []

for (const size of fileSystem.sizes) {
  if (70000000 - fileSystem.root.size + size >= 30000000) {
    temp.push(size)
  }
}

console.log(Math.min(...temp))
