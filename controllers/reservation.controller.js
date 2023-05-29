const pool = require("../db");
const { validationResult } = require("express-validator");

const STATUS = {
  SCHEDULED: "scheduled",
  ONGOING: "ongoing",
  END: "end",
  CANCEL: "cancel",
};
exports.createReservation = async (req, res) => {
  const {
    idVehicle,
    idUser,
    idParkingSlot,
    idTimeFrame,
    startTime,
    endTime,
    bookingDate,
    duration,
    total,
  } = req.body;
  console.log("Create reservation req.body", req.body);
  //(“scheduled, “ongoing”, “end”, “cancel”)
  const status = STATUS.SCHEDULED;
  try {
    const result = await pool.query(
      "INSERT INTO reservation (id_vehicle, id_user, id_parking_slot, id_time_frame, start_time, end_time, booking_date, duration, total, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        idVehicle,
        idUser,
        idParkingSlot,
        idTimeFrame,
        startTime,
        endTime,
        bookingDate,
        duration,
        total,
        status,
      ]
    );

    if (result.rowCount !== 0) {
      const createdReservation = result.rows[0];
      return res.json({
        message: "Create reservation successfully",
        data: createdReservation,
      });
    } else {
      return res.status(500).json({ message: "Failed to create reservation" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllByIdUser = async (req, res) => {
  const { idUser } = req.params;
  const { status } = req.query;
  console.log("Get all reservations by idUser:", idUser);
  console.log("Get all reservations by status", status);

  try {
    const result = await pool.query(
      "SELECT * FROM reservation WHERE id_user = $1 AND status = $2",
      [idUser, status]
    );

    if (result.rowCount !== 0) {
      const reservations = result.rows;
      const modifiedReservation = reservations.map((reservation) => {
        return {
          ...reservation,
          bookingDate: reservation.booking_date,
          endTime: reservation.end_time,
          startTime: reservation.start_time,
        };
      });
      return res.json({ data: modifiedReservation });
    } else {
      return res
        .status(404)
        .json({ message: "No reservations found for the given user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.cancelReservation = async (req, res) => {
  // List of reservation IDs to cancel
  const listId = req.body.listId;
  console.log("Cancel reservation listId", listId);
  try {
    const promises = listId.map(async (reservationId) => {
      const result = await pool.query(
        "UPDATE reservation SET status = $1 WHERE id = $2 RETURNING *",
        [STATUS.CANCEL, reservationId]
      );
      return result.rows[0];
    });

    const canceledReservations = await Promise.all(promises);

    if (canceledReservations.length > 0) {
      return res.json({
        success: true,
        message: "Reservations canceled successfully",
        data: canceledReservations,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Reservations not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
