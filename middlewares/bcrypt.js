const bcrypt = require('bcrypt');
const saltRounds = 10;

function encryptPassword(password){
  try{
   return bcrypt.hash(password, saltRounds);
  }
  catch(err){
    throw err;
  }
}

function decryptPassword(password, hash){
  try{
   return bcrypt.compare(password, hash);
  }
  catch(err){
    throw err;
  }
}

module.exports = {
  encryptPassword,
  decryptPassword
}