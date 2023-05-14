const router = require("express").Router();
const TimeFrameController = require("../controllers/time_frame.controller");
router.get("/get-one/:id", TimeFrameController.getOneTimeFrame);
router.post("/create/", TimeFrameController.createOneTimeFrame);
router.put("/update/:id", TimeFrameController.updateOneTimeFrame);
// router.put("/update/", TimeFrameController.updateListTimeFrame);
router.delete("/delete/:id", TimeFrameController.deleteOneTimeFrame);
module.exports = router;
