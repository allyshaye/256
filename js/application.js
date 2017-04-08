function getRandomIndex(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive)
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

function combineTilesRight(board) {
  for (i = 0; i < board.length; i++) {
    for (j = board[i].length-1; j > 0; j--) {
      if (board[i][j] === board[i][j-1]) {
        board[i][j] *=2
        board[i].splice(j-1, 1)
        j--
     }
    }
  }
  return board
}

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

function reverseBoard(board) {
  var reverseBoard = []
  for (i = 0; i < board.length; i++) {
    reverseBoard.push(board[i].reverse())
  }
  return reverseBoard
}

function move(board) {
  return padZeros(combineTilesRight(removeZeros(board)))
}

function transposeBoard(board) {
  var workingBoard = createWorkingBoard(board)
  var row1 = []
  var row2 = []
  var row3 = []
  var row4 = []
  for (i = 0; i < workingBoard.length; i++) {
    for (j = 0; j < workingBoard[i].length; j++) {
      if (j === 0) {
        row1.push(workingBoard[i][j])
      } else if (j === 1) {
        row2.push(workingBoard[i][j])
      } else if (j === 2) {
        row3.push(workingBoard[i][j])
      } else if (j === 3) {
        row4.push(workingBoard[i][j])
      }
    }
  }
  return [row1, row2, row3, row4].reduce(function(a,b) { 
    return a.concat(b); 
  })
}

var Game = function(givenBoard) {

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

Game.prototype.saveBoard = function(board) {
  this.board = [].concat.apply([], board)
}

Game.prototype.moveRight = function() {
  var workingBoard = createWorkingBoard(this.board)
  var updatedBoard = move(workingBoard)
  return this.saveBoard(updatedBoard)
}

Game.prototype.moveLeft = function() {
  var reversedBoard = reverseBoard(createWorkingBoard(this.board))
  var updatedReversedBoard = move(reversedBoard)
  var updatedBoard = reverseBoard(updatedReversedBoard)
  return this.saveBoard(updatedBoard)
}

Game.prototype.moveDown = function() {
  var transposedBoard = createWorkingBoard(transposeBoard(this.board))
  var updatedBoard = move(transposedBoard)
  var boardArray = [].concat.apply([], updatedBoard) 
  return this.board = transposeBoard(boardArray)
}

Game.prototype.moveUp = function() {
  var transposedBoard = createWorkingBoard(transposeBoard(this.board))
  var reversedBoard = reverseBoard(transposedBoard)
  var paddedReversed = move(reversedBoard)
  var unreversedBoard = reverseBoard(paddedReversed)
  var boardArray = [].concat.apply([], unreversedBoard)
  return this.board = transposeBoard(boardArray)
}

Game.prototype.spawnBlock = function() {
  var startingNumbers = [2, 4]
  var tile = startingNumbers[getRandomIndex(2)]

  var emptySpot = false
  do {
    var spot = getRandomIndex(16)
    if (this.board[spot] === 0) {
      emptySpot = true
    }
  } while (!emptySpot)

  this.board[spot] = tile
}

Game.prototype.isOver = function() {
  return !this.board.includes(0)
}

$(document).ready(function() {

  game = new Game("4444222204402224")
  // game = new Game("2222444422224444")
  console.log(game.board)
  console.log(game.isOver())

})

