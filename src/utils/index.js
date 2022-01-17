const bcrypt = require("bcryptjs");
require("bluebird").config()
// const jwt = require("jsonwebtoken");


const hashPassword = (password) => {
  const encryptedPassword = bcrypt.hash(password, 10);
  return encryptedPassword;
};

const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

module.exports = {
    hashPassword,
    comparePassword
}