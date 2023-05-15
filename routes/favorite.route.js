const router = require("express").Router();
const FavoriteController = require("../controllers/favorite.controller");
const { body } = require("express-validator");

router.post("/create",
    body("userId").exists().withMessage("userId is missing"),
    body("parkingLotId").exists().withMessage("parkingLotId is missing"),
    FavoriteController.CreateFavorite
)

router.get("/get-all",
FavoriteController.GetAll
)

router.get("/get-one", FavoriteController.GetOne)

router.delete("/delete/:id",FavoriteController.deleteOne)

module.exports = router;