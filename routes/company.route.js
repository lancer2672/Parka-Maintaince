const router = require("express").Router();
const CompanyController = require("../controllers/company.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  body("email").exists().withMessage("[Email: Email Can not be empty]"),
  body("companyName").exists().withMessage("[Name: Name Can not be empty]"),
  body("phoneNumber").exists().withMessage("[PhoneNumber: PhoneNumber Can not be empty]"),
  body("password").exists().withMessage("[Password: Password Can not be empty]"),
  CompanyController.CreateCompany
);

router.get("/get-one/:id", CompanyController.GetCompanyById);

router.put(
  "/update/:id",
  body("email").exists().withMessage("email is missing"),
  body("companyName").exists().withMessage("companyName is missing"),
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  CompanyController.UpdateCompany
)

router.put(
  "/update-password/:id",
  body("old").exists().withMessage("old password is missing"),
  body("new1").exists().withMessage("new password is missing"),
  CompanyController.UpdateCompanyPassword
)

module.exports = router;
