const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use } = require("../routes");

const checkPhoneDuplicate = async (phoneNumber) => {
  console.log("phoneNumber", phoneNumber);
  try {
    const res = await pool.query(
      "SELECT * FROM users WHERE phone_number = $1",
      [phoneNumber]
    );
    if (res.rowCount === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
};
const checkEmailDuplicate = async (email) => {
  console.log("email", email);
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("res.row", res.rowCount);
    if (res.rowCount == 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
};

exports.CreateUser = async (req, res) => {
  let isUserExisted = false;
  const { phoneNumber, password, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (checkEmailDuplicate(email) == true) {
    return res.status(400).json({ message: "email has already been used" });
  }
  try {
    isUserExisted = await checkPhoneDuplicate(phoneNumber);
    if (isUserExisted) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const harshedPassword = await bcrypt.hash(password, 10);
      console.log("harhsed password", harshedPassword);
      const result = await pool.query(
        "INSERT INTO users(phone_number, password, email) VALUES ($1, $2, $3) RETURNING *",
        [phoneNumber, harshedPassword, email]
      );

      if (result.rowCount !== 0) {
        return res.json({
          message: "Create user successfully",
          user: result.rows[0],
        });
      } else return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.CheckDuplicatePhoneNumber = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phone_number } = req.body;
  try {
    isUserExitsed = await checkPhoneDuplicate(phone_number);
    if (isUserExitsed) {
      return res.json({ data: true });
    } else {
      return res.json({ data: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.UpdateUserById = async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber, password, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (checkEmailDuplicate(email)) {
    return res.status(400).json({ message: "email has already been used" });
  }

  try {
    const harshedPassword = await bcrypt.hash(password, 12);
    const result = await pool.query(
      "UPDATE users SET phone_number = $1, password = $2, email = $3 WHERE id = $4 RETURNING *",
      [phoneNumber, harshedPassword, email, userId]
    );

    if (result.rowCount !== 0) {
      return res.json({
        message: "Update user successfully",
        user: result.rows[0],
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rowCount !== 0) {
      return res.json({
        user: result.rows[0],
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.HandleLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone_number=$1",
      [username]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "User does not exists" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return res.json({
      data: {
        accessToken: token,
        refreshToken: token,
        phoneNumber: user.phone_number,
        displayName: user.display_name,
        id: user.id,
        email: user.email,
        imageUrl: user.image_url,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.ResetPassword= async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone_number=$1",
      [username]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "User does not exists" });
    }

    const harshedPassword = await bcrypt.hash(password, 10);
    console.log("harhsed password", harshedPassword);
      const result2 = await pool.query(
        "Update users set password=$1 where phone_number=$2", [harshedPassword, username]
      );

      if (result2.rowCount !== 0) {
        return res.json({
          message: "Reset password successfully.",
          user: result2.rows[0],
        });
      } else return res.status(500).json({ message: "Failed to reset password" });

  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};