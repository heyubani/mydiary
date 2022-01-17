const { diary } = require('.');
const {
  searchDiary,
  adminAddDiaryForUSer,
  Users,
  adminSearchDiary,
  adminUpdateUser,
  adminEditDiary,
  diaries
} = require('../services');

const getUsers = async (req, res) => {
  const user = await Users();
  try {
    if (!user) {
      res.json({
        status: 'success',
        Message: 'No user',
      });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.log(error.Message);
  }
};

const getAllDiaries = async (req, res) => {
    const diaries = await Users();
    try {
      if (!diaries) {
        res.json({
          status: 'success',
          Message: 'No diaries',
        });
      }
      res.status(200).json({
        status: 'success',
        totalDiaries: diaries.length,
        data: diaries
      });
    } catch (error) {
      console.log(error.Message);
    }
  };

const adminSearchUser = async (req, res) => {
    try {
      const search = req.query.search;
      const data = await searchDiary(search);
      if (!data) {
        res.json({
          status: 'error',
          message: `No ${search} found`,
        });
      }
      res.json({
        status: 'success',
        message: 'successfully fetched',
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const adminSearch_diary = async (req, res) => {
    try {
      const search = req.query.search;
      const data = await adminSearchDiary(search);
      if (!data) {
        res.json({
          status: 'error',
          message: `No ${search} found`,
        });
      }
      res.json({
        status: 'success',
        message: 'successfully fetched',
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const adminAddDiary = async (req, res) => {
    const user_id = req.params.user_id;
    const userDiary = await adminAddDiaryForUSer(req.body, user_id);
    try {
      res.json({
        status: 'success',
        message: 'diary added',
        data: userDiary
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const adminEditUser = async (req, res) => {
    try {
      const user_id = req.params.id;
      const editUser = await adminUpdateUser(req.body, user_id);
      console.log(user_id, "=====<<<<")
        res.json({
          status: 'success',
          message: 'edited user successfully',
          data: [...editUser]
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    const adminEditUserDiary = async (req, res) => {
      try {
        const { id } = req.params;
        // console.log(user_id, id, req.params);
        const editUserDiary = await adminEditDiary(req.body, id);
        console.log("==", editUserDiary, "======----")
    
        res
          .json({
            status: 'success',
            message: 'admin edited user diary',
            data: editUserDiary,
          })
          .status(201);
      } catch (error) {
        console.log(">>>>>>",error.message);
      }
    };


module.exports = {
  getUsers,
  adminSearchUser,
  adminSearch_diary,
  getAllDiaries,
  adminAddDiary,
  adminEditUser,
  adminEditUserDiary
};
