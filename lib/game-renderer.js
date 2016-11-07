'use strict';

const newGameGenerator = require('./new-game-generator');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  const game = newGameGenerator.generate();

  const viewData = viewDataExtractor.extract(game);

  res.render('index', viewData);

}

module.exports = {
  render,
};
