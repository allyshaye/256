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

  function createWorkingBoard(board) {
    return [
      board.slice(0,4), 
      board.slice(4,8), 
      board.slice(8,12), 
      board.slice(12,16)
    ]
  }

  Game.prototype.removeZeroes = function(board) {
    var workingBoard = createWorkingBoard(board)

    for (i = 0; i < workingBoard.length; i++) {
      for (j = 0; j < workingBoard[i].length; j++) {
        if (workingBoard[i][j] === 0) {
          workingBoard[i].splice(j, 1)
          j = j-1
        }
      }
    }

    return workingBoard
  }

  Game.prototype.combineTilesRight = function(board) {
    for (i = 0; i < board.length; i++) {
      for (j = board[i].length-1; j > 0; j--) {
        if (board[i][j] === board[i][j-1]) {
          board[i][j] *=2
          board[i].splice(j-1, 1)
       }
      }
    }
    return board
  }

  game = new Game("0024000000222020")
  var removeZeroes =  game.removeZeroes(game.board)
  console.log(removeZeroes.length)
  console.log(removeZeroes[0])
  console.log(removeZeroes[1])
  console.log(removeZeroes[2])
  console.log(removeZeroes[3])
  var tilesCombined = game.combineTilesRight(removeZeroes)
  console.log(tilesCombined)

})