const db = require("../db")
const queries = require("../query")
const { hashPassword } = require("../utils")

const createUser = async (body) => {
  const { firstName, lastName, email, password, isFirstUser } = body;
  const encryptedPassword = await hashPassword(password);
  const payload = [
    firstName,
    lastName,
    email,
    encryptedPassword,
    isFirstUser
  ];
  return db.any(queries.newUser, payload);
};

const signIn = (email) => {
  const payload = [email];
  return db.any(queries.login, payload)
}

const isUser = (email) => {
  const payload = [email];
  return db.any(queries.checkUser, payload);
};

const addDiary = (body, user_id) => {
 const {name, description, content} = body;
 const payload = [name, description, content, user_id];
 return db.any(queries.addDiary, payload);
};

const updateDiary = (body) => {
  const {name, description, content, id} = body;
  const payload = [name, description, content, id];
  return db.any(queries.updateDiary, payload);
 };

const fetchUserDiary = (id) => {
   const payload = [id];
   return db.any(queries.fetchUsers, payload);
 }; 

 const searchDiary = (query) => db.any(queries.searchDiary, `%${query.toLowerCase()}%`);
 const deleteDiary = (id) => db.any(queries.deleteDiary, [id]);
 
 //  admin services 
 const Users = () => db.query(queries.allUser);
 const diaries = () => db.query(queries.userDiaries); 
 const adminSearchDiary = (query) => db.any(queries.adminSearchDiary, `%${query.toLowerCase()}%`);

 const adminAddDiaryForUSer = (body, user_id) => {
  const {name, description, content} = body;
  const payload = [name, description, content, user_id];
  return db.any(queries.adminAddDiary, payload);
 };

 const adminUpdateUser = (body, id) => {
  const {first_name, last_name, email, } = body;
  const payload = [first_name, last_name, email, id];
  return db.any(queries.editUser, payload);
 };

 const adminEditDiary = (body, id) => {
   console.log(body, id);
  const {description, content} = body;
  const payload = [description, content, id];
  return db.any(queries.adminUpdateUserDiary, payload);
 };
 
module.exports = {
  createUser,
  signIn,
  isUser,
  Users,
  addDiary,
  updateDiary,
  fetchUserDiary,
  searchDiary,
  deleteDiary,
  diaries,
  adminSearchDiary,
  adminAddDiaryForUSer,
  adminUpdateUser,
  adminEditDiary
}