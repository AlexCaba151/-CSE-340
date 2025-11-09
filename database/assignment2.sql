-- 1) Insert Tony Stark
INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2) Change account_type to Admin (Tony)
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

-- 3) Delete Tony Stark
DELETE FROM account
WHERE email = 'tony@starkent.com';

-- 4) Replace text in the description of GM Hummer
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5) INNER JOIN for register Sport
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6) Add "/vehicles" to inv_image and inv_thumbnail
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
