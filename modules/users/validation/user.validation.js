const Joi = require("joi");

const createUser = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().optional(),
      password: Joi.string().required(),
      email: Joi.string().optional(),
      countryCode: Joi.string().optional(),
      phone: Joi.string().optional(),
    }).xor("email", "phone"),
};

const login = {
  body: Joi.object()
  .keys({
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    password: Joi.string().required()
  }).xor("email", "phone"),
};

const update = {
  body: Joi.object().
  keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    image : Joi.string().optional()
  })
}

module.exports = {
  createUser,
  login,
  update
}