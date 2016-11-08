'use strict';

const answerMasker = require('./answer-masker');
const resultCalculator = require('./result-calculator');

function extract(game) {
  return {
    unusedLetters: game.unusedLetters,
    maskedAnswer: answerMasker.getMaskedAnswer(game.answer, game.correctlyGuessedLetters),
    turnsLeft: game.turnsLeft,
    result: resultCalculator.getResult(game),
  };

}

module.exports = {
  extract,
}
