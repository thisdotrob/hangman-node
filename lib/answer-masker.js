'use strict';

function getMaskedAnswer(answer, unusedLetters) {
  const maskedAnswerArray = answer.map(letter => {
    return unusedLetters.includes(letter)
      ? '_'
      : letter;
  });

  return maskedAnswerArray.join(' ');
}

module.exports = {
  getMaskedAnswer,
}
