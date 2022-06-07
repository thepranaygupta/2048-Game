import Grid from './Grid.js'
import Tile from './Tile.js'

const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true })
}

async function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      await moveUp()
      break
    case 'w':
      await moveUp()
      break
    case 'ArrowDown':
      await moveDown()
      break
    case 's':
      await moveDown()
      break
    case 'ArrowLeft':
      await moveLeft()
      break
    case 'a':
      await moveLeft()
      break
    case 'ArrowRight':
      await moveRight()
      break
    case 'd':
      await moveRight()
      break
    default:
      setupInput()
      return
  }

  grid.cells.forEach((cell) => cell.mergeTiles())

  setupInput()
}

function moveUp() {
  return slideTiles(grid.cellsByColumn)
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()))
}

function moveLeft() {
  return slideTiles(grid.cellsByRow)
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()))
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = []
      for (let i = 1; i < group.length; i++) {
        const cell = group[i]
        if (cell.tile == null) continue
        let lastValidCell
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j]
          if (!moveToCell.canAccept(cell.tile)) break
          lastValidCell = moveToCell
        }
        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition)
          // if there is a cell next to it then merge both or just move
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile
          } else {
            lastValidCell.tile = cell.tile
          }
          cell.tile = null
        }
      }
      return promises
    })
  )
}
