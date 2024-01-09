const Joi = require("joi");


const create = {
  body: Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    password: Joi.string().required(),
    email: Joi.string().optional(),
    countryCode: Joi.string().optional(),
    phone: Joi.string().optional(),
  })
}

const login = {
  body: Joi.object()
  .keys({
    password: Joi.string().required(),
    email: Joi.string().optional(),
    countryCode: Joi.string().optional(),
    phone: Joi.string().optional(),
  }).xor("email","phone")
}

module.exports = {
  create,
  login
}