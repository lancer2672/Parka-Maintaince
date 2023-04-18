const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { body } = require("express-validator");

router.post(
  "/login",
  body("password").exists().withMessage("password is missing"),
  body("email").exists().withMessage("email is missing"),
  AuthController.HandleLogin
);

module.exports = router;
