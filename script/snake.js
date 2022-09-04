const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

const SPEED = 14
const TILE_COUNT = 20
let HEAD_X = canvas.width / 2
let HEAD_Y = canvas.width / 2
let AXIS_X = 0
let AXIS_Y = 0

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
  changeSnakePosition()
  drawSnake()
  setTimeout(drawGame, 1000 / SPEED)
}

drawGame()

function drawSnake() {
  ctx.fillStyle = 'green'
  ctx.fillRect(HEAD_X, HEAD_Y, 20, 20)
}

function changeSnakePosition() {
  HEAD_X += AXIS_X
  HEAD_Y += AXIS_Y
}

document.body.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW' || event.code === 'ArrowUp') {
    if (AXIS_Y == 20) return
    AXIS_Y = -20
    AXIS_X = 0
  }
  if (event.code === 'KeyS' || event.code === 'ArrowDown') {
    if (AXIS_Y == -20) return
    AXIS_Y = +20
    AXIS_X = 0
  }
  if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
    if (AXIS_X == 20) return
    AXIS_Y = 0
    AXIS_X = -20
  }
  if (event.code === 'KeyD' || event.code === 'ArrowRight') {
    if (AXIS_X == -20) return
    AXIS_Y = 0
    AXIS_X = +20
  }
})
