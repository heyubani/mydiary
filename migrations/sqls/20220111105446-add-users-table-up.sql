/* Replace with your SQL commands */

Create Table users (
id serial PRIMARY KEY,
first_name VARCHAR NOT NULL,
last_name VARCHAR NOT NULL,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
is_admin Boolean,
created_at timestamp DEFAULT NOW(),
updated_at timestamp DEFAULT NOW()
)