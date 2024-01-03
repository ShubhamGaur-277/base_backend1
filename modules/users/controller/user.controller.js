const userService = require("../../../config")

const createUser = async(req, res, next) => {
  const body = req.body;
  const snapshot = await userService.where('email', '==', req.body.email).get();
  if (!snapshot.empty) {
    return next ("user already exist"); 
  }  
  await userService.add(body);
  res.send("success");
};

module.exports = {createUser}