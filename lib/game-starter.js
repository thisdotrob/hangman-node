'use strict';

const gameGenerator = require('./new-game-generator');

function start(req, res) {
  return gameGenerator.generate()
    .then(saveToSession(req))
    .then(renderGame(res))
    .catch(renderOopsPage(res));
}

function saveToSession(req) {
  return (game) => req.session.game = game;
}

function renderGame(res) {
  return () => res.redirect('/');
}

function renderOopsPage(res) {
  return (err) => {
    console.log(err);
    res.redirect('/oops');
  }
}

module.exports = {
  start,
};
