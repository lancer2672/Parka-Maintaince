const express = require("express");
const router = express.Router();
const ReservationController = require("./../controllers/reservation.controller");

router.post("/create", ReservationController.createReservation);
router.get("/user/:idUser", ReservationController.getAllByIdUser);
router.put("/cancel", ReservationController.cancelReservation);

module.exports = router;
