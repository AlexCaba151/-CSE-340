-- DROP 
DROP TYPE IF EXISTS account_type CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;

-- TYPE
CREATE TYPE account_type AS ENUM ('Admin', 'User');

-- TABLES
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    account_type account_type DEFAULT 'User'
);

CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    classification_id INT REFERENCES classification(classification_id)
);

-- INSERT classification
INSERT INTO classification (classification_name)
VALUES ('Sport'), ('SUV'), ('Truck');

-- INSERT inventory 
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
VALUES 
('GM', 'Hummer', 'The GM Hummer is known for small interiors but great off-road capability.', '/images/hummer.jpg', '/images/hummer-tn.jpg', 2),
('Ford', 'Ranger', 'The Ford Ranger is a mid-size truck with strong performance.', '/images/ranger.jpg', '/images/ranger-tn.jpg', 3),
('Chevy', 'Camaro', 'A classic American sport car with modern design.', '/images/camaro.jpg', '/images/camaro-tn.jpg', 1),
('Mazda', 'MX-5', 'A lightweight convertible perfect for fun drives.', '/images/mx5.jpg', '/images/mx5-tn.jpg', 1);



-- Query 4: Replace in descriptio n GM Hummer
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 6: Add /vehicles in routes
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
