const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use, get } = require("../routes");
const moment  = require('moment-timezone');
const moment_string = require('moment');
const e = require("express");


const GetVehicle = async (vehicleId) => {
  console.log("vehicle_id", vehicleId);
  try {
    const res = await pool.query(
      "SELECT * FROM vehicle WHERE id = $1",
      [vehicleId]
    );
    if (res.rowCount !== 0) {
      const vehicle = {
        id: res.rows[0].id,
        created_at: res.rows[0].created_at,
        updated_at: res.rows[0].updated_at,
        name: res.rows[0].name,
        number: res.rows[0].number,
        type: res.rows[0].type,
        userId: res.rows[0].user_id,
      }
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
      const parkingLot = {

      }
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

const GetTimeFrame = async (timeFrameId) => {
  console.log("time_frame_id", timeFrameId);
  try {
    const res = await pool.query(
      "SELECT * FROM time_frame WHERE id = $1",
      [timeFrameId]
    );
    if (res.rowCount !== 0) {
      const timeFrame = {
        id: res.rows[0].id,
        created_at: res.rows[0].created_at,
        updated_at: res.rows[0].updated_at,
        // duration is bigint
        duration: parseInt(res.rows[0].duration),
        cost: parseFloat(res.rows[0].cost),
        parkingLotId: res.rows[0].parking_lot_id,
      }
      return timeFrame;
    }
  } catch (err) {
    throw err;
  }
};

const GetTicket = async (ticket) => {
  try {
    let Ticket = {
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
      total: parseFloat(ticket.total),
      state: ticket.state,
      isExtend: ticket.is_extend,
    };
    return Ticket;
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

exports.GetAllTicket = async (req, res) => {
  const { userId, state } = req.query;
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
    const result = await pool.query("SELECT * FROM ticket WHERE user_id = $1 AND state = $2 AND deleted_at IS NULL ", [userId, state]);
    if (result.rowCount > 0) {
      let tickets = [];
      for(let i = 0; i < result.rowCount; i++){
        let vehicle = await GetVehicle(result.rows[i].vehicle_id);
        let parking_slot = await GetParkingLot(result.rows[i].parking_slot_id);
        let time_frame = await GetTimeFrame(result.rows[i].time_frame_id);
        let ticket = {
            id: result.rows[i].id,
            userId: result.rows[i].user_id,
            vehicledId: result.rows[i].vehicle_id,
            vehicle: vehicle,
            parkingLotId: result.rows[i].parking_lot_id,
            parkingSlotId: result.rows[i].parking_slot_id,
            parkingSlot: parking_slot,
            timeFrameId: result.rows[i].time_frame_id,
            timeFrame: time_frame,
            startTime: result.rows[i].start_time,
            endTime: result.rows[i].end_time,
            total: parseFloat(result.rows[i].total),
            state: result.rows[i].state,
            isExtend: result.rows[i].is_extend
          };
        tickets.push(ticket);
      };
      return res.json({data : tickets});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetOneTicketWithExtend = async (req, res) => {
  const ticketId = req.params.id;
  if(ticketId == null){
    return res.status(400).json({
      "error": {
        "detail": "Ticket id is required",
      },
      "code": ""
    });
  }
  try {
    const result = await pool.query("SELECT * FROM ticket WHERE id = $1 AND deleted_at IS NULL", [ticketId]);
    if (result.rowCount !== 0) {
      const ticket_extend = await pool.query("SELECT * FROM ticket_extend WHERE ticket_id = $1 AND deleted_at IS NULL", [ticketId]);
      let ticket_exs = [];
      if(ticket_extend.rowCount > 0){
        for(let i = 0; i < ticket_extend.rowCount; i++){
          let ticket_ex = await pool.query("SELECT * FROM ticket WHERE id = $1 AND deleted_at IS NULL", [ticket_extend.rows[i].ticket_extend_id]);
          console.log(GetTicket(ticket_ex.rows[0]));
          ticket_exs.push(await GetTicket(ticket_ex.rows[0]));
        }
      }
      const ticket = result.rows[0];
      let vehicle = await GetVehicle(result.rows[0].vehicle_id);
      let parking_slot = await GetParkingSlot(result.rows[0].parking_slot_id);
      let time_frame = await GetTimeFrame(result.rows[0].time_frame_id);
      return res.json({
        data: {
          id: ticket.id,
          creator_id: ticket.creator_id,
          updater_id: ticket.updater_id, 
          created_at: ticket.created_at,
          updated_at: ticket.updated_at,
          userId: ticket.user_id, 
          vehicleId: ticket.vehicle_id, 
          vehicle: vehicle,
          parkingLotId: ticket.parking_lot_id,
          parkingSlotId: ticket.parking_slot_id, 
          parkingSlot: parking_slot,
          timeFrameId: ticket.time_frame_id, 
          timeFrame: time_frame,
          startTime: ticket.start_time, 
          endTime: ticket.end_time,
          state: ticket.state,
          total: parseFloat(ticket.total),
          isExtend: ticket.is_extend,
          ticketExtend: ticket_exs
        },
      });
    } else {
      return res.status(404).json({
        "error": {
          "detail": "record not found",
        },
        "code": ""
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.CancelTicket = async (req, res) => {
  const { ticketId } = req.body;
  if(ticketId == null){
    return res.status(400).json({
      "error": {
        "detail": "Error when parse req: EOF",
      },
      "code": ""
    });
  };
  try {
    const result = await pool.query("UPDATE ticket SET state = 'cancel' WHERE id = $1 RETURNING *", [ticketId]);
    if (result.rowCount !== 0) {
      return res.json({data : result.rows[0].id});
    }
    else{
      return res.status(404).json({
        "error": {
          "detail": "record not found",
        },
        "code": ""
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.ExtendTicket = async (req, res) => {
  const { ticketOriginId, timeFrameId, startTime, endTime, total } = req.body;
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
    let ticket_db = await pool.query("SELECT * FROM ticket WHERE id = $1 AND deleted_at IS NULL", [ticketOriginId]);
    if (ticket_db.rowCount !== 0) {
      let state = "extend";
      let total_ticket = 0;
      if(total != null){
        total_ticket = parseFloat(total);
      }
      let isExtend = false;
      const ticket = ticket_db.rows[0];
      const extendTicket = await pool.query(
        "INSERT INTO ticket (creator_id, updater_id, user_id, vehicle_id, parking_lot_id, parking_slot_id, time_frame_id, start_time, end_time, state, total, is_extend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
        [ticket.user_id, ticket.user_id, ticket.user_id, ticket.vehicle_id, ticket.parking_lot_id, ticket.parking_slot_id, timeFrameId, startTime, endTime, state, total_ticket, isExtend]
      ); 
      ticket_db = await pool.query("UPDATE ticket SET is_extend = true WHERE id = $1 RETURNING *", [ticketOriginId]);
      const ticketEx = await pool.query(
        "INSERT INTO ticket_extend (ticket_id, ticket_extend_id) VALUES ($1, $2) RETURNING *", 
        [ticket.id, extendTicket.rows[0].id]);
      if(ticketEx.rowCount !== 0){
        return res.json({
          data : {
            id: ticketEx.rows[0].id,
            created_at: ticketEx.rows[0].created_at,
            updated_at: ticketEx.rows[0].updated_at,
            ticket_id: ticketEx.rows[0].ticket_id,
            ticket_extend_id: ticketEx.rows[0].ticket_extend_id
          }
        });
      }
    }
    else{
      return res.status(404).json({
        "error": {
          "detail": "record not found",
        },
        "code": ""
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.ProcedureWithTicket = async (req, res) => {
  const { type, ticketId } = req.body;
  if(type == null || ticketId == null){
    return res.status(400).json({
      "error": {
        "detail": "Error when parse req: EOF",
      },
      "code": ""
    });
  }
  try{
    let ticket = await pool.query("SELECT * FROM ticket WHERE id = $1 AND deleted_at IS NULL", [ticketId]);
    if(ticket.rowCount !== 0){
      let state = "";
      let time = moment().tz('7').format('YYYY-MM-DD HH:mm:ss.SSS');
      switch(type){
        case "check_in":
          let entryTime = moment_string(time).toISOString();
          state = "ongoing";
          console.log(entryTime);
          ticket = await pool.query("UPDATE ticket SET entry_time = $1, state = $2 WHERE id = $3 RETURNING *", [entryTime, state, ticketId]);
        case "check_out":
          let exitTime = moment_string(time).toISOString();
          state = "completed";
          ticket = await pool.query("UPDATE ticket SET exit_time = $1, state = $2 WHERE id = $3 RETURNING *", [exitTime, state, ticketId]);
      }
      let sucess = true;
      return res.json({data : sucess});
    }
    else{
      return res.status(404).json({
        "error": {
          "detail": "record not found",
        },
        "code": ""
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.GetAllTicketCompany = async (req, res) => {
  const { parking_lot_id, state } = req.query;
  try {
    const result = await pool.query("SELECT * FROM ticket WHERE parking_lot_id = $1 AND state = $2 AND delected_at IS NULL", [parking_lot_id, state]);
    console.log(parking_lot_id);
    if (result.rowCount > 0) {
      let tickets = [];
      for(let i = 0; i < result.rowCount; i++){
        let vehicle = await GetVehicle(result.rows[i].vehicle_id);
        let parking_lot = await GetParkingLot(result.rows[i].parking_lot_id);
        let parking_slot = await GetParkingSlot(result.rows[i].parking_slot_id);
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
            total: parseFloat(result.rows[i].total),
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