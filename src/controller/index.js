const { join } = require("bluebird");
const dotenv = require("dotenv");
const { json } = require("express/lib/response");
const { createUser, users} = require("../services")

dotenv.config()

const createNewUser = async (req, res) => {
    try {
      const { body } = req;
      const newUser = await createUser(body);
      const {
        password,
        ...user
      } = newUser;
  
      res.status(201).json({
        status: "success",
        message: `created successfully`,
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  };


const allusers = async (req, res) => {
    const user = await users(req.body)
    try {
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log
    }
}

  module.exports = {
      createNewUser,
      allusers
  }