'use strict';

const newGameGenerator = require('./new-game-generator');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  return getOrCreateGame(req.session)
    .then(getViewData)
    .then(renderIndex(res));
}

function getViewData(game) {
  return viewDataExtractor.extract(game);
}

function renderIndex(res) {
  return (viewData) => res.render('index', viewData);
}

function getOrCreateGame(session) {
  return new Promise(resolve => {
    resolve(session.game || createNewGameInSession(session));
  });
}

function createNewGameInSession(session) {
  return newGameGenerator.generate().then(newGame => session.game = newGame);
}

module.exports = {
  render,
};
