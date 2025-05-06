import pool from "../config/database.js";

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.id, messages.subject, messages.message, messages.created_at, users.username 
     FROM messages 
     JOIN users ON messages.user_id = users.id`
  );
  return result.rows;
};

const createMessage = async (userId, subject, message) => {
  const result = await pool.query(
    "INSERT INTO messages (user_id, subject, message) VALUES ($1, $2, $3)",
    [userId, subject, message]
  );

  return result;
};

export { getAllMessages, createMessage };
