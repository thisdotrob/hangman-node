'use strict';

const answerMasker = require('./answer-masker');

function extract(game) {
  return {
    unusedLetters: game.unusedLetters,
    maskedAnswer: answerMasker.getMaskedAnswer(game.answer, game.correctlyGuessedLetters),
    turnsLeft: game.turnsLeft,
  };

}

module.exports = {
  extract,
}
