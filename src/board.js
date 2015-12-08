var board = [],
  Helpers = require('helpers.js');

function Board() {
  createBoard();
}

/**
 * Creates the a 9 square TicTacToe board
 * @return {Void}, doesn't return anything
 */
function createBoard() {

  board = [];

  for (var i = 0, ii = 3; i < ii; i++) {

    board.push([0, 0, 0]);

  };

}

/**
 * Checks the rows to see if there is a winner
 * @return {String|Boolean}, returns the player or false if nobody has one
 */
Board.prototype.checkRows = function() {

  for (var i = 0, ii = board.length; i < ii; i++) {

    if (board[i][0] + board[i][1] + board[i][2] === -3) {
      return 'X';
    } else if (board[i][0] + board[i][1] + board[i][2] === 3) {
      return 'O';
    }

  };

  return false;

};

/**
 * Checks the columns to see if there is a winner
 * @return {String|Boolean}, returns the player or false if nobody has one
 */
Board.prototype.checkColumns = function() {

  for (var i = 0, ii = board.length; i < ii; i++) {

    if (board[0][i] + board[1][i] + board[2][i] === -3) {
      return 'X';
    } else if (board[0][i] + board[1][i] + board[2][i] === 3) {
      return 'O';
    }

  };

  return false;

};

/**
 * Checks the diagonals to see if there is a winner
 * @return {String|Boolean}, returns the player or false if nobody has one
 */
Board.prototype.checkDiagonals = function() {

  if ( (board[0][0] + board[1][1] + board[2][2]) === -3 || (board[0][2] + board[1][1] + board[2][0]) === -3) {
      return 'X';
  } else if ( (board[0][0] + board[1][1] + board[2][2]) === 3 || (board[0][2] + board[1][1] + board[2][0]) === 3) {
      return 'O';
  }

  return false;

};

/**
 * Gets a position on the board.
 * @return {Integer}, returns the player i.e. -1 or 1
 */
Board.prototype.getPosition = function(position) {
  return board[position[0]][position[1]];
};

/**
 * Sets a player to the position on the board if the space is not taken.
 * @param {Array} position, 'The coordinate at which the move should be set [row, col]'
 * @param {String} player, 'X' or 'O'
 * @return {Promise}
 */
Board.prototype.setPosition = function(position, player) {

  var _this = this;

  return new Promise(function (resolve, reject) {

    if (board[position[0]][position[1]] !== 0) {
      return reject(new Error('This place is already taken.'));
    } else if (player === 'X') {
      board[position[0]][position[1]] = -1;
    } else {
      board[position[0]][position[1]] = 1;
    }

    return resolve(_this.getBoard());

  });

};

Board.prototype.removePosition = function(position) {

  board[position[0]][position[1]] = 0;

};

/**
 * Checks the board if it is in stale made
 * @return {Boolean}, false if it is not in Stale Mate, else true.
 */
Board.prototype.staleMate = function() {

  for(var i = 0, ii = 3; i < ii; i++){
    for(var j = 0, jj = 3; j < jj; j++){
      if(board[i][j] === 0){
        return false;
      }
    }
  }

  return true;

};

/**
 * Gets a 'clone' of the board, modifying it won't affect the origianl
 * @return {Array}, An array of coordinates i.e. the board
 */
Board.prototype.getBoard = function() {
  return Helpers.deepCopy([], board);
};

/**
 * Returns the winner of the board or False.
 * @return {String|Boolean}, Returns 'X', 'O' or false.
 */
Board.prototype.getWinner = function() {

  return this.checkRows() || this.checkColumns() || this.checkDiagonals();

};

module.exports = Board;