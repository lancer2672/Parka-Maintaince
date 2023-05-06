const router = require("express").Router();
const TicketController = require("../controllers/ticket.controller");
const { body } = require("express-validator");

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


router.get("/get-all", TicketController.GetAllTicketCompany);

module.exports = router;

