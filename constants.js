module.exports = {
  FULL_ALPHABET: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  WORDNIK_BASE_URL: 'http://api.wordnik.com',
  WORDNIK_PATH: '/v4/words.json/randomWord',
  WORDNIK_QUERY: {
    hasDictionaryDef: true,
    minCorpusCount: 10000,
    api_key: process.env.WORDNIK_API_KEY,
  },
  NUMBER_OF_TURNS: 6,
  MONGO_URI: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/hangman_session_test?authSource=admin`,
};
