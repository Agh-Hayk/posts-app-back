const express = require("express");
const router = express.Router();
const controller = require("../conntrollers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
router.get("/protected", verifyToken, controller.protected);

module.exports = router;
