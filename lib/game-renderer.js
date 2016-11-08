'use strict';

const newGameGenerator = require('./new-game-generator');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  return new Promise(resolve => {
    newGameGenerator.generate()
      .then(newGame => {
        const viewData = viewDataExtractor.extract(newGame);
        res.render('index', viewData);
        resolve();

      });

  });

}

module.exports = {
  render,
};
