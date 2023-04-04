const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.connect((err, client, done) => {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = pool;
