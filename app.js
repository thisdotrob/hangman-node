'use strict';

const express = require('express');
const app = express();

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoUser = process.env.MONGO_USER;
const mongoPwd= process.env.MONGO_PASSWORD;

const store = new MongoDBStore({
  uri: `mongodb://${mongoUser}:${mongoPwd}@localhost:27017/hangman_session_test?authSource=admin`,
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

app.set('view engine', 'pug');

app.get('/', (req, res) => gameRenderer.render(req, res));

app.post('/select-letter', (req, res) => gameUpdater.update(req, res));

module.exports = app;
