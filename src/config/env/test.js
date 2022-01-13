require("dotenv/config")


module.exports = {
    DATABASE_URL: process.env.DATABASE_TEST_URL,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    API_VERSION: process.env.API_VERSION,
    SECRET_KEY: process.env.SECRET_KEY
}