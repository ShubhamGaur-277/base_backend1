const router = require("express").Router();
const userController = require("../controller/user.controller");
const userValidation = require("../validation/user.validation");
const validate = require("../../../middlewares/Validate");
const {authenticateAccessToken} = require("../../../middlewares/sessionManger")

router.post(
  "/createUser",
  validate(userValidation.createUser),
  userController.createUser
);

router.post(
  "/login",
  validate(userValidation.login),
  userController.login
)

router.put(
  "/update",
  authenticateAccessToken("user"),
  validate(userValidation.update),
  userController.update
)

router.delete(
  "/delete/:id",
  authenticateAccessToken("user"),
  userController.deleteUser
)

module.exports = router;
