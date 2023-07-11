// payment.controller.js
const VNPay = require("node-vnpay");
const vnpayConfig = require("../vnpay.config");
let vnpay = new VNPay(vnpayConfig);

exports.CreatePayment = async (req, res) => {
  // Lấy thông tin thanh toán từ request body
  const { transactionRef, amount, orderInfo } = req.body;

  // Tạo URL thanh toán
  let payURL = await vnpay.genPayURL({
    transactionRef,
    amount,
    orderInfo,
  });

  // Trả về URL thanh toán cho client
  res.json({ payURL });
};
// payment.controller.js
exports.HandleReturn = (req, res) => {
  // Lấy thông tin kết quả giao dịch từ VNPay
  const vnpayData = req.query;

  // TODO: Xử lý thông tin kết quả giao dịch từ VNPay
  console.log("vnpayata", vnpayData);
  // Trả về kết quả cho VNPay
  res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
};
