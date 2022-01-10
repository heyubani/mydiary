const dotenv = require('dotenv')
// const pgp = require('pg-promise')
const {Client} = require('pg')

dotenv.config()

const db = new Client({
    host: "localhost",
    port : 5432,
    user: "postgres",
    password: "root",
    database: "miracle"
})


module.exports = db