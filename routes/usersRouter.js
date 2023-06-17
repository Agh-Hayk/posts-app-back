const express = require("express");
const router = express.Router();
const controller = require("../conntrollers/userController");

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);

module.exports = router;
