const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use } = require("../routes");

exports.CreateCompany = async (req, res) => {
  const { email, companyName, phoneNumber, password } = req.body;

  console.log(email, companyName, phoneNumber, password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO company(name, phone_number, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, phoneNumber, email, passwordHash]
    );
    console.log("result", result.rows[0]);
    const company = result.rows[0];
    return res.json({
      data: {
        id: company.id,
        created_at: company.created_at,
        updated_at: company.updated_at,
        name: company.name,
        phoneNumber: company.phone_number,
        email: company.email,
        password: company.password
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

exports.UpdateCompany = async(req, res) => {
  const companyId = req.params.id;
  const { email, companyName, phoneNumber} = req.body;


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  try {
    
    const result = await pool.query(
      "UPDATE company SET email = $1, name = $2, phone_number = $3 WHERE id = $4 RETURNING *",
      [email, companyName, phoneNumber, companyId]
    );

    if (result.rowCount !== 0){
      // return res.json({
      //   message: "Update company successfully",
      //   company: result.rows[0],
      // });

      console.log("result", result.rows[0]);
      const company = result.rows[0];
      return res.json({
        data: {
          id: company.id,
          created_at: company.created_at,
          updated_at: company.updated_at,
          name: company.name,
          phoneNumber: company.phone_number,
          email: company.email,
          password: company.password
        },
    });

    }
    else {
      return res.status(404).json({message: "Company not found"});
    }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
  }
};
  
