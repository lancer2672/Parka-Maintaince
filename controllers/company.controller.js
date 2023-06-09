const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.CreateCompany = async (req, res) => {
  const { email, companyName, phoneNumber, password } = req.body;

  console.log(email, companyName, phoneNumber, password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        detail: errors
          .array()
          .map((err) => err.msg)
          .join(" "),
      },
      code: "",
    });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO company(name, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, phoneNumber, email, passwordHash]
    );
    const company = result.rows[0];
    return res.json({
      data: {
        id: company.id,
        created_at: company.created_at,
        updated_at: company.updated_at,
        name: company.name,
        phoneNumber: company.phone_number,
        email: company.email,
        password: company.password,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetCompanyById = async (req, res) => {
  const companyId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM company WHERE id = $1 and deleted_at is NULL",
      [companyId]
    );
    console.log(companyId);
    if ((result.rowCount !== 0) & (result.rowCount <= 1)) {
      const company = result.rows[0];
      return res.json({
        data: {
          id: company.id,
          created_at: company.created_at,
          updated_at: company.updated_at,
          name: company.name,
          phoneNumber: company.phone_number,
          email: company.email,
          password: company.password,
        },
      });
    } else {
      return res.status(404).json({
        error: {
          route: "Wrong id",
        },
        code: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.UpdateCompany = async (req, res) => {
  const companyId = req.params.id;
  const { email, companyName, phoneNumber } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await pool.query(
      "UPDATE company SET email = $1, name = $2, phone_number = $3 WHERE id = $4 RETURNING *",
      [email, companyName, phoneNumber, companyId]
    );

    if (result.rowCount !== 0) {
      // return res.json({
      //   message: "Update company successfully",
      //   company: result.rows[0],
      // });

      const company = result.rows[0];
      return res.json({
        data: {
          id: company.id,
          created_at: company.created_at,
          updated_at: company.updated_at,
          name: company.name,
          phoneNumber: company.phone_number,
          email: company.email,
          password: company.password,
        },
      });
    } else {
      return res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.UpdateCompanyPassword = async (req, res) => {
  const companyId = req.params.id;
  const { old, new1 } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const companyData = await pool.query(
      "SELECT * FROM company WHERE id = $1",
      [companyId]
    );

    const isValidPassword = await bcrypt.compare(
      old,
      companyData.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect Password" });
    } else {
      try {
        const newHarshedPassword = await bcrypt.hash(new1, 10);
        const result = await pool.query(
          "UPDATE company SET password = $1 WHERE id = $2 RETURNING *",
          [newHarshedPassword, companyId]
        );

        if (result.rowCount !== 0) {
          // return res.json({
          //   message: "Update company successfully",
          //   company: result.rows[0],
          // });

          const company = result.rows[0];
          return res.json({
            data: {
              id: company.id,
              created_at: company.created_at,
              updated_at: company.updated_at,
              name: company.name,
              phoneNumber: company.phone_number,
              email: company.email,
              password: company.password,
            },
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log("login inf", { email: email, password: password });
  try {
    const result = await pool.query("SELECT * FROM company WHERE email=$1", [
      email,
    ]);
    const company = result.rows[0];
    if (!company) {
      return res.status(401).json({ message: "Company does not exists" });
    }

    const isValidPassword = await bcrypt.compare(password, company.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ companyId: company.id }, process.env.JWT_SECRET);
    return res.json({
      data: {
        accessToken: token,
        refreshToken: token,
        created_at: company.created_at,
        updated_at: company.updated_at,
        phoneNumber: company.phone_number,
        name: company.name,
        id: company.id,
        email: company.email,
        password: company.password,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
