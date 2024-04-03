DROP DATABASE IF EXISTS mpp;

CREATE DATABASE mpp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'mpp' @'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON mpp.* TO mpp @'localhost';

FLUSH PRIVILEGES;

USE mpp;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    category INT NOT NULL,
    quality INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255),
    images TEXT,
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (category) REFERENCES categories(id)
);

CREATE TABLE images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    listing INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    thumbnail BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (listing) REFERENCES listings(id)
);