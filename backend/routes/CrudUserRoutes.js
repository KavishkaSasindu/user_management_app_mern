const express = require("express");
const crudUserController = require("../controller/CrudUser");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post(
  "/api/user/postData",
  // authMiddleware,
  crudUserController.createUser
);
router.get("/api/user/getData", authMiddleware, crudUserController.getAllUser);
router.put(
  "/api/user/updateUser/:userId",
  authMiddleware,
  crudUserController.updateUser
);
router.get("/api/user/getData/:userId", crudUserController.getUser);
router.delete(
  "/api/user/deleteUser/:userId",
  authMiddleware,
  crudUserController.deleteUser
);

module.exports = router;
