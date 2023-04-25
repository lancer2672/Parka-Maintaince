const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use } = require("../routes");

exports.GetCompanyById = async (req, res) => {
    const companyId = req.params.id;
    try {
      const result = await pool.query("SELECT * FROM company WHERE id = $1", [companyId]);
      console.log(companyId);
      if (result.rowCount !== 0) {
        const company=result.rows[0];
        return res.json({
          data: {
            id: company.id,
            created_at: company.created_at,
            updated_at: company.updated_at,
            name: company.name,
            phoneNumber: company.phone_number,
            email: company.email,
            password: company.password
          }
        });
      } else {
        return res.status(404).json({ error: {
            detail: "Wrong id",
        }});

      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  