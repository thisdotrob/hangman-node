'use strict';

const constants = require('../constants');
const randomAnswerGenerator = require('./random-answer-generator');

function generate() {
  return getAnswer().then(createGame);
}

function getAnswer() {
  return randomAnswerGenerator.generate();
}

function createGame(answer) {
  return {
    unusedLetters: constants.FULL_ALPHABET,
    turnsLeft: constants.NUMBER_OF_TURNS,
    answer,
  };
}

module.exports = {
  generate,
};
