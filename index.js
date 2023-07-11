const express = require("express");
require("dotenv").config();
const router = require("./routes");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/", router);
app.set("trust proxy", true);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(3001, () => {
  console.log(`Server is running on port ${3001}`);
});
