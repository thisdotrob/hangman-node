'use strict';

const express = require('express');
const app = express();

const constants = require('./constants');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: constants.MONGO_URI,
  collection: 'sessions'
});

app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 1000,
  },
  resave: false,
  rolling: true,
  secret: 'youwillneverguessmysupersecret',
  saveUninitialized: true,
  store,
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const gameRenderer = require('./lib/game-renderer');
const gameUpdater = require('./lib/game-updater');
const gameStarter = require('./lib/game-starter');

app.set('view engine', 'pug');

app.get('/', (req, res) => gameRenderer.render(req, res));

app.post('/select-letter', (req, res) => gameUpdater.update(req, res));

app.get('/start-new-game', (req, res) => gameStarter.start(req, res));

module.exports = app;
