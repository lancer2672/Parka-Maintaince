const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { validationResult } = require("express-validator");

exports.HandleLogin = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  // const { username, password } = req.body;
  // try {
  //   const result = await pool.query(
  //     "SELECT * FROM users WHERE phone_number=$1",
  //     [username]
  //   );
  //   const user = result.rows[0];
  //   if (!user) {
  //     return res.status(401).json({ message: "User does not exists" });
  //   }
  //   const isValidPassword = await bcrypt.compare(password, user.password);
  //   if (!isValidPassword) {
  //     return res.status(401).json({ message: "Authentication failed" });
  //   }
  //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  //   return res.json({
  //     accessToken: token,
  //     refreshToken: token,
  //     phoneNumber: user.phone_number,
  //     id: user.id,
  //     email: user.email,
  //     imageUrl: user.image_url,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};
