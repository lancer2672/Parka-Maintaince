const pool = require("../db");
const { validationResult } = require("express-validator");

exports.getOneTimeFrame = async (req, res) => {
  const parkingLotId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM time_frame WHERE parking_lot_id = $1 AND deleted_at IS NULL",
      [parkingLotId]
    );

    if (result.rowCount !== 0) {
      const modifiedResult = {
        ...result.rows[0],
        parkingLotId: parkingLotId,
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

exports.createOneTimeFrame = async (req, res) => {
  const { duration, cost, parkingLotId } = req.body;
  if (!duration || !cost || !parkingLotId) {
    return;
  }
  const parsedCost = parseInt(cost);
  if (isNaN(parsedCost)) {
    return res.status(400).json({
      error: {
        detail: "Cost is not a valid number",
      },
      code: "INVALID_INPUT",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO time_frame (duration, cost, parking_lot_id) VALUES ($1, $2, $3) RETURNING *",
      [duration, cost, parkingLotId]
    );
    if (result.rowCount !== 0) {
      const modifiedResult = {
        ...result.rows[0],
        parkingLotId: parkingLotId,
      };
      return res.json({
        data: modifiedResult,
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

exports.updateOneTimeFrame = async (req, res) => {
  //do API gốc nó cũng lấy api của parkingLotId
  const parkingLotId = req.params.id;
  const { duration, cost } = req.body;
  const updatedAt = new Date();
  if (!duration || !cost) {
    return;
  }
  const parsedCost = parseInt(cost);
  if (isNaN(parsedCost)) {
    return res.status(400).json({
      error: {
        detail: "Cost is not a valid number",
      },
      code: "INVALID_INPUT",
    });
  }
  try {
    const result = await pool.query(
      "UPDATE time_frame SET duration = $1, cost = $2, updated_at = $3 WHERE parking_lot_id = $4 AND deleted_at IS NULL RETURNING *",
      [duration, cost, updatedAt, parkingLotId]
    );
    if (result.rowCount !== 0) {
      const modifiedResult = {
        ...result.rows[0],
        parkingLotId: parkingLotId,
      };
      return res.json({
        data: modifiedResult,
      });
    } else {
      return res.status(404).json({
        error: {
          detail: "Timeframe not found",
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

exports.deleteOneTimeFrame = async (req, res) => {
  const parkingLotId = req.params.id;
  const deletedAt = new Date();
  try {
    const result = await pool.query(
      "UPDATE time_frame SET deleted_at = $1 WHERE parking_lot_id = $2 AND deleted_at IS NULL",
      [deletedAt, parkingLotId]
    );
    if (result.rowCount !== 0) {
      return res.json({ data: "Timeframe deleted successfully" });
    } else {
      return res.status(404).json({
        error: {
          detail: "Timeframe not found",
        },
        code: "NOT_FOUND",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.updateListTimeFrame = async (req, res) => {
//     const parkingLotId = req.params.id;
//     const timeFrameList = req.body.data;
//     const updatedAt = new Date();
//     if (!timeFrameList || timeFrameList.length <= 0) {
//       return res.status(400).json({
//         error: {
//           detail: "Timeframe list is not provided or empty",
//         },
//         code: "INVALID_INPUT",
//       });
//     }
//     try {
//       const results = [];
//       for (let i = 0; i < timeFrameList.length; i++) {
//         const { duration, cost } = timeFrameList[i];
//         if (!duration || !cost) {
//           return res.status(400).json({
//             error: {
//               detail: "Duration and cost are required fields",
//             },
//             code: "INVALID_INPUT",
//           });
//         }
//         const parsedCost = parseInt(cost);
//         if (isNaN(parsedCost)) {
//           return res.status(400).json({
//             error: {
//               detail: "Cost is not a valid number",
//             },
//             code: "INVALID_INPUT",
//           });
//         }
//         const result = await pool.query(
//           "UPDATE time_frame SET duration = $1, cost = $2, updated_at = $3 WHERE parking_lot_id = $4 AND id = $5 AND deleted_at IS NULL RETURNING *",
//           [duration, cost, updatedAt, parkingLotId, timeFrameList[i].id]
//         );
//         if (result.rowCount !== 0) {
//           results.push({
//             ...result.rows[0],
//             parkingLotId: parkingLotId,
//           });
//         } else {
//           return res.status(404).json({
//             error: {
//               detail: `Timeframe with id ${timeFrameList[i].id} not found`,
//             },
//             code: "NOT_FOUND",
//           });
//         }
//       }
//       return res.json({
//         data: results,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         error: {
//           detail: "Internal server error",
//         },
//         code: "INTERNAL_SERVER_ERROR",
//       });
//     }
//   };


exports.GetAllTimeFrame = async (req, res) => {
  const {parkingLotId} = req.query;

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
      "SELECT * FROM time_frame WHERE parking_lot_id = $1 AND deleted_at IS NULL",
      [parkingLotId]
    );
    console.log(result);

    if (result.rowCount !== 0) {
      let timeFrameList = [];
      for (let i = 0; i < result.rowCount; i++) {
        let timeFrame = {
          id: result.rows[i].id,
          created_at: result.rows[i].created_at,
          updated_at: result.rows[i].updated_at,
          duration: parseInt(result.rows[i].duration),
          cost: parseFloat(result.rows[i].cost),
          parkingLotId: result.rows[i].parking_lot_id,
        };
        timeFrameList.push(timeFrame);
      }

      return res.json({data: {data: timeFrameList}});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
