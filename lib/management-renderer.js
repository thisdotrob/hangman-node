'use strict';

const db = require('../db');
const viewDataExtractor = require('./view-data-extractor');

function render(req, res) {
  return db.getAllSessions()
    .then(getSessionsWithGames)
    .then(getGames)
    .then(extractViewData)
    .then(renderManagementPage(res))
}

function getSessionsWithGames(sessions) {
  return sessions.filter(session => session.game);
}

function getGames(sessions) {
  return sessions.map(session => session.game);
}

function extractViewData(games) {
  return viewDataExtractor.extractManagementViewData(games);
}

function renderManagementPage(res) {
  return (viewData) => res.render('manage', viewData);
}

module.exports = {
  render,
};
