const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  body("password").exists().withMessage("password is missing"),
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

router.put("/update/:id", UserController.UpdateUserById);

router.get("/:id", UserController.GetUserById);
router.delete("/:id", UserController.DeleteUserById);
router.post(
  "/reset-password",
  body("password").exists().withMessage("password is missing"),
  body("username").exists().withMessage("username is missing"),
  UserController.ResetPassword
);

router.get("/update", UserController.GetUserById);

module.exports = router;
