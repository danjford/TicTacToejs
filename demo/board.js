(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Board = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @param  {Object} - value, the parameter to check if it is a object
 * @return {Boolean} - whether or not the parameter is an object
 */
function isObject(value) {
  return value !== null && typeof value === 'object';
};

/**
 * Contains a < ie9 polyfill.
 * @param  {Array} - value, the parameter to check if it is a Array
 * @return {Boolean} - whether or not the parameter is an array
 */
function isArray(value) {

  if(!Array.isArray) {
    return value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
  } else {
    return value !== null && typeof value === 'object' && Array.isArray(value);
  }

};


/**
 * For those projects that want < ie9 support.
 * Mainly an ie8 polyfill as ie8 doesnt support Array.prototype.indexOf
 * @param  {Array} arr, the array to search on
 * @param  {String|Integer} search, the value to search for
 * @return {Integer}, the index of the found element
 */
function arrayIndex(arr, search){

  if(!Array.prototype.indexOf) {

    for(var i = 0, ii = arr.length; i < ii; i++){
      if(arr[i] === search) {
        return i;
      }
    }

    return -1;

  } else {
    return arr.indexOf(search);
  }

};

/**
 * @param  {Object} - obj, the object to check for keys
 * @return {Array} - The keys from the Object
 */
function keys(obj){

  if(!Object.keys){
    var keys = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

    return keys;
  } else {
    return Object.keys(obj);
  }

};

/*
 * The full function for extending an
 * array of objects into a new object,
 * can be optionally deep which will
 * recursively go through properties.
 *
 * @param {Object} - dest, the new object to write to
 * @param {Array} - objs, the array of objects to extend
 * @param {Boolean} - deep, decides if copy should be recursive
 * @return {Object} - the new written object
*/
function fullExtend(dest, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    var obj = objs[i];

    if (!isObject(obj)) throw new Error('\'obj\' needs to be an Array or Object.');

    var objKeys = keys(obj);

    for (var j = 0, jj = objKeys.length; j < jj; j++) {
      var key = objKeys[j];
      var val = obj[key];

      if (isObject(val) && deep) {
        if (!isObject(dest[key])) dest[key] = isArray(val) ? [] : {};
        fullExtend(dest[key], [val], true);
      } else {
        dest[key] = val;
      }
    }
  }

  return dest;
};

/**
 * Low extend of the object i.e. not recursive copy
 *
 * @param  {Object} - dest, the object that will have properties copied to it
 * @param  {Object} - val, the second object with the properties to copy
 * @return {Object} - the new object with properties copied to it
 */
function lowCopy(dest, val) {
  return fullExtend(dest, [val], false);
};

/**
 * Deep extend the object i.e. recursive copy
 *
 * @param  {Object} - dest, the object that will have properties copied to it
 * @param  {Object} - val, the second object with the properties to copy
 * @return {Object} - the new object with properties copied to it
 */
function deepCopy(dest, val){
  return fullExtend(dest, [val], true);
};


module.exports = {
  deepCopy,
  lowCopy,
  isObject,
  isArray,
  keys,
  arrayIndex
}
},{}],2:[function(require,module,exports){
var helpers = require('./helpers.js'),
  version = require('./version.js');

helpers.version = version;

module.exports = helpers;
},{"./helpers.js":1,"./version.js":3}],3:[function(require,module,exports){
module.exports = {"full":"1.0.0","major":"1","minor":"0","dot":"0","author":"danjford <github.com/danjford>"}
},{}],4:[function(require,module,exports){
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
},{"helpers.js":2}]},{},[4])(4)
});