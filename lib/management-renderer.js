'use strict';

const db = require('../db');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  return db.getAllSessions()
    .then(sessions => {
      const sessionsWithGames = sessions.filter(session => session.game);

      const games = sessionsWithGames.map(session => session.game);

      const viewData = viewDataExtractor.extractManagementViewData(games);

      res.render('manage', viewData);

    });

}

module.exports = {
  render,
};
