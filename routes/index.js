const router = require("express").Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const companyRouter = require("./company.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company",companyRouter);

module.exports = router;
