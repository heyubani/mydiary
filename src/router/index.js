const express = require('express');
const { createUserSchema, loginUserSchema, addDiarySchema} = require("../validation")
const {
  checkUser,
  authenticateToken,
  authenticateIsAdmin,
  allUsers,
  validateUser
} = require('../middleware');
const {
  getUsers,
  adminSearchUser,
  getAllDiaries,
  adminSearch_diary,
  adminAddDiary,
  adminEditUser,
  adminEditUserDiary,
} = require('../controller/admin');
const {
  createNewUser,
  logIn,
  diary,
  updateUserDiary,
  getUserDiary,
  UserSearchDiary,
  deleteUserDiary,
} = require('../controller/index');
const router = express.Router();


// user endpoints
router.post('/api/signup',validateUser(createUserSchema), allUsers, checkUser, createNewUser);
router.post('/api/signin',validateUser(loginUserSchema), logIn);
router.post('/api/user/diary',validateUser(addDiarySchema), authenticateToken, diary);
router.put('/api/user/diary/:id', authenticateToken, updateUserDiary);
router.get('/api/user/diary/:id', authenticateToken, getUserDiary);
router.get('/api/user/search/diary', authenticateToken, UserSearchDiary);
router.delete('/api/user/diary/:id', authenticateToken, deleteUserDiary);
// admin endpoints
router.get(
  '/api/admin/fetch-users',
  authenticateToken,
  authenticateIsAdmin,
  getUsers,
);
router.get('/api/admin/search/user', authenticateIsAdmin, adminSearchUser);
router.get('/api/admin/search/diary', authenticateIsAdmin, adminSearch_diary);
router.get('/api/admin/get-diaries', authenticateIsAdmin, getAllDiaries);
router.post('/api/admin/add-diary/:user_id', authenticateToken, adminAddDiary);
router.put('/api/admin/edit_user/:id', authenticateToken, adminEditUser);
router.put(
  '/api/admin/edit_user_diary/:id',
  authenticateToken,
  adminEditUserDiary,
);

module.exports = router;
