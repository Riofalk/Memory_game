const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

const TILE_COUNT = 20
const SPEED = 7
const HEAD_X = canvas.width / 2
const HEAD_Y = canvas.width / 2

function drawGameBoard() {
  const FIRST_BOARD_COLOR = '#2c2c54'
  const SECOND_BOARD_COLOR = '#474787'

  for (let i = 1; i <= 20; i++) {
    for (let q = 1; q <= 20; q++) {
      if ((i + q) % 2 == 0) {
        ctx.fillStyle = FIRST_BOARD_COLOR
      } else {
        ctx.fillStyle = SECOND_BOARD_COLOR
      }
      ctx.fillRect(
        TILE_COUNT * (i - 1),
        TILE_COUNT * (q - 1),
        TILE_COUNT,
        TILE_COUNT,
      )
    }
  }
}

function drawGame() {
  console.log('Game Loop')
  drawGameBoard()
  drawSnake()
  setTimeout(drawGame, 1000 / SPEED)
}

drawGame()

function drawSnake() {
  ctx.fillStyle = 'green'
  ctx.fillRect(HEAD_X, HEAD_Y, 20, 20)
}
