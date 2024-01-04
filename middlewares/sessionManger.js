const jwt = require("jsonwebtoken");

const createAccessToken = async (payload, userDetails)=> {
  return jwt.sign(
    {...payload,
    type: "access-token",
    },
    process.env.ACCESS_TOKEN_SECRET)
};

async function generateAccessToken(payload){
  const token = await createAccessToken(payload);
  return token;
};
const authenticateAccessToken = (userType) =>{
  return async (req, res, next)=>{
    try {
      const token = req.headers.access_token;
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.id = user.id;
      next();
    } catch (error) {
  console.error('Error during authentication:', error);
  res.status(401).json({ error: 'Unauthorized' });
}
}};

module.exports = {
  generateAccessToken,
  authenticateAccessToken
}