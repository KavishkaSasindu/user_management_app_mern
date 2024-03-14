const express = require("express");
const crudUserController = require("../controller/CrudUser");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/api/user/getData", authMiddleware, crudUserController.getUserData);

module.exports = router;
