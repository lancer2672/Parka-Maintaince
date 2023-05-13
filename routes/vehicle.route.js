const router = require("express").Router();
// const { query } = require("express");
const VehicleController = require("../controllers/vehicle.controller");
const { body } = require("express-validator");
const { query } = require("express-validator");

router.post("/create", VehicleController.CreateVehicle);

router.get("/get-one/:id", VehicleController.GetOneVehicle);

router.get("/get-list", VehicleController.GetListVehicle);

router.put("/update/:id", VehicleController.UpdateVehicle);

router.delete("/delete/:id", VehicleController.DeleteVehicle);

module.exports = router;