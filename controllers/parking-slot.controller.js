const pool = require("../db");
const { validationResult } = require("express-validator");
const moment  = require('moment-timezone');
const moment_string = require('moment');


const GetParkingSlot = async (parkingSlotId) => {
  console.log("parking_slot_id", parkingSlotId);
  try {
    const res = await pool.query(
      "SELECT * FROM parking_slot WHERE id = $1",
      [parkingSlotId]
    );
    if (res.rowCount !== 0) {
      if(res.rows[0].description == null){
        description = "";
      } else {
        description = res.rows[0].description;
      }

      if(res.rows[0].block_id == null){
        blockID = "00000000-0000-0000-0000-000000000000";
      } else {
        blockID = res.rows[0].block_id;
      }
      const parkingLot = {
        id: res.rows[0].id,
        created_at: res.rows[0].created_at,
        updated_at: res.rows[0].updated_at,
        name: res.rows[0].name,
        description: description,
        blockID: blockID
      };
      return parkingLot;
    }
  } catch (err) {
    throw err;
  }
};


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
        });
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
          if (result.rows[0].description == null){
            parkingSlot.description = "";
          }
          if (result.rows[0].block_id == null){
            parkingSlot.block_id = "00000000-0000-0000-0000-000000000000";
          }
          return res.json({
            data: {
              id: parkingSlot.id,
              created_at: parkingSlot.created_at,
              updated_at: parkingSlot.updated_at,
              name: parkingSlot.name,
              description: parkingSlot.description,
              blockID: parkingSlot.block_id,
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

exports.DeleteParkingSlot = async (req, res) => {
    const parkingSlotID = req.params.id;
    let time = moment().tz('7').format('YYYY-MM-DD HH:mm:ss.SSS');

    if(parkingSlotID == null){
        return res.status(400).json({
          "error": {
            "detail": "Parking slot id is required",
          },
          "code": ""
        });
    }
    try {
        let entryTime = moment_string(time).toISOString();
        const result = await pool.query(
            "UPDATE parking_slot SET deleted_at = $1 WHERE id = $2 RETURNING *",
            [entryTime, parkingSlotID]
        );
        if (result.rowCount !== 0){
            const parkingSlot = result.rows[0];
            return res.json({
                data:  "Xóa bản ghi thành công"
                
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


exports.GetListParkingSlot = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 30;
        const offset = (page - 1) * pageSize;
        const result = await pool.query(
          "SELECT * FROM parking_slot WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2",
          [pageSize, offset]
        );
    
        const totalRows = result.rowCount;
    
        const totalPages = Math.ceil(totalRows / pageSize);
    
        const meta = {
          page: page,
          page_size: pageSize,
          total_pages: totalPages,
          total_rows: totalRows,
        };
        const modifiedResult = result.rows.map((row, i) => {
          if (result.rows[i].description == null){
            row.description = "";
          }
          if (result.rows[i].block_id == null){
            row.block_id = "00000000-0000-0000-0000-000000000000";
          }

          return {
            id: row.id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            name: row.name,
            description: row.description,
            blockID: row.block_id
          };
        });
        return res.json({
          data: modifiedResult,
          meta: meta,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    
};

exports.GetAvailableParkingSlot = async (req, res) => {
  const {parkingLotId, start, end} = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      "error": {
        "detail": errors.array().map((err) => err.msg).join(" "),
      },
      "code": ""
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM block WHERE parking_lot_id = $1 AND deleted_at IS NULL",
      [parkingLotId]
    );
    if (result.rowCount !== 0){
      let blocks = [];
      for (let i = 0; i < result.rowCount; i++){
        const result2 = await pool.query(
          "SELECT * FROM parking_slot WHERE block_id = $1 AND deleted_at IS NULL",
          [result.rows[i].id]
        );

        let parkingSlots = [];
        for (let j = 0; j < result2.rowCount; j++){
          let parkingSlot = await GetParkingSlot(result2.rows[j].id);
          parkingSlots.push(parkingSlot);
        }
        

          let block = {
            id : result.rows[i].id,
            created_at: result.rows[i].created_at,
            updated_at: result.rows[i].updated_at,
            code : "Block",
            description: result.rows[i].description,
            slot : parseInt(result.rows[i].slot),
            parkingLotId : result.rows[i].parking_lot_id,
            parkingSlots : parkingSlots
          }
          blocks.push(block);
        }
      
      return res.json({data: blocks});
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};