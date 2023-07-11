const vnpayConfig = require("../vnpay.config");
const moment = require("moment");
const querystring = require("qs");
exports.HandleReturn = (req, res) => {
  // Lấy thông tin kết quả giao dịch từ VNPay
  const vnpayData = req.query;

  // TODO: Xử lý thông tin kết quả giao dịch từ VNPay
  console.log("vnpayata", vnpayData);
  // Trả về kết quả cho VNPay
  res
    .status(200)
    .json({ RspCode: vnpayData.vnp_ResponseCode, Message: "Confirm Success" });
};

exports.CreatePaymentURL = async (req, res) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = vnpayConfig.merchantCode;
  var secretKey = vnpayConfig.secretKey;
  var vnpUrl = vnpayConfig.vnpUrl;
  var returnUrl = vnpayConfig.returnUrl;
  var date = moment();
  const createDate = date.format("YYYYMMDDHHmmss");
  const orderId = date.format("HHmmss");
  var bankCode = "NCB";
  var amount = req.body.amount;
  var orderInfo = "thanh toan tien giu xe";
  var orderType = 100000;
  var locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  return res.json({ vnpUrl });
  res.redirect(vnpUrl);
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
// // Lấy thông tin từ request body
// const {amount, bankCode, orderDescription, orderType, language} = req.body;

// // Lấy các thông tin cần thiết từ cấu hình và request
// const vnpUrl = vnpayConfig.vnpUrl;
// const returnUrl = vnpayConfig.returnUrl;
// const ipAddr =
//   req.headers['x-forwarded-for'] ||
//   req.connection.remoteAddress ||
//   req.socket.remoteAddress ||
//   req.connection.socket.remoteAddress;

// // Tạo các thông tin cần thiết cho URL thanh toán
// const vnp_Params = {
//   vnp_Version: '2.1.0',
//   vnp_Command: 'pay',
//   vnp_TmnCode: vnpayConfig.merchantCode,
//   vnp_Locale: language || 'vn',
//   vnp_CurrCode: 'VND',
//   vnp_TxnRef: generateOrderId(), // Hàm generateOrderId() tạo mã đơn hàng duy nhất
//   vnp_OrderInfo: orderDescription,
//   vnp_OrderType: orderType,
//   vnp_Amount: amount * 100,
//   vnp_ReturnUrl: returnUrl,
//   vnp_IpAddr: ipAddr,
//   vnp_CreateDate: getCurrentDateTime(), // Hàm getCurrentDateTime() lấy ngày giờ hiện tại
// };

// if (bankCode) {
//   vnp_Params['vnp_BankCode'] = bankCode;
// }

// // Sắp xếp các thuộc tính của vnp_Params
// const sortedParams = sortObject(vnp_Params);

// const querystring = require('qs');
// const signData = querystring.stringify(sortedParams, {encode: false});
// const crypto = require('crypto');
// const hmac = crypto.createHmac('sha512', vnpayConfig.secretKey);
// const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
// sortedParams['vnp_SecureHash'] = signed;

// const paymentUrl =
//   vnpUrl + '?' + querystring.stringify(sortedParams, {encode: false});

// // Trả về URL thanh toán cho client
// res.json({paymentUrl});
