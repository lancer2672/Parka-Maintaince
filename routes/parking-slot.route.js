const express = require("express");
const router = express.Router();
const ParkingSlotController = require("./../controllers/parking-slot.controller");
const verifyToken = require("../middlewares/verifyToken");
const { route } = require("./auth.route");
const { body } = require("express-validator");

router.post("/create/",ParkingSlotController.CreateParkingSlot);

module.exports = router;