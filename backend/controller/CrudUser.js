const CrudUser = require("../model/CrudUserModel");

const createUser = async (request, response) => {
  const { firstName, lastName, gender, contact, address, email } = request.body;
  try {
    const existUser = await CrudUser.findOne({ email });
    if (existUser) {
      return response.status(200).json({
        message: "user already exist with this email",
      });
    }
    const user = await CrudUser.create({
      firstName,
      lastName,
      gender,
      contact,
      address,
      email,
    });
    if (user) {
      return response.status(201).json({
        message: "user created success",
        data: user,
      });
    } else {
      return response.status(400).json({
        message: "user not created",
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: "error",
      error: error.message,
    });
  }
};

// getAllUsers
const getAllUser = async (request, response) => {
  try {
    const users = await CrudUser.find({});
    if (users) {
      return response.status(200).json({
        message: "fetching all data",
        data: users,
      });
    } else {
      return response.status(404).json({
        message: "no users in my db",
      });
    }
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
};

// update a user
const updateUser = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedUser = await CrudUser.findByIdAndUpdate(id, request.body);
    if (updatedUser) {
      return response.status(200).json({
        message: "user updated",
      });
    } else {
      return response.status(400).json({
        message: "user not updated",
      });
    }
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { createUser, getAllUser, updateUser };
