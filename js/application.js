$(document).ready(function() {

  game = new Game()
  game.displayBoard()

  $('body').on('keyup', function(e) {
      var keyPressed = e.which
      console.log(keyPressed)
      if (keyPressed === 38) {
        console.log('up')
        game.moveUp()
      } else if (keyPressed === 40) {
        console.log('down')
        game.moveDown()
      } else if (keyPressed === 37) {
        console.log("left")
        game.moveLeft()
      } else if (keyPressed === 39) {
        console.log("right")
        game.moveRight()
      }
      game.spawnBlock()
      game.displayBoard()
  })

})

