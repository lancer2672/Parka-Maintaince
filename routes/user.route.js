const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  body("password").exists().withMessage("password is missing"),
  body("email").exists().withMessage("email is missing"),
  UserController.CreateUser
);

router.post(
  "/check-phone",
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  UserController.CheckDuplicatePhoneNumber
);

module.exports = router;
