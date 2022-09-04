const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')

const TILE_COUNT = 20

function drawGameBoard() {
  const FIRST_BOARD_COLOR = '#2c2c54'
  const SECOND_BOARD_COLOR = '#474787'

  for (let i = 1; i <= 40; i++) {
    for (let q = 1; q <= 40; q++) {
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

drawGameBoard()
