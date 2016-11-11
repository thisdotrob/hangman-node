# Hangman

This is a minimal nodeJS implementation of a hangman game. Games are stored in a mongodb backed session, and can be viewed on a mangement panel.

## Usage

The service was written to run on node v6.9.1.

To run it, you will need an API key from Wordnik (http://developer.wordnik.com/).

Save this API key as an environment variable called 'WORDNIK_API_KEY'.

You will also need to have mongodb running (tested on v3.2) on localhost:27017.

To start the service, clone this repo, install dependencies (```npm i```) and then run it (```node start```).

To play a game, visit http://localhost:8080/.

To see all the games currently being played, visit http://localhost:8080/manage.

## Tests

To run the e2e tests: ```npm run e2e```.

To run the unit tests: ```npm run unit```.

To run all tests: ```npm t```.
