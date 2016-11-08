'use strict';

const constants = require('../constants');
const randomAnswerGenerator = require('./random-answer-generator');

function generate() {
  return new Promise(resolve => {
    randomAnswerGenerator.generate()
      .then(answer => {
        const newGame = {
          unusedLetters: constants.FULL_ALPHABET,
          turnsLeft: constants.NUMBER_OF_TURNS,
          answer,
          incorrectlyGuessedLetters: [],
          correctlyGuessedLetters: [],
        };

        resolve(newGame);

      });

  });

}

module.exports = {
  generate,
};
