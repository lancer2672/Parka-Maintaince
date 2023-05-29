const router = require("express").Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const companyRouter = require("./company.route");
const ticketRouter = require("./ticket.route");
const parkingLotRouter = require("./parking-lot.route");
const blockRouter = require("./block.route");
const parkingSlotRouter = require("./parking-slot.route");
const vehicleRouter = require("./vehicle.route");
const timeFrameRouter = require("./time-frame.route");
const favoriteRouter = require("./favorite.route");
const reservationRouter = require("./reservation.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company", companyRouter);
router.use("/ticket", ticketRouter);
router.use("/parking-lot", parkingLotRouter);
router.use("/block", blockRouter);
router.use("/parking-slot", parkingSlotRouter);
router.use("/vehicle", vehicleRouter);
router.use("/time-frame/", timeFrameRouter);
router.use("/favorite", favoriteRouter);
router.use("/reservations", reservationRouter);

module.exports = router;
