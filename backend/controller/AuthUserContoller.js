const AuthModel = require("../model/UserAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signUp form
const signUpUser = async (request, response) => {
  const { username, password, email } = request.body;
  try {
    // exist user
    const existUser = await AuthModel.findOne({ email });
    if (existUser) {
      return response.status(400).json({
        message: "user already in database",
      });
    } else {
      // bcrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await AuthModel.create({
        username,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        const token = await jwt.sign(
          { userId: newUser._id, userEmail: newUser.email },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        return response.status(201).json({
          message: "user created",
          user: newUser.email,
          token: token,
        });
      } else {
        return response.status(400).json({
          message: "user not created",
        });
      }
    }
  } catch (error) {
    return response.status(400).json({
      message: "error occur",
      error: error.message,
    });
  }
};
