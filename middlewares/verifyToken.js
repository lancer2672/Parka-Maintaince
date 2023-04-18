const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const authHeader = req.header("Authorization");

  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.header("x-access-token");
  if (!token) {
    return res
      .status(401)
      .json({ sucess: false, message: "Access Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Error when verifyToken", err);
    return res.status(403).json({ sucess: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
