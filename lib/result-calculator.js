'use strict';

function getResult(game) {
  return (game.turnsLeft === 0)
    ? 'lost'
    : 'in-progress';
}

module.exports = {
  getResult,
}
