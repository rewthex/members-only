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

export { getUserByUsername, createNewUser };
