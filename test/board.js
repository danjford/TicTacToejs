var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  Board = require('../src/board.js');


describe('Board', function() {

  var board;

  describe('Create board', function () {

    board = new Board();

    it('should create an empty board.', function () {
      assert.deepEqual(board.getBoard(), [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
    });

  });

  describe('Place move', function() {

    board = new Board();

    it('should successfully place a move.', function(done) {

      board.setPosition([0, 0], 'X').then(function() {
        done();
      });

    });


    it('should error placing a move.', function(done) {

      board.setPosition([0, 0], 'X').catch(function() {
        done();
      });

    });

  });

  describe('Stale mate', function () {

    board = new Board();

    it('should not be in stale mate.', function() {

      assert.isFalse(board.staleMate(), 'The board is in stale mate.');

    });

    it('should be in stale mate.', function() {

      board.setPosition([0, 0], 'X');
      board.setPosition([0, 1], 'O');
      board.setPosition([0, 2], 'X');
      board.setPosition([1, 0], 'O');
      board.setPosition([1, 1], 'X');
      board.setPosition([1, 2], 'O');
      board.setPosition([2, 0], 'O');
      board.setPosition([2, 1], 'X');
      board.setPosition([2, 2], 'O');

      assert.isTrue(board.staleMate(), 'The board is not in stale mate.');

    });

  });

  describe('Position', function() {

    board = new Board();

    it('should have a value other than 0.', function() {

      board.setPosition([0, 0], 'X');

      assert(board.getPosition([0, 0]) !== 0, 'The position is still 0.');

    });


  });

  describe('Winner', function() {

    beforeEach(function () {
      board = new Board();
    });

    it('should be no winner.', function() {
      assert.isFalse(board.getWinner(), 'There shouldn\'t be a winner.');
    });


    describe('Diagonal', function() {

      it('should have X as a winner by diagonal.', function() {

        board.setPosition([0, 0], 'X');
        board.setPosition([1, 1], 'X');
        board.setPosition([2, 2], 'X');

        assert.ok(board.checkDiagonals() === 'X', 'X is not the winner by diagonal.');

      });

      it('should have O as a winner by diagonal.', function() {

        board.setPosition([0, 0], 'O');
        board.setPosition([1, 1], 'O');
        board.setPosition([2, 2], 'O');

        assert.ok(board.checkDiagonals() === 'O', 'O is not the winner by diagonal.');

      });

    });


    describe('Row', function() {

      it('should have X as a winner by row.', function() {

        board.setPosition([0, 0], 'X');
        board.setPosition([0, 1], 'X');
        board.setPosition([0, 2], 'X');

        assert.ok(board.checkRows() === 'X', 'X is not the winner by row.');

      });

      it('should have O as a winner by row.', function() {

        board.setPosition([0, 0], 'O');
        board.setPosition([0, 1], 'O');
        board.setPosition([0, 2], 'O');

        assert.ok(board.checkRows() === 'O', 'O is not the winner by row.');

      });

    });


    describe('Column', function() {

      it('should have X as a winner by column.', function() {

        board.setPosition([0, 0], 'X');
        board.setPosition([1, 0], 'X');
        board.setPosition([2, 0], 'X');

        assert.ok(board.checkColumns(), 'X is not the winner by column.');

      });

      it('should have O as a winner by column.', function() {

        board.setPosition([0, 0], 'O');
        board.setPosition([1, 0], 'O');
        board.setPosition([2, 0], 'O');

        assert.ok(board.checkColumns(), 'O is not the winner by column.');

      });

    });

  });

});