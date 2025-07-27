const express = require("express");
const {
  getUserController,
  updateUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;
