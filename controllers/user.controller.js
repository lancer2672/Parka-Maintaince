const pool = require("../db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
    if (res.rowCount === 0) {
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

  if (checkEmailDuplicate(email)) {
    return res.status(400).json({ message: "email has already been used" });
  }
  try {
    isUserExisted = await checkPhoneDuplicate(phoneNumber);
    if (isUserExisted) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const harshedPassword = await bcrypt.hash(password, 12);
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

  const { phoneNumber } = req.body;
  try {
    isUserExitsed = await checkPhoneDuplicate(phoneNumber);
    if (isUserExitsed) {
      return res.json({ data: true });
    } else {
      return res.json({ data: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
