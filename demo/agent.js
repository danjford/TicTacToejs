(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Agent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var minVal = -5000,
  maxVal = 5000;

function Agent(player) {
  this.player = player;
}

Agent.prototype.createMove = function(board) {


  this.currentBoard = board;
  this.goodMoves = [];

  this.minimax(0, 1);

  if(!this.goodMoves.length) return;

  board.setPosition(this.bestMove().move, this.player);

};


Agent.prototype.checkMoves = function() {

  var board = this.currentBoard.getBoard(),
    possibleMoves = [];

  for(var row = 0 ; row < 3 ; row++) {
    for (var col = 0; col < 3; col++) {
      if(board[row][col] == 0){
        possibleMoves.push([row, col]);
      }
    }
  }

  return possibleMoves;

};

Agent.prototype.minimax = function(depth, turn) {

  var possibleMoves = this.checkMoves();
  var scores = [];

  var winner = this.currentBoard.getWinner();

  if (winner === 'O') {
    return +1;
  } else if (winner === 'X') {
    return -1;
  } else if (!possibleMoves.length){
    return 0;
  }

  for (var i = 0, ii = possibleMoves.length; i < ii; i++) {

    if(turn === 1) {

      this.currentBoard.setPosition(possibleMoves[i], this.player);

      var score = this.minimax(depth + 1, -1);
      scores.push(score);

      if(depth === 0) {
        this.goodMoves.push({move: possibleMoves[i], score: score});
      }

    } else {

      this.currentBoard.setPosition(possibleMoves[i], this.player === 'O' ? 'X' : 'O');
      scores.push(this.minimax(depth + 1, 1));

    }

    this.currentBoard.removePosition(possibleMoves[i]);

  }

  return turn == 1 ? this.maxMove(scores) : this.minMove(scores);

};

Agent.prototype.maxMove = function(scores) {

  var max = minVal;
  var index = -1;

  for(var i = 0; i < scores.length; i++) {
      if(scores[i] > max) {
          max = scores[i];
          index = i;
      }
  }
  return scores[index];


};

Agent.prototype.minMove = function(scores) {

  var min = maxVal;
  var index = -1;

  for(var i = 0; i < scores.length; i++) {
    if(scores[i] < min) {
      min = scores[i];
      index = i;
    }
  }

  return scores[index];

};

Agent.prototype.bestMove = function() {

  var max = minVal;
  var index = -1;

  for(var i = 0; i < this.goodMoves.length; i++) {
    if(max < this.goodMoves[i].score) {
      max = this.goodMoves[i].score;
      index = i;
    }
  }

  return this.goodMoves[index];
};

module.exports = Agent;
},{}]},{},[1])(1)
});