const router = require("express").Router();
const validate = require("../../../middlewares/Validate")
const adminValidation = require("../validation/admin.validation")
const adminController = require("../controller/admin.controller");
const jwt = require("../../../middlewares/sessionManger")

router.post(
  "/create",
  validate(adminValidation.create),
  adminController.create
);

router.post(
  "/login",
  validate(adminValidation.login),
  adminController.login
);

router.get(
  "/getAllUserDetails",
  jwt.authenticateAccessToken(),
  adminController.getAllUser
)

router.get(
  "/getUserById/:id",
  jwt.authenticateAccessToken(),
  adminController.getUserById
)

router.delete(
  "/deleteUserById/:id",
  jwt.authenticateAccessToken(),
  adminController.deleteUserById
)

router.post(
  "/editUserById/:id",
  jwt.authenticateAccessToken(),
  adminController.editUserById
)

module.exports = router