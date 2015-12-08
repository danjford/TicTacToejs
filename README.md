TicTacToe with AI in JavaScript
==

[![Build Status](https://travis-ci.org/danjford/TicTacToejs.svg?branch=master)](https://travis-ci.org/danjford/TicTacToejs)
[![codecov.io](https://codecov.io/github/danjford/TicTacToejs/coverage.svg?branch=master)](https://codecov.io/github/danjford/TicTacToejs?branch=master)

## First verison finished.

To try out the first version, use the demo file and open up the index.html.

I am using ES6 promises in this example and haven't added a polyfill so you will need to be using
a browser like chrome until I have added on in order for there to be no errors.

## See it in action

If you want to see a currently 'not so elegant' demo of it in action have a look [here](http://danjford.github.io/TicTacToejs/).

## Artificial Intelligence Techniques

For this example, if you look in src/agent.js, I am using a technique known as the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax).

This technique allows the AI player to build up a tree of possible moves and score their outcome. The player can then choose the move which is likely
to give itself the highest score.