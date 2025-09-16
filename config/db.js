import mysql from 'mysql2';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.CA_PATH)
  }
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
  console.log("✅ Database connected successfully");
});

export default db;
