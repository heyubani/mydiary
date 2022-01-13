const db = require("../db")
const queries = require("../query")
const { hashPassword } = require("../utils")

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


const signIn = (email) => {
  const payload = [email];
  return db.any(queries.login, payload)
}

const isUser = (email) => {
  const payload = [email];
  return db.any(queries.checkUser, payload)
}

const users = () => db.query(queries.allUser) 

const addDiary = (body, user_id) => {
 const {name, description, content} = body;
 const payload = [name, description, content, user_id];
 return db.any(queries.addDiary, payload)
}

const updateDiary = (body) => {
  const {name, description, content, id} = body;
  const payload = [name, description, content, id];
  return db.any(queries.updateDiary, payload);
 };

 const fetchUserDiary = (id) => {
   const payload = [id];
   return db.any(queries.fetchUsers, payload);
 }; 

 const searchUser = (query) => db.any(queries.searchUser, `%${query.toLowerCase()}%`);

 const deleteDiary = (id) => db.any(queries.deleteDiary, [id]);


module.exports = {
  createUser,
  signIn,
  isUser,
  users,
  addDiary,
  updateDiary,
  fetchUserDiary,
  searchUser,
  deleteDiary
}