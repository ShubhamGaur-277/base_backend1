const router = require("express").Router();
const adminRoute = require("./admin.routes");

router.use("/", adminRoute);

module.exports = router;