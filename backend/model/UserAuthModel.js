const mongoose = require("mongoose");

const UserAuthModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password must be 6 characters minimum"],
  },
});

const user = mongoose.model("authUsers", UserAuthModel);

module.exports = user;
