/* Replace with your SQL commands */

CREATE TABLE diaries (
id int UNIQUE,
firstName VARCHAR NOT NULL,
lastName VARCHAR NOT NULL,
email VARCHAR NOT NULL,
Password VARCHAR NOT NULL,
isAdmin Boolean,
created_at timestamp DEFAULT NOW()
)