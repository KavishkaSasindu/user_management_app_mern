const AuthModel = require("../model/UserAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signUp form
const signUpUser = async (request, response) => {
  const { username, address, password, email } = request.body;
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
        address,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        const token = await jwt.sign(
          {
            userId: newUser._id,
            userEmail: newUser.email,
            userAddress: newUser.address,
          },
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

// signInUser
const signInUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    // find user
    const user = await AuthModel.findOne({ email });
    if (user) {
      const authUser = await bcrypt.compare(password, user.password);
      if (authUser) {
        const token = await jwt.sign(
          { userId: user._id, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        return response.status(200).json({
          message: "user found",
          user: user.email,
          token: token,
        });
      } else {
        return response.status(401).json({
          message: "invalid password",
        });
      }
    } else {
      return response.status(401).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: "error occur",
      error: error.message,
    });
  }
};

module.exports = { signUpUser, signInUser };
