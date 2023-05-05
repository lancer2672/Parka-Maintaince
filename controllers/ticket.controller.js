const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use } = require("../routes");

const GetVehicle = async (vehicleId) => {
  console.log("vehicle_id", vehicleId);
  try {
    const res = await pool.query(
      "SELECT * FROM vehicle WHERE id = $1",
      [vehicleId]
    );
    if (res.rowCount !== 0) {
      const vehicle = res.rows[0];
      return vehicle;
    }
  } catch (err) {
    throw err;
  }
};

const GetParkingLot = async (parkingLotId) => {
  console.log("parking_lot_id", parkingLotId);
  try {
    const res = await pool.query(
      "SELECT * FROM parking_lot WHERE id = $1",
      [parkingLotId]
    );
    if (res.rowCount !== 0) {
      const parkingLot = res.rows[0];
      return parkingLot;
    }
  } catch (err) {
    throw err;
  }
};

const GetParkingSlot = async (parkingSlotId) => {
  console.log("parking_slot_id", parkingSlotId);
  try {
    const res = await pool.query(
      "SELECT * FROM parking_slot WHERE id = $1",
      [parkingSlotId]
    );
    if (res.rowCount !== 0) {
      const parkingSlot = res.rows[0];
      return parkingSlot;
    }
  } catch (err) {
    throw err;
  }
};

exports.GetAllTicketCompany = async (req, res) => {
  const parking_lot_id = req.query.parking_lot_id;
  const state = req.query.state;
  try {
    const result = await pool.query("SELECT * FROM ticket WHERE parking_lot_id = $1 AND state = $2", [parking_lot_id, state]);
    console.log(parking_lot_id);
    if (result.rowCount > 0) {
      let tickets = [];
      for(let i = 0; i < result.rowCount; i++){
        let vehicle = await GetVehicle(result.rows[i].vehicle_id);
        let parking_lot = await GetParkingLot(result.rows[i].parking_lot_id);
        let parking_slot = await GetParkingLot(result.rows[i].parking_slot_id);
        let ticket = {
            id: result.rows[i].id,
            userId: result.rows[i].user_id,
            vehicledId: result.rows[i].vehicle_id,
            vehicle: vehicle,
            parkingLotId: result.rows[i].parking_lot_id,
            parkingLot: parking_lot,
            parkingSlotId: result.rows[i].parking_slot_id,
            parkingSlot: parking_slot,
            startTime: result.rows[i].start_time,
            endTime: result.rows[i].end_time,
            total: result.rows[i].total,
            state: result.rows[i].state,
            isExtend: result.rows[i].is_extend
          };
        tickets.push(ticket);
      };
      return res.json({data : tickets});
    } else {
      return res.json({ data: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};