const router = require("express").Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const companyRouter = require("./company.route");
const ticketRouter = require("./ticket.route");
const parkingLotRouter = require("./parking-lot.route");
<<<<<<< HEAD
const blockRouter = require("./block.route")
=======
const parkingSlotRouter = require("./parking-slot.route");
>>>>>>> c41933c1946dc592768ca1a4030f4df8039d6840

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company", companyRouter);
router.use("/ticket", ticketRouter);
router.use("/parking-lot", parkingLotRouter);
<<<<<<< HEAD
router.use("/block",blockRouter);
=======
router.use("/parking-slot", parkingSlotRouter);
>>>>>>> c41933c1946dc592768ca1a4030f4df8039d6840

module.exports = router;
