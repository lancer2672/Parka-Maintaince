const express = require("express");
const router = express.Router();
const ParkingLotController = require("./../controllers/parking-lot.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/get-one/:id", ParkingLotController.getOneParkingLot);
router.get("/get-list", ParkingLotController.getListParkingLot);
router.delete("/delete/:id", ParkingLotController.deleteOne);
router.put("/update/:id", ParkingLotController.updateOne);
router.post("/create/", ParkingLotController.create);
router.get("/get-list-company", ParkingLotController.GetListParkingLotCompany);

module.exports = router;
