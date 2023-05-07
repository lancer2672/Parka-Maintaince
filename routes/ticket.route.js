const router = require("express").Router();
// const { query } = require("express");
const TicketController = require("../controllers/ticket.controller");
const { body } = require("express-validator");
const { query } = require("express-validator");

router.post(
  "/create",
  body("vehicleId").exists().withMessage("[VehicleId: VehicleId Can not be empty]"),
  body("userId").exists().withMessage("[UserId: UserId Can not be empty]"),
  body("parkingSlotId").exists().withMessage("[ParkingSlotId: ParkingSlotId Can not be empty]"),
  body("parkingLotId").exists().withMessage("[ParkingLotId: ParkingLotId Can not be empty]"),
  body("timeFrameId").exists().withMessage("[TimeFrameId: TimeFrameId Can not be empty]"),
  body("startTime").exists().withMessage("[StartTime: StartTime Can not be empty]"),
  body("endTime").exists().withMessage("[EndTime: EndTime Can not be empty]"),
  TicketController.CreateTicket
);

router.get(
  "/get-all",
  query("userId").exists().withMessage("[UserId: UserId Can not be empty]"),
  TicketController.GetAllTicket);

router.get("/get-one-with-extend/:id", TicketController.GetOneTicketWithExtend);

router.put("/cancel", TicketController.CancelTicket);

router.post(
  "/extend", 
  body("ticketOriginId").exists().withMessage("[TicketOriginId: TicketOriginId Can not be empty]"),
  body("timeFrameId").exists().withMessage("[TimeFrameId: TimeFrameId Can not be empty]"),
  body("startTime").exists().withMessage("[StartTime: StartTime Can not be empty]"),
  body("endTime").exists().withMessage("[EndTime: EndTime Can not be empty]"),
  TicketController.ExtendTicket);

router.post("/procedure", TicketController.ProcedureWithTicket);

router.get("/c/get-all", TicketController.GetAllTicketCompany);

module.exports = router;

