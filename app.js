'use strict';

const express = require('express');
const app = express();

const gameRenderer = require('./lib/game-renderer');

app.set('view engine', 'pug');

app.get('/', (req, res) => gameRenderer.render(req, res));

app.listen(8080);
