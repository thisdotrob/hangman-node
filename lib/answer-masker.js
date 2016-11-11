'use strict';

function getMaskedAnswer(answer, unusedLetters) {
  const maskedAnswerArray = answer.map(letter => maskIfUnused(letter, unusedLetters));
  return maskedAnswerArray.join(' ');
}

function maskIfUnused(letter, unusedLetters) {
  return letterHasBeenUsed(letter, unusedLetters)
    ? letter
    : '_';
}

function letterHasBeenUsed(letter, unusedLetters) {
  return !unusedLetters.includes(letter);
}

module.exports = {
  getMaskedAnswer,
}
