/// <reference types="cypress" />
const runQuery = require('./run-query');
const reloadDB = require('./reload-db');

module.exports = (on, config) => {
  on('task', {
    query: runQuery(config),
    reloadDB: reloadDB(config)
  })
}
