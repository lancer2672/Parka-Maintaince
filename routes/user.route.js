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
  "/login",
  body("username").exists().withMessage("username is missing"),
  body("password").exists().withMessage("password is missing"),
  UserController.HandleLogin
);

router.post(
  "/check-phone",
  body("phone_number").exists().withMessage("phone_number is missing"),
  UserController.CheckDuplicatePhoneNumber
);

router.post(
  "/update",
  body("password").exists().withMessage("password is missing"),
  body("username").exists().withMessage("username is missing"),
  body("imageUrl").exists().withMessage("imageUrl is missing"),
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  body("email").exists().withMessage("email is missing"),
  UserController.UpdateUserById
);

router.get("/update", UserController.GetUserById);

module.exports = router;
