'use strict';

function update(req, res) {
  const selectedLetter = req.body.letter;

  const game = req.session.game;

  game.unusedLetters = game.unusedLetters.filter(letter => letter !== selectedLetter);

  if (!game.answer.includes(selectedLetter)) game.turnsLeft = game.turnsLeft - 1;

  res.redirect('/');

}

module.exports = {
  update,
};
