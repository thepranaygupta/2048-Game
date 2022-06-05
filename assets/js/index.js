import Grid from './Grid.js'
import Tile from './Tile.js'

const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
