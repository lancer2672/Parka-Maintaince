const pool = require("../db");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const { code, description, slot, parking_lot_id } = req.body;

  console.log(code, description, slot, parking_lot_id);
  console.log(typeof slot);
  const errors = validationResult(req);
  if (req.body.isEmpty) {
    return res.status(400).json({
      error: {
        detail: "EOF",
      },
      code: "",
    });
  } else if (typeof slot !== "number") {
    return res.status(400).json({
      error: {
        detail:
          "json: cannot unmarshal string into Go struct field BlockReq.slot of type int",
      },
      code: "",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO block(code, description, slot, parking_lot_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [code, description, slot, parking_lot_id]
    );
    const block = result.rows[0];

    const numOfSlots = block.slot; // Assuming "numOfSlot" is a property of the "block" object

    // Insert records into the "parking_slot" table
    for (let i = 1; i <= numOfSlots; i++) {
      let name = `Slot ${i}`;
      await pool.query(
        "INSERT INTO parking_slot(block_id, slot_number, name) VALUES ($1, $2, $3)",
        [block.id, i, name]
      );
    }

    const parkingSlotQuery = await pool.query(
      "SELECT * FROM parking_slot WHERE block_id = $1",
      [block.id]
    );
    const parkingSlots = parkingSlotQuery.rows;

    const result2 = await pool.query(
      "UPDATE block SET creator_id = $1, updater_id = $2 WHERE id = $3 RETURNING *",
      [block.id, block.id, block.id]
    );

    return res.json({
      data: {
        id: block.id,
        created_at: block.created_at,
        updated_at: block.updated_at,
        code: block.code,
        description: block.description,
        slot: slot,
        parkingLotId: block.parking_lot_id,
        parkingSlots: parkingSlots,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetBlockById = async (req, res) => {
  const blockId = req.params.id;
  if (!blockId)
    return res.status(404).json({
      error: {
        route: "Wrong id",
      },
      code: "",
    });
  try {
    const result = await pool.query(
      "SELECT * FROM block WHERE id = $1 and deleted_at is NULL",
      [blockId]
    );
    console.log(blockId);
    if ((result.rowCount !== 0) & (result.rowCount <= 1)) {
      const block = result.rows[0];
      return res.json({
        data: {
          id: block.id,
          created_at: block.created_at,
          updated_at: block.updated_at,
          code: block.code,
          description: block.description,
          slot: parseInt(block.slot),
          parkingLotId: block.parking_lot_id,
          parkingSlot: null,
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

exports.getListBlock = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = (page - 1) * pageSize;
    const result = await pool.query(
      "SELECT * FROM block WHERE deleted_at IS NULL ORDER BY id LIMIT $1 OFFSET $2",
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
      return {
        ...row,
        startTime: row.start_time,
        endTime: row.end_time,
        companyID: row.company_id,
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

exports.updateOne = async (req, res) => {
  const blockId = req.params.id;
  const { code, description, slot, parking_lot_id } = req.body;
  if (code == null) {
    return res.status(400).json({
      error: {
        detail: "[Code: Code can not be empty] ",
      },
      code: "",
    });
  }
  try {
    const result = await pool.query(
      `UPDATE block SET
          code = COALESCE($1, code),
          description = COALESCE($2, description),
          slot = COALESCE($3, slot),
          parking_lot_id = COALESCE($4, parking_lot_id)
          updater_id = COALESCE($5, updater_id)
          WHERE id = $6`,
      [code, description, slot, parking_lot_id, blockId, blockId]
    );

    if (result.rowCount !== 0) {
      return res.json({
        data: "Cập nhật bản ghi thành công",
      });
    } else {
      return res.status(404).json({
        error: {
          detail: "Wrong id",
        },
        code: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: {
        detail: "Internal server error",
      },
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

exports.deleteOne = async (req, res) => {
  const blockId = req.params.id;
  const deletedAt = new Date();
  try {
    const result = await pool.query(
      "UPDATE block SET deleted_at = $1 WHERE id = $2",
      [deletedAt, blockId]
    );
    if (result.rowCount !== 0) {
      return res.json({ data: "Xoá bản ghi thành công" });
    } else {
      return res.status(400).json({
        error: {
          detail: "Wrong id",
        },
        code: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
