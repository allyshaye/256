$(document).ready(function() {
    var Game = function(givenBoard) {

    function getRandomIndex(maxExclusive) {
      return Math.floor(Math.random() * maxExclusive)
    }

    function randomBoard() {
      var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      var index1 = getRandomIndex(16)
      var index2 = index1

      do {
        index2 = getRandomIndex(16)
      } while (index2 === index1)

      var startingNumbers = [2, 4]

      var startingNum1 = startingNumbers[getRandomIndex(2)]
      var startingNum2 = startingNumbers[getRandomIndex(2)]

      board[index1] = startingNum1
      board[index2] = startingNum2
      return board
    }

    function presetBoard(board) {
      var boardArray = board.split("")
      for (i = 0; i < boardArray.length; i++) {
       boardArray[i] = parseInt(boardArray[i])
      }
      return boardArray
    }
    
    if (givenBoard === undefined) {
      this.board = randomBoard()
    } else {
      this.board = presetBoard(givenBoard)
    }
  }

  Game.prototype.boardify = function() {
    return [
      this.board.slice(0,4),
      this.board.slice(4,8),
      this.board.slice(8,12),
      this.board.slice(12,16)
    ]
  }
})