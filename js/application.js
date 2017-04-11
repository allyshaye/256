function assignColors(jqueryElement, backgroundColor, fontColor) {
  jqueryElement.css("background-color", backgroundColor).css("color", fontColor)
}

function colorTiles(board) {
 
  for (i=0; i < board.length; i++) {
    var tile = $("body").find("#" + i)

    switch (board[i]) {
      case 2: 
        assignColors(tile, "#F7B3DA", "black")
        break
      case 4:
        assignColors(tile, "#DDA0DD", "black")
        break
      case 8:
        assignColors(tile, "#DA70D6", "black")
        break
      case 16:
        assignColors(tile, "#FF00FF", "black")
        break
      case 32:
        assignColors(tile, "#BA55D3", "black")
        break
      case 64:
        assignColors(tile, "#9370DB", "black")
        break
      case 128:
        assignColors(tile, "#9400D3", "black")
        break
      case 256:
        assignColors(tile, "#eac717", "white")
        break
      default:
        assignColors(tile, "#a2f2ef", "black")
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
      $("#game").delay(1000).animate({opacity : "0.3"}, 3000)
      $("#gameover").css("visibility", "visible")
    })
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

