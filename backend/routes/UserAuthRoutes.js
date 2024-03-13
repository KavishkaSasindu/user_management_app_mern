const express = require("express");
const AuthUserController = require("../controller/AuthUserContoller");

const router = express.Router();

router.post("/api/user/signUp", AuthUserController.signUpUser);

module.exports = router;
