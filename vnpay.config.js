// vnpay.config.js
require('dotenv').config();

module.exports = {
  secretKey: process.env.VNPAY_SECRET_KEY,
  returnUrl: process.env.VNPAY_RETURN_URL,
  vnpUrl: process.env.VNPAY_URL,
  merchantCode: process.env.VNPAY_MERCHANT_CODE,
  hashAlgorithm: process.env.VNPAY_HASH_ALGORITHM, // optional
};
