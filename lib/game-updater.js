'use strict';

function update(req, res) {
  const selectedLetter = req.body.letter;

  const game = req.session.game;

  game.unusedLetters = game.unusedLetters.filter(letter => letter !== selectedLetter);

  res.redirect('/');
  
}

module.exports = {
  update,
};
