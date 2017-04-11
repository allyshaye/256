function assignColors(jqueryElement, backgroundColor, fontColor) {
  jqueryElement.css("background-color", backgroundColor).css("color", fontColor)
}

function colorTiles(board) {
 
  for (i=0; i < board.length; i++) {
    var tile = $("body").find("#" + i)

    switch (board[i]) {
      case 2: 
        assignColors(tile, "#e0f3fa", "black")
        break
      case 4:
        assignColors(tile, "#aedff2", "black")
        break
      case 8:
        assignColors(tile, "#6ac4e6", "black")
        break
      case 16:
        assignColors(tile, "#49b7e1", "black")
        break
      case 32:
        assignColors(tile, "#27a9db", "black")
        break
      case 64:
        assignColors(tile, "#229dcd", "black")
        break
      case 128:
        assignColors(tile, "#1d85ad", "black")
        break
      case 256:
        assignColors(tile, "#940DA1", "white") //done
        break
      default:
        assignColors(tile, "#FFFDCC", "black")
        // tile.css("background", "linear-gradient(90deg, #FEFBAF 0%, #FFEAF4 51%, #E0FFB4 75%)")
        // assignColors(tile, "#fdfd96", "white")
    }
  }
}

function gameHandler(e) {
  var keyPressed = e.which
  if (keyPressed === 38) {
    game.moveUp(game.board)
  } else if (keyPressed === 40) {
    game.moveDown(game.board)
  } else if (keyPressed === 37) {
    game.moveLeft(game.board)
  } else if (keyPressed === 39) {
    game.moveRight(game.board)
  }

  if (game.oldBoard.toString() !== game.board.toString()) {
    game.spawnBlock()
  } else {
    game.newBlockIndex = undefined
  }

  colorTiles(game.board)
  game.displayBoard()

  if (game.isOver()) {
    $(document).on('keyup', function(e) {
      e.preventDefault()
    })
    $("#game").delay(1000).animate({opacity : "0.2"}, 100)
  } else {
    colorTiles(game.board)
    game.displayBoard()
  }
}

$(document).ready(function() {

  game = new Game()
  colorTiles(game.board)
  game.displayBoard()

  $('body').on('keyup', gameHandler)
})

