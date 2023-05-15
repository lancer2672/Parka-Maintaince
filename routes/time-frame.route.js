const router = require("express").Router();
const TimeFrameController = require("../controllers/time_frame.controller");
const { query } = require("express-validator");

router.get("/get-one/:id", TimeFrameController.getOneTimeFrame);
router.post("/create/", TimeFrameController.createOneTimeFrame);
router.put("/update/:id", TimeFrameController.updateOneTimeFrame);
// router.put("/update/", TimeFrameController.updateListTimeFrame);
router.delete("/delete/:id", TimeFrameController.deleteOneTimeFrame);
router.get(
    "/get-all/", 
    query("parkingLotId").exists().withMessage("[ParkingLotId: ParkingLotId Can not be empty]"),
    TimeFrameController.GetAllTimeFrame);

module.exports = router;
