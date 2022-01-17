/* Replace with your SQL commands */

Create Table diary (
id serial PRIMARY KEY,
name VARCHAR NOT NULL,
description VARCHAR NOT NULL,
content VARCHAR NOT NULL,
imagefile VARCHAR(100),
user_id INT REFERENCES users(id) ON DELETE CASCADE,
created_at timestamp DEFAULT NOW(),
updated_at timestamp DEFAULT NOW()
)