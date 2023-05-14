const pool = require("../db");
exports.getOneParkingLot = async (req, res) => {
  const parkingLotId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM parking_lot WHERE id = $1 AND deleted_at IS NULL",
      [parkingLotId]
    );

    if (result.rowCount !== 0) {
      const modifiedResult = {
        ...result.rows[0],
        startTime: result.rows[0].start_time,
        endTime: result.rows[0].end_time,
        companyID: result.rows[0].company_id,
      };
      return res.json({
        data: modifiedResult,
      });
    } else {
      return res.status(404).json({
        error: {
          detail: "Record not found",
        },
        code: "NOT_FOUND",
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
exports.getListParkingLot = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = (page - 1) * pageSize;
    const result = await pool.query(
      "SELECT * FROM parking_lot WHERE deleted_at IS NULL ORDER BY id LIMIT $1 OFFSET $2",
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

exports.deleteOne = async (req, res) => {
  const parkingLotId = req.params.id;
  const deletedAt = new Date();
  try {
    const result = await pool.query(
      "UPDATE parking_lot SET deleted_at = $1 WHERE id = $2",
      [deletedAt, parkingLotId]
    );
    if (result.rowCount !== 0) {
      return res.json({ data: "Xoá bản ghi thành công" });
    } else {
      return res.status(400).json({
        error: {
          detail: "ID không hợp lệ",
        },
        code: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOne = async (req, res) => {
  const parkingLotId = req.params.id;
  const {
    name,
    description,
    address,
    startTime,
    endTime,
    lat,
    long,
    companyID,
  } = req.body;
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
      `UPDATE parking_lot SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        address = COALESCE($3, address),
        start_time = COALESCE($4, start_time),
        end_time = COALESCE($5, end_time),
        lat = COALESCE($6, lat),
        long = COALESCE($7, long),
        company_id = COALESCE($8, company_id)
        WHERE id = $9`,
      [
        name,
        description,
        address,
        startTime,
        endTime,
        lat,
        long,
        companyID,
        parkingLotId,
      ]
    );

    if (result.rowCount !== 0) {
      return res.json({
        data: "Cập nhật bản ghi thành công",
      });
    } else {
      return res.status(404).json({
        error: {
          detail: "ID không hợp lệ",
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

exports.create = async (req, res) => {
  const {
    name,
    description = "",
    address = "",
    startTime,
    endTime,
    lat,
    long,
    companyID,
  } = req.body;

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
      "INSERT INTO parking_lot (name, description, address, start_time, end_time, lat, long, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [name, description, address, startTime, endTime, lat, long, companyID]
    );

    const createdRecord = {
      ...result.rows[0],
      startTime: result.rows[0].start_time,
      endTime: result.rows[0].end_time,
      companyID: result.rows[0].company_id,
    };

    return res.status(201).json({
      data: createdRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
