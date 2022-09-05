const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

class SnakePart {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let SPEED = 8
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
let score = 0
const moreSound = new Audio('/media/more.mp3')
const gameOverSound = new Audio('/media/game_over.mp3')

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
  // console.log('Game Loop')

  snakeHeadLocation()
  let result = endGame()
  if (result) {
    return gameOverSound.play()
  }

  if (score > 1) {
    SPEED = 15
  }
  if (score > 3) {
    SPEED = 30
  }
  // console.log(SPEED)
  drawGameBoard()
  didSnakeAte()
  drawFood()
  drawSnake()
  drawScore()
  setTimeout(drawGame, 1000 / SPEED)
}

function endGame() {
  let gameOver = false

  if (AXIS_X === 0 && AXIS_Y === 0) {
    return false
  }

  if (
    HEAD_X < 0 ||
    HEAD_X >= canvas.width ||
    HEAD_Y < 0 ||
    HEAD_Y >= canvas.height
  ) {
    gameOver = true
  }

  for (let i = 0; i < SNAKE_PARTS.length; i++) {
    let part = SNAKE_PARTS[i]
    if (part.x === HEAD_X && part.y === HEAD_Y) {
      gameOver = true
      break
    }
  }

  if (gameOver) {
    ctx.fillStyle = '#FFF'
    ctx.font = '60px Verdana'
    ctx.fillText('Game Over!', 20, canvas.height / 2)
  }
  return gameOver
}

drawGame()

function drawScore() {
  ctx.fillStyle = '#fff'
  ctx.font = '12px Verdana'
  ctx.fillText('Score: ' + score, 338, 14)
}

function drawSnake() {
  ctx.fillStyle = '#90ee90'
  for (let i = 0; i < SNAKE_PARTS.length; i++) {
    let tail = SNAKE_PARTS[i]
    ctx.fillRect(tail.x, tail.y, TILE_SIZE, TILE_SIZE)
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
    FOOD_Y = random - (random % TILE_SIZE)
    tailLength++
    score++
    moreSound.play()
  }
}

function snakeHeadLocation() {
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

const gameStartButton = document.getElementById('game-start-button')
gameStartButton.onclick = function () {
  if (AXIS_Y == 20) return
  AXIS_Y = -20
  AXIS_X = 0
}

const gameRestartButton = document.getElementById('game-restart-button')
gameRestartButton.onclick = function () {
  location.reload()
}
