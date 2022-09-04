const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

class SnakePart {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const SPEED = 14
const TILE_COUNT = 20
const TILE_SIZE = 20
let HEAD_X = canvas.width / 2
let HEAD_Y = canvas.width / 2
let AXIS_X = 0
let AXIS_Y = 0
let FOOD_X = canvas.width / 4
let FOOD_Y = canvas.width / 4
const SNAKE_PARTS = []
let tailLength = 2

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
  didSnakeAte()
  drawFood()
  drawSnake()
  setTimeout(drawGame, 1000 / SPEED)
}

drawGame()

function drawSnake() {
  ctx.fillStyle = '#90ee90'
  for (let i = 0; i < SNAKE_PARTS.length; i++) {
    let part = SNAKE_PARTS[i]

    ctx.fillRect(part.x, part.y, TILE_SIZE, TILE_SIZE)
    console.log(SNAKE_PARTS)
  }
  SNAKE_PARTS.push(new SnakePart(HEAD_X, HEAD_Y))
  if (SNAKE_PARTS.length > tailLength) {
    SNAKE_PARTS.shift()
  }

  ctx.fillStyle = 'green'
  ctx.fillRect(HEAD_X, HEAD_Y, TILE_SIZE, TILE_SIZE)
}

// console.log(SNAKE_PARTS[0])
function drawFood() {
  ctx.fillStyle = 'red'
  ctx.fillRect(FOOD_X, FOOD_Y, TILE_SIZE, TILE_SIZE)
}

function didSnakeAte() {
  const random = Math.random() * canvas.width
  if ((HEAD_X === FOOD_X) & (HEAD_Y === FOOD_Y)) {
    FOOD_X = random - (random % TILE_SIZE)
    console.log(FOOD_X)
    FOOD_Y = random - (random % TILE_SIZE)
    console.log(FOOD_Y)
    console.log(HEAD_X, HEAD_Y)
    tailLength++
  }
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
