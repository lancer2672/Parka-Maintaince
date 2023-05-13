const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { use, get } = require("../routes");
const moment  = require('moment-timezone');
const moment_string = require('moment');

const ConvertNullToString = (value) => {
    if(value == null) {
        return "";
    }
    return value;
};

const ConvertNullToId = (value) => {
    if(value == null) {
        return "00000000-0000-0000-0000-000000000000";
    }
    return value;
};

exports.CreateVehicle = async (req, res) => {
    const {id, name, number, type, user_id} = req.body;
    if(id == null && name == null && number == null && type == null && user_id == null) {
        return res.status(400).json({
            "error": {
              "detail": "Error when parse req: EOF",
            },
            "code": ""
        });
    }
    try {
        let Name = ConvertNullToString(name);
        let Number = ConvertNullToString(number);
        let Type = ConvertNullToString(type);
        let UserID = ConvertNullToId(user_id);
        const vehicle = await pool.query(
            "INSERT INTO vehicle (name, number, type, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [Name, Number, Type, UserID]);
        if(vehicle.rowCount !== 0) {
            return res.json({
                data: {
                    id: vehicle.rows[0].id,
                    created_at: vehicle.rows[0].created_at,
                    updated_at: vehicle.rows[0].updated_at,
                    name: vehicle.rows[0].name,
                    number: vehicle.rows[0].number,
                    type: vehicle.rows[0].type,
                    userId: vehicle.rows[0].user_id
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.GetOneVehicle = async (req, res) => {
    const id = req.params.id;
    // if(id == null) {
    //     return res.status(404).json({
    //         "error": {
    //             "route": "not found"
    //         }
    //     });
    // }
    try {
        const vehicle = await pool.query("SELECT * FROM vehicle WHERE id = $1 and deleted_at is NULL", [id]);
        if(vehicle.rowCount !== 0) {
            return res.json({
                data: {
                    id: vehicle.rows[0].id,
                    created_at: vehicle.rows[0].created_at,
                    updated_at: vehicle.rows[0].updated_at,
                    name: vehicle.rows[0].name,
                    number: vehicle.rows[0].number,
                    type: vehicle.rows[0].type,
                    userId: vehicle.rows[0].user_id
                }
            });
        } else {
            return res.status(404).json({
                "error": {
                    "route": "not found"
                }
            });
        }
    } catch (error) { 
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.GetListVehicle = async (req, res) => {
    const {user_id, type, sort} = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 30;
    const offset = (page - 1) * pageSize;
    
    try {
        const result = await pool.query(
            "SELECT * FROM vehicle WHERE deleted_at is NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2", 
            [pageSize, offset]
        );
        const totalRows = result.rowCount;
        const totalPage = Math.ceil(totalRows / pageSize);
        
        const meta = {
            page: page,
            page_size: pageSize,
            total_pages: totalPage,
            total_rows: totalRows,
        };
    
        const data = result.rows.map((row, i) => {
            return {
                id: row.id,
                created_at: row.created_at,
                updated_at: row.updated_at,
                name: row.name,
                number: row.number,
                type: row.type,
                userId: row.user_id
            };
        });
    
        return res.json({
            data: data,
            meta: meta
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.UpdateVehicle = async (req, res) => {
    const vehicleid = req.params.id;
    const {id, name, number, type, user_id} = req.body;
    try {
        const result = await pool.query(
            "SELECT * FROM vehicle WHERE id = $1 and deleted_at is NULL", 
            [vehicleid]
        );
        if(result.rowCount !== 0) {
            const vehicle = result.rows[0];
            let time = moment().tz('7').format('YYYY-MM-DD HH:mm:ss.SSS');
            let updated_at = moment_string(time).toISOString();
            console.log(updated_at);
            if(id !== vehicle.id || name == vehicle.name || number == vehicle.number || type == vehicle.type || user_id == vehicle.user_id) {
                // let Name = ConvertNullToString(name);
                // let Number = ConvertNullToString(number);
                // let Type = ConvertNullToString(type);
                // let UserId = ConvertNullToId(user_id);
                const vehicle_upd = await pool.query(
                    "UPDATE vehicle SET name = $1, number = $2, type = $3, updated_at = $4, user_id = $5 WHERE id = $6 AND deleted_at IS NULL RETURNING *",
                    [name || vehicle.name, number || vehicle.number, type || vehicle.type, updated_at, user_id || vehicle.user_id, vehicleid]
                );
                if(vehicle_upd.rowCount !== 0) {
                    return res.json({
                        data: {
                            id: vehicle_upd.rows[0].id,
                            created_at: vehicle_upd.rows[0].created_at,
                            updated_at: vehicle_upd.rows[0].updated_at,
                            name: vehicle_upd.rows[0].name,
                            number: vehicle_upd.rows[0].number,
                            type: vehicle_upd.rows[0].type,
                            userId: vehicle_upd.rows[0].user_id
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.DeleteVehicle = async (req, res) => {
    const vehicleid = req.params.id;
    try {
        let time = moment().tz('7').format('YYYY-MM-DD HH:mm:ss.SSS');
        let deleted_at = moment_string(time).toISOString();
        const result = await pool.query(
            "UPDATE vehicle SET deleted_at = $1 WHERE id = $2 AND deleted_at IS NULL RETURNING *",
            [deleted_at, vehicleid]
        );
        if(result.rowCount !== 0) {
            return res.json({ data: "Xóa bản ghi thành công" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};