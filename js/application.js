function gameHandler(e) {
  var keyPressed = e.which
  if (keyPressed === 38) {
    game.moveUp()
  } else if (keyPressed === 40) {
    game.moveDown()
  } else if (keyPressed === 37) {
    game.moveLeft()
  } else if (keyPressed === 39) {
    game.moveRight()
  }

  game.spawnBlock()

  if (game.isOver()) {
    console.log("gameOver")
    // increase opacity
    // say "Game Over"
  } else {
    game.displayBoard()
  }
}

$(document).ready(function() {

  game = new Game()
  game.displayBoard()

  $('body').on('keyup', gameHandler)

})

