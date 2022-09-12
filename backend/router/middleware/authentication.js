const jwt = require("jsonwebtoken");

//this function  to chick if the user is a valid user or not by checking if the token is valid or not 
const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const valid = jwt.verify(token, process.env.JWTSecertKey);
    req.token = valid;
    next();
  } catch (error) {
    res.status(403).json("forbidden");
  }
};

module.exports = { authentication };
