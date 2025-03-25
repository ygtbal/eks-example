require("dotenv").config();

const express = require("express");

const { Pool } = require("pg");

const cors = require("cors");

const app = express();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.use(cors());

app.use(express.json());

app.post("/add", async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    const result = await pool.query(
      "INSERT INTO calculations (num1, num2, result) VALUES ($1, $2, $3) RETURNING *",
      [num1, num2, sum]
    );

    res.json({ message: "Success", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}`);
});
