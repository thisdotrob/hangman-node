'use strict';

const gameGenerator = require('./new-game-generator');

function start(req, res) {
  return gameGenerator.generate()
    .then(saveToSession(req))
    .then(renderGame(res));
}

function saveToSession(req) {
  return (game) => req.session.game = game;
}

function renderGame(res) {
  return () => res.redirect('/');
}

module.exports = {
  start,
};
