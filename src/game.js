var Board = require('./board.js'),
  Player = require('./player.js'),
  chooseTurn = 1;

function Game() {
  this.board = new Board();
  this.player1 = new Player('X');
  this.player2 = new Player('O');
  // this.gameLoop();
}

Game.prototype.gameLoop = function() {

  while(!this.getWinner()){

    if(chooseTurn === 1) {
      this.player1.createMove(this.board, "X");
      chooseTurn++;
    } else {
      this.player2.createMove(this.board, "O");
      chooseTurn--;
    }

  }

}

Game.prototype.getWinner = function() {

  return this.board.getWinner();

};

module.exports = Game;