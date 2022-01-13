const { join } = require("bluebird");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("express/lib/response");
const config = require("../config/env");

const { createUser, signIn, addDiary, updateDiary, fetchUserDiary, searchUser, deleteDiary, users } = require("../services");
const bcrypt = require("bcryptjs");
const call_get = require("bluebird/js/release/call_get");

dotenv.config();

const createNewUser = async (req, res) => {
  try {
    const { body } = req;
    const newUser = await createUser(body);
    const { password, ...user } = newUser;
    res.status(201).json({
      status: "success",
      message: `created successfully`,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signIn(email);
    const { password: pwd, is_admin, id, ...rest } = user[0];
    const passwordIsCorrect = bcrypt.compareSync(password, pwd);

    if (passwordIsCorrect) {
      const payload = { user_id: id, is_admin };
      const token = jwt.sign(payload, config.SECRET_KEY, {
        expiresIn: 60 * 60 * 10, // 10 hours
      });
      req.token = token;

      res.status(200).json({
        status: "success",
        message: "user authenticated",
        data: {
          id,
          is_admin,
          ...rest,
        },
        token,
      });
    } else {
      res.json({
        status: "error",
        message: "wrong login details",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const diary = async (req, res) => {
  const add_diary = req.body;
  const userDiary = await addDiary(add_diary, req.decoded.user_id);
  try {
    res.json({
      status: "success",
      message: "diary added",
      userDiary,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const allUsers = async (req, res) => {
  const user = await users(req.body);
  try {
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log;
  }
};

const updateUserDiary = async (req, res) => {
  try {
    const { id } = req.params
    const diary = await updateDiary({...req.body, id})

    res.json({
      status: "success",
      message: "user updated diary",
      data: diary
    }).status(201)
    
  } catch (error) {
    console.log(error.message);
  }
}

const getUserDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const diary = await fetchUserDiary(id)
    if(!diary) {
      res.json({
        status: "error",
        message: `No user with ${id} found`,
      })
    } else{
      res.json({
        status: "success",
        message: "successfully fetched user diary",
        data: [...diary]
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const searchDiary =async (req, res) => {
  try {
    const search = req.query.search
    const data = await searchUser(search)
    if(!data){
      res.json({
        status: "error",
        message: `No ${search} found`
      })
    }
    res.json({
      status: "success",
      message: "successfully fetched",
      data
    })
  } catch (error) {
    console.log(error.message)
  }
}

const deleteUserDiary = async (req, res) => {
  try {
    const {id} = req.params
    const data = await deleteDiary(id);
    if(!data) {
      res.json({
      status: "success",
      message: `No diary with id ${id}`
    })
    }

    res.status(201).json({
      status: "success",
      message: "deleted user diary",
      data
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNewUser,
  logIn,
  allUsers,
  diary,
  updateUserDiary,
  getUserDiary,
  searchDiary,
  deleteUserDiary
};
