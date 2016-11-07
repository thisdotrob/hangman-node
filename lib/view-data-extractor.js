'use strict';

function extract(game) {
  return {
    unusedLetters: game.unusedLetters,
  };
}

module.exports = {
  extract,
}
