-- Database Rebuild Script
-- This script creates the database structure and populates it with data
-- Run this entire script as one block to rebuild the complete database

-- ============================================
-- STEP 1: Clean up existing objects
-- ============================================
-- Drop tables first (order matters due to foreign keys)
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS classification CASCADE;

-- Drop the custom type
DROP TYPE IF EXISTS account_type_enum CASCADE;

-- ============================================
-- STEP 2: Create custom TYPE
-- ============================================
CREATE TYPE account_type_enum AS ENUM ('Client', 'Employee', 'Admin');

-- ============================================
-- STEP 3: Create tables
-- ============================================

-- Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

-- Create account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) NOT NULL UNIQUE,
    account_password VARCHAR(255) NOT NULL,
    account_type account_type_enum DEFAULT 'Client'
);

-- Create inventory table
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year INTEGER NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image VARCHAR(255) NOT NULL,
    inv_thumbnail VARCHAR(255) NOT NULL,
    inv_price DECIMAL(10,2) NOT NULL,
    inv_miles INTEGER NOT NULL,
    inv_color VARCHAR(50) NOT NULL,
    classification_id INTEGER NOT NULL,
    FOREIGN KEY (classification_id) REFERENCES classification(classification_id)
);

-- ============================================
-- STEP 4: Populate classification table
-- ============================================
INSERT INTO classification (classification_name)
VALUES 
    ('Custom'),
    ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');

-- ============================================
-- STEP 5: Populate inventory table
-- ============================================
INSERT INTO inventory (
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id
)
VALUES 
    ('Chevy', 'Camaro', 2018, 'If you want to look cool this is the car you need! This car has great performance at an affordable price. Own it today!', '/images/camaro.jpg', '/images/camaro-tn.jpg', 25000.00, 41258, 'Silver', 2),
    ('Batmobile', 'Custom', 2007, 'Ever want to be a super hero? Now you can with the Batmobile. This car comes with a 500 hp engine with the highest tech you can get in a car.', '/images/batmobile.jpg', '/images/batmobile-tn.jpg', 65000.00, 29890, 'Black', 1),
    ('GM', 'Hummer', 2016, 'Do you have 6 kids and like to go offroading? The Hummer gives you a large interior with an affordable price for a 6 passenger SUV. This vehicle comes with small interiors for a better experience in driving.', '/images/hummer.jpg', '/images/hummer-tn.jpg', 58000.00, 41235, 'Yellow', 3),
    ('Lamborghini', 'Aventador', 2019, 'This V-12 engine packs a punch in this sporty car. Make sure you wear your seatbelt and obey all traffic laws. You do not want to get pulled over in this one!', '/images/lamborghini-aventador.jpg', '/images/lamborghini-aventador-tn.jpg', 125000.00, 5000, 'Blue', 2),
    ('Audi', 'R8', 2017, 'This car is super fast and handles like a dream. You will turn heads when you roll down the street in this car.', '/images/audi-r8.jpg', '/images/audi-r8-tn.jpg', 85000.00, 35000, 'Red', 2);

-- ============================================
-- STEP 6: Apply Task 1 modifications
-- ============================================

-- Query 4 from Task 1: Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6 from Task 1: Update image paths to add "/vehicles"
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');