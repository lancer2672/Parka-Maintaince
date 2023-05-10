const router = require("express").Router();
const BlockController = require("../controllers/block.controller");
const { body } = require("express-validator");

router.post("/create", 
body("code").exists().withMessage("[Code: Missing Code]"),
  body("description").exists().withMessage("[Desciption: Missing Description]"),
  body("slot").exists().withMessage("[Slot: Missing Slot]"),
  body("parkingLotId").exists().withMessage("[ParkingLotId: Missing ParkingLotId]"),
BlockController.create)

router.get("/get-one/:id", BlockController.GetBlockById);
router.get("/get-list", BlockController.getListBlock)
router.put("update/:id",BlockController.updateOne)
router.delete("/delete/:id", BlockController.deleteOne)

module.exports = router