const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
router.get('/return', PaymentController.HandleReturn);
router.post('/create_payment', PaymentController.CreatePaymentURL);
module.exports = router;
