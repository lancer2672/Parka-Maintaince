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

// check user_id
// function getCurrentUser(req){
//   const userIdStr = req.get('x-user-id');
//   if (userIdStr.includes('|')) {
//     userIdStr = userIdStr.split('|')[0];
//   }
//   try {
//     const res = uuidv4(userIdStr);
//     return res;
//   } catch (error) {
//     return null;
//   }
// }

exports.CreateTicket = async (req, res) => {
  //const errors = validationResult(req);
  //const x_user_id = await req.headers("x-user-id");
  const { userId, vehicleId, parkingLotId, parkingSlotId, timeFrameId, startTime, endTime, entryTime, exitTime, total, isLongTerm, type} = req.body;
  // const { userId, vehicleId, parkingLotId, parkingSlotId, timeFrameId, startTime, endTime, isLongTerm} = req.body;
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
    const state = "new";
    let total_ticket = 0;
    if(total != null){
      total_ticket = parseFloat(total);
    }
    const isExtend = false;
    const tickets = await pool.query(
      "INSERT INTO ticket (creator_id, updater_id, user_id, vehicle_id, parking_lot_id, parking_slot_id, time_frame_id, start_time, end_time, state, total, is_extend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [userId, userId, userId, vehicleId, parkingLotId, parkingSlotId, timeFrameId, startTime, endTime, state, total_ticket, isExtend]
    );
    if(isLongTerm){
      // type LongTermTicket không có
      const long_term_ticket = await pool.query(
        "INSERT INTO long_term_ticket (creator_id, updater_id, vehicle_id, parking_lot_id, parking_slot_id, time_frame_id, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [userId, userId, vehicleId, parkingLotId, parkingSlotId, timeFrameId, startTime, endTime]
      );
    }
    if (tickets.rowCount !== 0) {
      const ticket = tickets.rows[0];
      return res.json({
        data: {
          id: ticket.id,
          creator_id: ticket.creator_id,
          updater_id: ticket.updater_id, 
          created_at: ticket.created_at,
          updated_at: ticket.updated_at,
          userId: ticket.user_id, 
          vehicleId: ticket.vehicle_id, 
          parkingLotId: ticket.parking_lot_id,
          parkingSlotId: ticket.parking_slot_id, 
          timeFrameId: ticket.time_frame_id, 
          startTime: ticket.start_time, 
          endTime: ticket.end_time,
          state: ticket.state,
          total: parseFloat(ticket.total),
          isExtend: ticket.is_extend
        },
      });
    }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
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