const express = require("express")
const {createNewUser, allusers} = require("../controller")
const router = express.Router();

router.post("/api/signup", createNewUser)
router.get("/api/users", allusers)

module.exports = router