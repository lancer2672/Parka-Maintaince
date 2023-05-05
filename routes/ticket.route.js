const router = require("express").Router();
const TicketController = require("../controllers/ticket.controller");
const { body } = require("express-validator");

router.get("/get-all", TicketController.GetAllTicketCompany);

module.exports = router;