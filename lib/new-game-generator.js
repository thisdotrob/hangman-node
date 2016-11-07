'use strict';

const constants = require('../constants');

function generate() {
  return {
    unusedLetters: constants.FULL_ALPHABET,
  };
  
}

module.exports = {
  generate,
};
