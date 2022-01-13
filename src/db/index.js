// import promise from 'bluebird';
// import pg from 'pg-promise';
const config = require('../config/env');
const promise = require("bluebird")
const pg = require("pg-promise")



const options = {
  promiseLib: promise,
};

const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

module.exports = db;