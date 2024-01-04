const userService = require("../../../config")
const { encryptPassword, decryptPassword }= require("../../../middlewares/bcrypt")
const sessionManager = require("../../../middlewares/sessionManger")

const createUser = async(req, res, next) => {
  let body = req.body;
  const password = req.body.password;
  delete body["password"];
  const snapshot = await userService.where('email', '==', req.body.email).get();
  if (!snapshot.empty) {
    return next ("user already exist"); 
  }  
  let hash = await encryptPassword(password);
  body = {...body,...{"password": hash}}
  console.log(body);
  await userService.add(body);
  res.send("success");
};

const login = async(req, res, next) => {
  let body = req.body;
  const password = req.body.password;
  delete body["password"];
  const userQuery = await userService.where('email', '==', req.body.email).get();

  if (userQuery.empty) {
    return next("User does not exist");
  }

  const userDoc = userQuery.docs[0];
  const userId = userDoc.id;

  let userData = userDoc.data();
  userData = {...userData, id : userId};
  console.log(userData);
  let result = await decryptPassword(password, userData.password);
  let accessToken = await sessionManager.generateAccessToken(userData);
  if(!result){
   return next(
    "invalid credentials"
    )
  }
  res.send({access_Token: accessToken });
};

const update = async (req, res, next)=> {
  let body = req.body;
  await userService.doc(req.id).update(body)
  res.send({
    message: "success"
  }) 
};

const deleteUser = async (req, res, next)=> {
  let id =  req.params.id;
  console.log(req.params);
  if(id !== req.id){
    return next("not aurthorised")
  }

  let result = await userService.doc(req.id).delete();

  res.send({
    message: "success",
    data: "result"
  })
}

module.exports = {
  createUser,
  login,
  update,
  deleteUser
  }