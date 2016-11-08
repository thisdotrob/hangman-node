'use strict';

function getMaskedAnswer(answer, correctlyGuessedLetters) {
  return answer.map(() => '_').join(' ');
}

module.exports = {
  getMaskedAnswer,
}
