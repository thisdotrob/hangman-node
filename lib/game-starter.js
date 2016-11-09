'use strict';

const gameGenerator = require('./new-game-generator');

function start(req, res) {
  return gameGenerator.generate()
    .then(game => {
      req.session.game = game;
      res.redirect('/');
    });
}

module.exports = {
  start,
};
