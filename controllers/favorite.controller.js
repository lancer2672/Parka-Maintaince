const pool = require("../db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.CreateFavorite = async (req, res) => {
  const { userId, parkingLotId } = req.body;
  console.log("Create Favorite", {
    userId: userId,
    parkingLotId: parkingLotId,
  });
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
    const result = await pool.query(
      "INSERT INTO favorite(user_id, parking_lot_id) VALUES ($1, $2) RETURNING *",
      [userId, parkingLotId]
    );
    const favorite = result.rows[0];

    const result2 = await pool.query(
      "Update favorite set creator_id = $1, updater_id = $2 where id=$3 RETURNING *",
      [favorite.id, favorite.id, favorite.id]
    );

    const returnData = result2.rows[0];
    return res.json({
      data: {
        id: returnData.id,
        creator_id: returnData.creator_id,
        updater_id: returnData.updater_id,
        created_at: returnData.created_at,
        updated_at: returnData.updated_at,
        userId: returnData.user_id,
        parkingLotId: returnData.parking_lot_id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetAll = async (req, res) => {
  const userId = req.query.userId;
  const parkingLotId = req.query.parkingLotId;
  console.log("GetAllFavourite", {
    userId: userId,
    parkingLotId: parkingLotId,
  });

  try {
    const result = await pool.query(
      "select * from favorite where user_id = $1 AND deleted_at is NULL ",
      [userId]
    );

    const parkingLots = [];
    for (let i = 0; i < result.rows.length; i++) {
      const res = await pool.query(
        "select * from parking_lot where id = $1 AND deleted_at is NULL ",
        [result.rows[i].parking_lot_id]
      );
      console.log("res", res.rows[0]);
      parkingLots.push(res.rows[0]);
    }

    let data2 = null;
    try {
      const result2 = await pool.query(
        "select * from parking_lot where id = $1 AND deleted_at is NULL ",
        [parkingLotId]
      );
      data2 = result2.rows[0];
    } catch {
      console.log("There is no parkingLotId input");
    }

    if (result.rowCount < 1)
      return res.json({
        error: {
          detail:
            "Error when get all favorite parking by user id: ERROR: invalid input syntax for type uuid: " +
            userId +
            " (SQLSTATE 22P02) ",
        },
        code: "",
      });

    const modifiedResult = result.rows.map((row, i) => {
      if (data2 != null) {
        if (data2.id == row.parking_lot_id)
          return {
            id: row.id,
            creator_id: row.creator_id,
            updater_id: row.updater_id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            userId: row.userId,
            parkingLotId: {
              id: data2.id,
              created_at: data2.created_at,
              updated_at: data2.updated_at,
              name: data2.name,
              description: data2.description,
              address: data2.address,
              startTime: data2.start_time,
              endTime: data2.end_time,
              lat: parseFloat(data2.lat),
              long: parseFloat(data2.long),
              companyId: data2.company_id,
            },
          };
        else {
          console.log(data2);
          return {
            id: row.id,
            creator_id: row.creator_id,
            updater_id: row.updater_id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            userId: row.user_id,
            parkingLotId: row.parking_lot_id,
          };
        }
      } else {
        console.log(data2);
        return {
          id: row.id,
          creator_id: row.creator_id,
          updater_id: row.updater_id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          userId: row.user_id,
          parkingLotId: row.parking_lot_id,
          ParkingLots: parkingLots,
        };
      }
    });

    return res.json({
      data: modifiedResult,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetOne = async (req, res) => {
  const userId = req.query.userId;
  const parkingLotId = req.query.parkingLotId;

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

  console.log("UserID: " + userId + " and parkingLotId: " + parkingLotId);
  if (userId == "undefined" || parkingLotId == "undefined")
    return res.status(500).json({
      errors: {
        detail: "Error when delete favorite parking: record not found",
      },
      code: "",
    });
  try {
    const result = await pool.query(
      "select * from favorite where user_id = $1 and parking_lot_id = $2 and deleted_at is NULL",
      [userId, parkingLotId]
    );

    if (result.rowCount < 1)
      return res.status(500).json({
        errors: {
          detail: "Error when delete favorite parking: record not found",
        },
        code: "",
      });
    const returnData = result.rows[0];

    return res.json({
      data: {
        id: returnData.id,
        creator_id: returnData.creator_id,
        updater_id: returnData.updater_id,
        created_at: returnData.created_at,
        updated_at: returnData.updated_at,
        userId: returnData.user_id,
        parkingLotId: returnData.parking_lot_id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteOne = async (req, res) => {
  const id = req.params.id;
  let time = new Date();
  console.log("delete favorite params", { id: id });
  try {
    const result = await pool.query(
      "UPDATE favorite SET deleted_at = $1 WHERE id = $2 and deleted_at is NULL RETURNING *",
      [time, id]
    );
    console.log("delete favorite result", result.rowCount);
    if (result.rowCount !== 0) {
      const parkingSlot = result.rows[0];
      return res.json();
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
