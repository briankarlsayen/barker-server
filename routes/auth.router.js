const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.put("/setpass/:id", authController.setPassword);

module.exports = router;
