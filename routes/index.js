const router = require("express").Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const companyRouter = require("./company.route");
const ticketRouter = require("./ticket.route");
const parkingLotRouter = require("./parking-lot.route");
const parkingSlotRouter = require("./parking-slot.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company", companyRouter);
router.use("/ticket", ticketRouter);
router.use("/parking-lot", parkingLotRouter);
router.use("/parking-slot", parkingSlotRouter);

module.exports = router;
