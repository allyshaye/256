function assignColors(jqueryElement, backgroundColor, fontColor) {
  jqueryElement.css("background-color", backgroundColor).css('color', fontColor)
}

function colorTiles(board) {
 
  for (i=0; i < board.length; i++) {
    var tile = $("body").find("#" + i)

    switch (board[i]) {
      case 2: 
        assignColors(tile, "#FF0092", "black")
        break
      case 4:
        assignColors(tile, "#FFCA1B", "black")
        break
      case 8:
        assignColors(tile, "#B6FF00", "black")
        break
      case 16:
        assignColors(tile, "#228DFF", "black")
        break
      case 32:
        assignColors(tile, "#BA01FF", "black")
        break
      case 64:
        assignColors(tile, "#31187B", "black")
        break
      case 128:
        assignColors(tile, "#46E4BC", "black")
        break
      case 256:
        assignColors(tile, "#EB1B3B", "black")
        break
      case 512: // this is where we stopped
        assignColors(tile, "#CB4EDA", "black")
        break
      case 1024:
        assignColors(tile, "#CB4EDA", "black")
        break
      case 2048:
        assignColors(tile, "#CB4EDA", "black")
        break
      default:
        assignColors(tile, "#FF0092", "black")
        tile.css("background-color", "gray").css('color', 'white')
    }
  }
}

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
    colorTiles(game.board)
    game.displayBoard()
  }
}

$(document).ready(function() {

  game = new Game()
  game.displayBoard()
  colorTiles(game.board)
  

  $('body').on('keyup', gameHandler)

})

