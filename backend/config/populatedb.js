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
INSERT INTO users (username, password, first_name, last_name, member, admin)
VALUES 
  ('zen_kato', 'top_secret_hash', 'Zen', 'Kato', true, false),
  ('livnguyen87', 'top_secret_hash', 'Liv', 'Nguyen', false, false),
  ('kairos.dev', 'top_secret_hash', 'Kai', 'Rosenthal', true, false),
  ('noor_qa', 'top_secret_hash', 'Noor', 'Qamar', false, false),
  ('elena.codes', 'top_secret_hash', 'Elena', 'Trujillo', true, true);
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
INSERT INTO messages (user_id, subject, message, created_at)
VALUES
  (1, 'Kicking Things Off', 'Hey everyone, Zen here — stoked to join the board.', '2025-04-30 05:14:56'),
  (2, 'Quick Question', 'Does anyone know if we have a weekly Q&A thread?', '2025-04-18 12:57:12'),
  (3, 'Build in Progress', 'Just started a new side project. Will share updates soon!', '2025-04-22 17:18:54'),
  (4, 'Happy to Join', 'Excited to learn and contribute. This place seems great!', '2025-04-10 18:03:32'),
  (5, 'Community Guidelines Update', 'Admins have updated the posting rules. Please review them when you can.', '2025-04-29 20:57:08');
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
