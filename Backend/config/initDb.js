const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDb() {
  const dbName = process.env.DB_NAME || 'app';

  const rootConnection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || '',
  });

  try {
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  } finally {
    await rootConnection.end();
  }

  const pool = require('./db');
  const connection = await pool.getConnection();

  try {
    await connection.query('DROP TABLE IF EXISTS password_resets');
    await connection.query('DROP TABLE IF EXISTS signup_otps');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.query(`
      CREATE TABLE users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        role ENUM('customer','pandit','admin') NOT NULL,
        mobile VARCHAR(15) NOT NULL UNIQUE,
        email VARCHAR(150) NULL,
        password_hash VARCHAR(255) NULL,
        profile_image VARCHAR(500) NULL,
        language_code VARCHAR(10) DEFAULT 'hi',
        status ENUM('active','inactive','blocked','pending') DEFAULT 'active',
        last_login_at DATETIME NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_users_email (email)
      )
    `);

    await connection.query(`
      CREATE TABLE password_resets (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT UNSIGNED NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        used TINYINT(1) DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE signup_otps (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        mobile VARCHAR(15) NOT NULL,
        email VARCHAR(150) NULL,
        password_hash VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_signup_otps_email (email),
        INDEX idx_signup_otps_mobile (mobile)
      )
    `);

    console.log('Database tables ready');
  } finally {
    connection.release();
  }
}

module.exports = initDb;
