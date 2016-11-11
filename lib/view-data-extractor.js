'use strict';

const answerMasker = require('./answer-masker');
const resultCalculator = require('./result-calculator');
const constants = require('../constants');

function extract(game) {
  return {
    unusedLetters: game.unusedLetters,
    maskedAnswer: answerMasker.getMaskedAnswer(game.answer, game.unusedLetters),
    turnsLeft: game.turnsLeft,
    result: resultCalculator.getResult(game),
  };

}

function extractManagementViewData(games) {
  const gamesViewData = games.map(game => {
    return {
      usedLetters: getUsedLetters(game),
      answer: game.answer.join(' '),
      maskedAnswer: answerMasker.getMaskedAnswer(game.answer, game.unusedLetters),
      turnsLeft: game.turnsLeft,
      result: resultCalculator.getResult(game),
    };

  });

  return {
    games: gamesViewData,
  };

}

function getUsedLetters(game) {
  const usedLetters =  constants.FULL_ALPHABET.filter(letter => {
    return !game.unusedLetters.includes(letter);
  });

  return usedLetters;
}

module.exports = {
  extract,
  extractManagementViewData,
}
