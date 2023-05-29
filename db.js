const { Pool, Client } = require("pg");
require("dotenv").config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;

const connectionString = `postgres://${user}:${password}@${host}/${database}?sslmode=no-verify`;

const pool = new Pool({ connectionString });

pool.query("SELECT NOW()", (err, res) => {
  // console.log(err, res);
  // pool.end();
});

// const client = new Client({
//   connectionString,
//   keepAlive: true,
// });
// client.connect();

// client.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   client.end();
// });

// connect to local db

// const ssl = {
//   rejectUnauthorized: false,
//   ca: fs.readFileSync("D:/PostgreSql/data/ca.crt"),
//   key: fs.readFileSync("D:/PostgreSql/data/server.key"),
//   cert: fs.readFileSync("D:/PostgreSql/data/server.crt"),
// };

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   max: process.env.DB_MAX,
//   idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
//   ssl: ssl,
// });

// pool.connect((err, client, done) => {
//   if (err) console.log("Connect to database failed", err);
//   else console.log("Connected to database");
// });

module.exports = pool;
