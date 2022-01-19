const development = require("./development")
const test = require("./test")


const {
    APP_PORT,
    NODE_ENV
} = process.env
console.log('>>>>>>>', NODE_ENV);
const currentEnv = {
  development,
  test
}[NODE_ENV || "development"]

module.exports = {
    ...process.env,
    ...currentEnv,
    APP_PORT,
    NODE_ENV
}