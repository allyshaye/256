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

  function removeZeros(board) {
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          board[i].splice(j, 1)
          j = j-1
        }
      }
    }
    return board
  }

  // move: right
  function combineTilesRight(board) {
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

  // move: right (therefore padding zeros from the left)
  function padZeros(board) {
    for (i = 0; i < board.length; i++) {
      if (board[i].length !== 4) {
        do {
          board[i].unshift(0)
        } while (board[i].length < 4)
      }
    }
    return board
  }

  Game.prototype.saveBoard = function(board) {
    this.board = [].concat.apply([], board)
  }

  Game.prototype.moveRight = function() {
    var workingBoard = createWorkingBoard(this.board)
    var noZeros = removeZeros(workingBoard)
    var tilesCombined = combineTilesRight(noZeros)
    var updatedBoard = padZeros(tilesCombined)
    this.saveBoard(updatedBoard)
    return this.board
  }

  function reverseBoard(board) {
    var reverseBoard = []
    for (i = 0; i < board.length; i++) {
      reverseBoard.push(board[i].reverse())
    }
    return reverseBoard
  }

  Game.prototype.moveLeft = function() {
    var workingBoard = createWorkingBoard(this.board)
    var reversedBoard = reverseBoard(workingBoard)
    var noZeros = removeZeros(reversedBoard)
    var tilesCombined = combineTilesRight(noZeros)
    var updatedReversedBoard = padZeros(tilesCombined)
    var updatedBoard = reverseBoard(updatedReversedBoard)
    this.saveBoard(updatedBoard)
    return this.board
  }

  game = new Game("0202440222224004")
  console.log(game.moveLeft())
  console.log(game.moveRight())
})

