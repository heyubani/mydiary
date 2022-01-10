const db = require("../config")
const queries = require("../query")
const {comparePassword, hashPassword } = require("../utils")

    const createUser = async (body) => {
  const { firstName, lastName, email, password } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [
    firstName,
    lastName,
    email,
    encryptedPassword,
    false
  ];
  return db.any(queries.newUser, payload);
};

const users = () => db.any(queries.allUser) 


module.exports = {
  createUser,
  users
}