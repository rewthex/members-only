import pool from "./database.js";

const usersTable = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  PASSWORD TEXT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  member BOOLEAN DEFAULT FALSE,
  admin BOOLEAN DEFAULT FALSE
);`;

const usersDummy = `
INSERT INTO users (username, password ,first_name, last_name, member, admin)
VALUES 
  ('jdoe', 'top_secret_hash' ,'John', 'Doe', true, false),
  ('asmith',  'top_secret_hash' ,'Alice', 'Smith', false, false),
  ('adminuser',  'top_secret_hash' ,'Admin', 'User', true, true);
`;

const messagesTable = `
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const messagesDummy = `
INSERT INTO messages (user_id, subject, message)
VALUES
  (1, 'Welcome', 'Welcome to the message board, John!'),
  (2, 'Hello there', 'Glad to be part of this community.'),
  (3, 'Admin Notice', 'Please read the rules before posting.');

`;

async function main() {
  try {
    console.log("seeding...");
    console.log("creating users table");
    await pool.query(usersTable);
    console.log("filling dummy users data");
    await pool.query(usersDummy);
    console.log("creating messages table");
    await pool.query(messagesTable);
    console.log("filling dummy messages data");
    await pool.query(messagesDummy);
    console.log("seeding successful!");
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
