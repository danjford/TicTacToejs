(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Player = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Player(player) {
  this.player = player;
}

function normaliseMove(position) {

  switch(position) {
    case 1:
      return [0, 0];
    case 2:
      return [0, 1];
    case 3:
      return [0, 2];
    case 4:
      return [1, 0];
    case 5:
      return [1, 1];
    case 6:
      return [1, 2];
    case 7:
      return [2, 0];
    case 8:
      return [2, 1];
    case 9:
      return [2, 2];
    default:
      break;
  }

}

Player.prototype.createMove = function(board, position) {

  position = normaliseMove(position);

  return board.setPosition(position, this.player);

};

module.exports = Player;
},{}]},{},[1])(1)
});