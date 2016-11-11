'use strict';

const newGameGenerator = require('./new-game-generator');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  (req.session.game)
    ? res.render('index', viewDataExtractor.extract(req.session.game))
    : res.redirect('/start-new-game');
}

module.exports = {
  render,
};
