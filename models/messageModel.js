import pool from "../config/database.js";

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.id, messages.subject, messages.message, messages.created_at, users.username 
     FROM messages 
     JOIN users ON messages.user_id = users.id`
  );
  return result.rows;
};

export { getAllMessages };
