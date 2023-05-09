const pool = require("../db");
const { validationResult } = require("express-validator");

exports.CreateParkingSlot = async (req, res) => {
    const {name, description, blockID} = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        "error": {
          "detail": errors.array().map((err) => err.msg).join(" "),
        },
        "code": ""
      });
    }

    if (name == null) {
        return res.status(400).json({
            error: {
                detail: "[Name: Name Can not be empty] ",
            },
            code: "",
        });
    }

    try {
        const result = await pool.query(
            "INSERT INTO parking_slot (name, description, block_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description, blockID]
        );

        const parkingSlot = result.rows[0];
        return res.json({
            data: {
                id: parkingSlot.id,
                created_at: parkingSlot.created_at,
                updated_at: parkingSlot.updated_at,
                name: parkingSlot.name,
                description: parkingSlot.description,
                blockID: parkingSlot.block_id,
            }
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

exports.GetOneParkingSlot = async (req, res) => {
    const parkingSlotID = req.params.id;

    if(parkingSlotID == null){
        return res.status(400).json({
          "error": {
            "detail": "Parking slot id is required",
          },
          "code": ""
        });
    }
    try {
        const result = await pool.query(
            "SELECT * FROM parking_slot WHERE id = $1 AND deleted_at IS NULL",
            [parkingSlotID]
        );
        if (result.rowCount !== 0){
            const parkingSlot = result.rows[0];
            return res.json({
                data: {
                    id: parkingSlot.id,
                    created_at: parkingSlot.created_at,
                    updated_at: parkingSlot.updated_at,
                    name: parkingSlot.name,
                    description: parkingSlot.description,
                    blockID: parkingSlot.block_id
                }
            });
        }
        else {
            return res.status(404).json({
                error: {
                  detail: "Record not found",
                },
                code: "NOT_FOUND",
              });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

exports.UpdateParkingSlot = async (req, res) => {
    const parkingSlotID = req.params.id;
    const {name, description, blockID} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        "error": {
          "detail": errors.array().map((err) => err.msg).join(" "),
        },
        "code": ""
      });
    }

    if(parkingSlotID == null){
        return res.status(400).json({
          "error": {
            "detail": "Parking slot id is required",
          },
          "code": ""
        });
    }
    try {
        const result = await pool.query(
            "UPDATE parking_slot SET name = $1, description = $2, block_id = $3 WHERE id = $4 AND deleted_at IS NULL RETURNING *",
            [name, description, blockID, parkingSlotID]
        );
        if (result.rowCount !== 0){
            const parkingSlot = result.rows[0];
            return res.json({
                data: {
                    id: parkingSlot.id,
                    created_at: parkingSlot.created_at,
                    updated_at: parkingSlot.updated_at,
                    name: parkingSlot.name,
                    description: parkingSlot.description,
                    blockID: parkingSlot.block_id
                }
            });
        }
        else {
            return res.status(404).json({
                error: {
                  detail: "Record not found",
                },
                code: "NOT_FOUND",
              });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};