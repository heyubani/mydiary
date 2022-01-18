const Joi = require("joi");

const createUserSchema = {
  schema: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
  message: "Error creating user",
}; 

const loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const addDiarySchema = {
    schema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        content: Joi.string().required()
    })
}

module.exports = {
    createUserSchema,
    loginUserSchema,
    addDiarySchema
}