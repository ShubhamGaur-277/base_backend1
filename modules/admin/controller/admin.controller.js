const {admin, userService} = require("../../../config");
const {encryptPassword, decryptPassword} = require("../../../middlewares/bcrypt")
const jwt = require("../../../middlewares/sessionManger");

const create = async (req, res, next)=>{
  try {
    const snapshot = await admin.where("email", "==", req.body.email).get();
    if (!snapshot.empty) {
      return next("Admin with the same email already exists");
    }
    let password = req.body.password;
    let hash = await encryptPassword(password);
    delete req.body.password;
    req.body.password = hash;
    const data = await admin.add(req.body);
    res.send({
      message: "Success",
      result: data.id,
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return next("Error creating admin");
  }
}

const login = async (req, res, next)=>{
  try {
    let queryByEmail 
    let queryByPhone 
    if(req.body.phone){
      queryByPhone = await admin
      .where("phone", "==", req.body.phone)
      .get();
    } else {
      queryByEmail = await admin
      .where("email", "==", req.body.email)
      .get();
    }

    const snapshot = queryByEmail.empty ? queryByPhone : queryByEmail;
    if (snapshot.empty) {
      return next("Invalid credentials");
    }
    let password = req.body.password;
    
    delete req.body.password;
    let userData = snapshot.docs[0].data();
;
    let result = await decryptPassword(password,userData.password)

    if(!result){
      return next("invalid credentials")
    }

    const accesstoken = await jwt.generateAccessToken(userData);
    userData = {...userData,...{token: accesstoken}}
    res.send({
      message: "Success",
      result: userData,
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return next("Error creating admin");
  }
}

const getAllUser = async (req, res, next) => {
  try {
    
    const snapshot = await userService.get();
    const userData = snapshot.docs.map((doc) => doc.data());

    res.send({
      data: userData,
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    return next("Error getting all users");
  }
};

const getUserById = async (req, res, next)=> {
  try{
    const snapshot = await userService.doc(req.params.id).get();
    
    if (!snapshot.exists) {
      return next("User not found");
    }
    const userData = snapshot.data();
   
    res.send({
      data: userData,
      message: "success"
    })
  } catch (error){
    console.log(error);
    return next(error)
  }
}

const deleteUserById = async (req, res, next)=> {
  try{
    const snapshot = await userService.doc(req.params.id).get();
    
    if (!snapshot.exists) {
      return next("User not found");
    }
    const userData = await userService.doc(req.params.id).delete();
   
    res.send({
      data: userData,
      message: "success"
    })
  } catch (error){
    console.log(error);
    return next(error)
  }
}

const editUserById = async (req, res, next)=> {
  try{
    const snapshot = await userService.doc(req.params.id).get();
    
    if (!snapshot.exists) {
      return next("User not found");
    }
    const userData = await userService.doc(req.params.id).update(req.body);
   
    res.send({
      data: userData,
      message: "success"
    })
  } catch (error){
    console.log(error);
    return next(error)
  }
}

module.exports = {
  create,
  login,
  getAllUser,
  getUserById,
  deleteUserById,
  editUserById
}