const express = require("express");
const crudUserController = require("../controller/CrudUser");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post(
  "/api/user/postData",
  authMiddleware,
  crudUserController.createUser
);
router.get("/api/user/getData", crudUserController.getAllUser);

module.exports = router;
