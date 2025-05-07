import pool from "../config/database.js";

const getUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0];
};

const createNewUser = async (username, password, firstName, lastName) => {
  return await pool.query(
    "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name",
    [username, password, firstName, lastName]
  );
};

const getUserProfileById = async (userId) => {
  const result = await pool.query(
    "SELECT first_name, last_name, member FROM users WHERE id = $1",
    [userId]
  );

  return result.rows[0];
};

const updateUserProfileById = async (userId, firstName, lastName) => {
  return await pool.query(
    "UPDATE users SET first_name = $2, last_name = $3 WHERE id = $1",
    [userId, firstName, lastName]
  );
};

const enableMembershipById = async (userId) => {
  return await pool.query("UPDATE users SET member = true WHERE id = $1", [
    userId,
  ]);
};

export {
  getUserByUsername,
  createNewUser,
  getUserProfileById,
  updateUserProfileById,
  enableMembershipById
};
