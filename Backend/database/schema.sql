-- My-Pandit MySQL Schema

CREATE DATABASE IF NOT EXISTS `app`;
USE `app`;

CREATE TABLE IF NOT EXISTS users (
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
);

CREATE TABLE IF NOT EXISTS password_resets (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS signup_otps (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(150) NULL,
  password_hash VARCHAR(255) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_signup_otps_email (email),
  INDEX idx_signup_otps_mobile (mobile)
);
