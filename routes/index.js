const router = require("express").Router();

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const companyRoutes = require("./company.route");
const ticketRoutes = require("./ticket.route");
const parkingLotRoutes = require("./parking-lot.route");
const blockRoutes = require("./block.route");
const parkingSlotRoutes = require("./parking-slot.route");
const vehicleRoutes = require("./vehicle.route");
const timeFrameRoutes = require("./time-frame.route");
const favoriteRoutes = require("./favorite.route");
const reservationRoutes = require("./reservation.route");
const paymentRoutes = require("./payment.route");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/company", companyRoutes);
router.use("/ticket", ticketRoutes);
router.use("/parking-lot", parkingLotRoutes);
router.use("/block", blockRoutes);
router.use("/parking-slot", parkingSlotRoutes);
router.use("/vehicle", vehicleRoutes);
router.use("/time-frame/", timeFrameRoutes);
router.use("/favorite", favoriteRoutes);
router.use("/reservations", reservationRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
