const router = require("express").Router();
const CompanyController = require("../controllers/company.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  body("email").exists().withMessage("email is missing"),
  body("companyName").exists().withMessage("companyName is missing"),
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  body("password").exists().withMessage("password is missing"),
  CompanyController.CreateCompany
);

router.get("/get-one/:id",CompanyController.GetCompanyById);

router.put(
  "/update/:id",
  body("email").exists().withMessage("email is missing"),
  body("companyName").exists().withMessage("companyName is missing"),
  body("phoneNumber").exists().withMessage("phoneNumber is missing"),
  CompanyController.UpdateCompany
)



module.exports = router;
