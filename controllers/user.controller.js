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
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (res.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.CreateUser = async (req, res) => {
  let isUserExisted = false;
  let { phoneNumber, password, email, displayName } = req.body;
  if (email == null) email = "";
  if (displayName == null) displayName = "";
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
      return res
        .status(400)
        .json({ error: { detail: "Số điện thoại đã tồn tại" }, code: "" });
    } else {
      const harshedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO users(phone_number, password, email,display_name,social_id,image_url) VALUES ($1, $2, $3, $4,'','') RETURNING *",
        [phoneNumber, harshedPassword, email, displayName]
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
  const { phoneNumber, password, email, displayName, ImageUrl } = req.body;
  try {
    let updateValues = {};
    if (phoneNumber != null) {
      updateValues.phone_number = phoneNumber;
    }
    if (password != null) {
      updateValues.password = await bcrypt.hash(password, 12);
    }
    if (email != null) {
      if (await checkEmailDuplicate(email, userId)) {
        return res.status(400).json({ message: "email has already been used" });
      } else {
        updateValues.email = email;
      }
    }
    if (displayName != null) {
      updateValues.display_name = displayName;
    }
    if (ImageUrl != null) {
      updateValues.image_url = ImageUrl;
    }
    if (Object.keys(updateValues).length === 0) {
      // nếu không có giá trị nào được cập nhật
      return res.status(400).json({ message: "No values to update" });
    }

    const values = Object.values(updateValues);
    const setClause = Object.keys(updateValues)
      .map((key, index) => {
        return `${key} = $${index + 1}`;
      })
      .join(", ");

    const query = {
      text: `UPDATE users SET ${setClause} WHERE id = $${
        values.length + 1
      } RETURNING *`,
      values: [...values, userId],
    };

    const result = await pool.query(query);

    if (result.rowCount !== 0) {
      return res.json({
        message: "Update user successfully",
        data: result.rows[0],
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
  if (!userId) {
    return res.status(400).json({
      error: {
        detail: "Bắt buộc phải có id user",
      },
      code: "",
    });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rowCount !== 0) {
      return res.json({
        data: result.rows[0],
      });
    } else {
      return res.status(404).json({
        error: {
          detail: "Not found user",
        },
        code: "",
      });
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

exports.DeleteUserById = async (req, res) => {
  const userId = req.params.id;
  const deletedAt = new Date();

  try {
    const result = await pool.query(
      "UPDATE users SET deleted_at = $1 WHERE id = $2",
      [deletedAt, userId]
    );

    if (result.rowCount !== 0) {
      console.log(`User with id ${userId} has been deleted`);
    } else {
      res.status(400).json({
        error: {
          detail: "Wrong id",
        },
        code: "",
      });
      console.log(`User with id ${userId} not found`);
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.ResetPassword = async (req, res) => {
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
      "Update users set password=$1 where phone_number=$2",
      [harshedPassword, username]
    );

    if (result2.rowCount !== 0) {
      return res.json({
        message: "Reset password successfully.",
        user: result2.rows[0],
      });
    } else return res.status(500).json({ message: "Failed to reset password" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
