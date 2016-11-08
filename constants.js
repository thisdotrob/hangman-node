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
};
