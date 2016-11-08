'use strict';

const request = require('superagent');
const constants = require('../constants');

function generate() {
  return new Promise(resolve => {
    request.get(`${constants.WORDNIK_BASE_URL}${constants.WORDNIK_PATH}`)
      .query(constants.WORDNIK_QUERY)
      .end((err, response) => {
        resolve(response.body.word.split(''));

      });

  });

}

module.exports = {
  generate,
};
