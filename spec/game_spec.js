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

  it("recognizes which tile is new", function() {
    expect(game.newBlockIndex).toEqual(undefined);
    game.spawnBlock()
    expect(game.newBlockIndex).not.toEqual(undefined)
  })


})