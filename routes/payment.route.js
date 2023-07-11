// payment.route.js
const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment.controller");

router.post("/create", PaymentController.CreatePayment);
router.get("/return", PaymentController.HandleReturn);
// router.get("/get-one/:id", PaymentController.GetOnePayment);
// router.put("/update/:id", PaymentController.UpdatePayment);
// router.delete("/delete/:id", PaymentController.DeletePayment);
// router.get("/get-list", PaymentController.GetListPayment);

module.exports = router;
