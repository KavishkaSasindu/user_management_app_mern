const express = require("express");
const crudUserController = require("../controller/CrudUser");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post(
  "/api/user/postData",
  authMiddleware,
  crudUserController.createUser
);
router.get("/api/user/getData", authMiddleware, crudUserController.getAllUser);
router.put(
  "/api/user/updateUser/:id",
  authMiddleware,
  crudUserController.updateUser
);
router.get("/api/user/getData/:id", authMiddleware, crudUserController.getUser);
router.delete(
  "/api/user/deleteUser/:id",
  authMiddleware,
  crudUserController.deleteUser
);

module.exports = router;
