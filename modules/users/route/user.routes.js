const router = require("express").Router();
const userController = require("../controller/user.controller");
const userValidation = require("../validation/user.validation");
const validate = require("../../../middlewares/Validate");

router.post(
  "/createUser",
  validate(userValidation.createUser),
  userController.createUser
);

module.exports = router;
