const router = require("express").Router();
const CompanyController = require("../controllers/company.controller");
const { body } = require("express-validator");

router.get("/get-one/:id",CompanyController.GetCompanyById);

module.exports = router;
