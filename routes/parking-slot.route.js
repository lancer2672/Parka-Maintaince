const express = require("express");
const router = express.Router();
const ParkingSlotController = require("./../controllers/parking-slot.controller");
const verifyToken = require("../middlewares/verifyToken");
const { route } = require("./auth.route");
const { body } = require("express-validator");
const { query } = require("express-validator");

router.post("/create/", ParkingSlotController.CreateParkingSlot);
router.get("/get-one/:id", ParkingSlotController.GetOneParkingSlot);
router.put("/update/:id", ParkingSlotController.UpdateParkingSlot);
router.delete("/delete/:id", ParkingSlotController.DeleteParkingSlot);
router.get("/get-list/", ParkingSlotController.GetListParkingSlot);
router.get(
  "/available/",
  query("parkingLotId")
    .exists()
    .withMessage("[parkingLotId: parkingLotId Can not be empty]"),
  query("start").exists().withMessage("[start: start Can not be empty]"),
  query("end").exists().withMessage("[end: end Can not be empty]"),
  ParkingSlotController.GetAvailableParkingSlot
);

module.exports = router;
