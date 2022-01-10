const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
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