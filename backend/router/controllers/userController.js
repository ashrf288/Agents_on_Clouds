const userModel = require("../../db/models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new userModel({ name, email, password });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const chickPassword = await bcrypt.compare(password, user.password);
      if (chickPassword === true) {
        const payload = {
          userId: user._id,
          userName: user.name,
          type: user.type,
        };
        const token = jwt.sign(payload, process.env.JWTSecertKey,{expiresIn: "1h"});
        res.status(200).json({ token, type: user.type });
      } else {
        res.status(403).json("wrong PassWord!");
      }
    } else {
      res.status(404).json("wrong Email!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = {
  signUp,
  login,
};
