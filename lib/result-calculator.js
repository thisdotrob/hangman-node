'use strict';

function getResult(game) {
  if (game.turnsLeft === 0) return 'lost';
  if (allLettersGuessed(game)) return 'won';
  return 'in-progress';
}

function allLettersGuessed(game) {
  const answer = game.answer;
  const unusedLetters = game.unusedLetters;
  return !answer.some(letter => unusedLetters.includes(letter));
}

module.exports = {
  getResult,
}
