const mongodb = require('mongodb');
const constants = require('./constants');

let _db;

const connOptions = {
  collection: 'sessions',
  connectionOptions: {},
  expires: 1000 * 60 * 60 * 24 * 14, // 2 weeks
  idField: '_id',
};

function connect(cb) {
  mongodb.MongoClient.connect(constants.MONGO_URI, connOptions, (err, db) => {
    _db = db;

    if (typeof cb === 'function') cb();

    return;

  })
}

function getAllSessions() {
  return new Promise((resolve, reject) => {
    _db
      .collection('sessions')
      .find({})
      .toArray((err, docs) => {
        if (err) reject(err);

        const sessions = docs.map(doc => doc.session);

        resolve(sessions);

      });
  });

}


module.exports = {
  connect,
  getAllSessions,
};
