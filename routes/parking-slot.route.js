const express = require("express");
const router = express.Router();
const ParkingSlotController = require("./../controllers/parking-slot.controller");
const verifyToken = require("../middlewares/verifyToken");
const { route } = require("./auth.route");
const { body } = require("express-validator");
const { query } = require("express-validator");

router.post("/create/",ParkingSlotController.CreateParkingSlot);
router.get("/get-one/:id", ParkingSlotController.GetOneParkingSlot);
router.put("/update/:id", ParkingSlotController.UpdateParkingSlot);
router.delete("/delete/:id", ParkingSlotController.DeleteParkingSlot);
router.get("/get-list/", ParkingSlotController.GetListParkingSlot);
router.get(
    "/available/", 
    query("parkingLotId").exists().withMessage("[ParkingLotId: ParkingLotId Can not be empty]"),
    query("start").exists().withMessage("[Start: Start Can not be empty]"),
    query("end").exists().withMessage("[End: End Can not be empty]"),
ParkingSlotController.GetAvailableParkingSlot);

module.exports = router;