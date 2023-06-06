const express = require("express");
require("dotenv").config();
const router = require("./routes");
const app = express();
const cors = require("cors");
const sendNotification = require("./notification");
app.use(express.json());
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
sendNotification("ExponentPushToken[ftdqDxG9vg0yuGuwaVSO-Q]");
const port = process.env.PORT || 3000;
app.listen(3001, () => {
  console.log(`Server is running on port ${3001}`);
});
