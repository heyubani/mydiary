const express = require("express")
const { checkUser, authenticateToken } = require("../middleware")
const {createNewUser,logIn, diary, updateUserDiary, getUserDiary, searchDiary, deleteUserDiary,  allUsers} = require("../controller")
const router = express.Router();

router.post("/api/signup", checkUser, createNewUser)
router.post("/api/signin", logIn)

router.post("/api/user/diary",authenticateToken, diary)
router.put("/api/user/diary/:id",authenticateToken, updateUserDiary)
router.get("/api/user/diary/:id",authenticateToken, getUserDiary)
router.get("/api/user/search/diary",authenticateToken, searchDiary)
router.delete("/api/user/diary/:id",authenticateToken, deleteUserDiary)

// testing
router.get("/api/users", allUsers)

module.exports = router