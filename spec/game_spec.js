describe("256", function() {
  var game;

  beforeEach(function() {
    game = new Game('0000000000000022')
  });

  it("has a board", function() {
    expect(game.board).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2])
  });

  it("has an old board", function() {
    game.moveUp(game.board)
    expect(game.oldBoard).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2])
  })

  it("recognizes which tile is new by tracking it's index", function() {
    expect(game.newBlockIndex).toEqual(undefined);
    game.spawnBlock()
    expect(game.newBlockIndex).not.toEqual(undefined)
  })

  describe("it moves each row to the direction specified", function() {
    describe("click down arrow", function () {
      it("moves all numbers to the right, getting rid of zeros to the right", function() {
        game.moveRight(game.board)
        expect(game.oldBoard).not.toEqual(game.board)
        expect(game.board[15]).not.toEqual(0)
      });

      it("combines tiles once, prioritizing tiles towards the right", function() {
        game.moveRight(game.board)
        expect(game.board[15]).toEqual(4)
      });
    });

    describe("click left arrow", function() {
      it("moves all numbers to the left, getting rid of zeros to the left", function() {
        game.moveLeft(game.board)
        expect(game.oldBoard).not.toEqual(game.board)
        expect(game.board[12]).not.toEqual(0)
      });
    });

      it("combines tiles once, prioritizing tiles towards the left", function() {
        game.moveLeft(game.board)
        expect(game.board[12]).toEqual(4)
      });
    });

    describe("click up arrow", function() {
      it("moves all numbers up, getting rid of zeros towards the top", function() {
        game.moveUp(game.board)
        expect(game.oldBoard).not.toEqual(game.board)
        expect(game.board[15]).toEqual(0)
      });

      it("combines tiles once, prioritizing tiles towards the top wall of the board", function() {
        game.moveUp(game.board)
        expect(game.board[3]).toEqual(2)
      });
    });

    describe("down arrow", function() {
      it("moves all numbers down, getting rid of zeros towards the bottom", function() {
        game.moveDown(game.board)
        expect(game.oldBoard).toEqual(game.board)
      });

      it("combines tiles once, prioritizing tiles towards the floor of the board", function() {
        game.moveDown(game.board)
        expect(game.board[14]).toEqual(game.board[15])
      });
  }); 
})


