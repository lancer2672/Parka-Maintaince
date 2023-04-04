const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db");
const router = require("./routes");
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
