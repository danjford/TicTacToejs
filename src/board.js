var board = [],
  Helpers = require('./helpers.js');

function Board() {
  createBoard();
}

function createBoard() {

  board = [];

  for (var i = 0, ii = 3; i < ii; i++) {

    board.push([0, 0, 0]);

  };

}

Board.prototype.checkRows = function() {

  for (var i = 0, ii = board.length; i < ii; i++) {

    if (board[i][0] + board[i][1] + board[i][2] === -3) {
      return 'X';
    } else if (board[i][0] + board[i][1] + board[i][2] === 3) {
      return 'O';
    } else {
      return false;
    }

  };

};

Board.prototype.checkColumns = function() {

  for (var i = 0, ii = board.length; i < ii; i++) {

    if (board[0][i] + board[1][i] + board[2][i] === -3) {
      return 'X';
    } else if (board[0][i] + board[1][i] + board[2][i] === 3) {
      return 'O';
    } else {
      return false;
    }

  };

};

Board.prototype.checkDiagonals = function() {

  if ( (board[0][0] + board[1][1] + board[2][2]) === -3 || (board[0][2] + board[1][1] + board[2][0]) === -3) {
      return 'X';
  } else if ( (board[0][0] + board[1][1] + board[2][2]) === 3 || (board[0][2] + board[1][1] + board[2][0]) === 3) {
      return 'O';
  } else {
      return false;
  }

};

Board.prototype.getPosition = function(position) {
  return board[position[0]][position[1]];
};

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

Board.prototype.getBoard = function() {
  return Helpers.merge([], board);
};

Board.prototype.getWinner = function() {

  return this.checkRows() || this.checkColumns() || this.checkDiagonals();

};

module.exports = Board;