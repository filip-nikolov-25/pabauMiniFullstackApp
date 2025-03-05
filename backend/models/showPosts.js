import { query } from "../db.js";

export const newPost = async (postData) => {
  const result = await query(
    "INSERT INTO posts (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [postData.name, postData.price, postData.description, postData.image]
  );
  return result.rows[0];
};

export const getFullListOfPosts = async () => {
  const result = await query("SELECT * FROM posts");
  return result.rows;
};

export const getPostById = async (id) => {
  const result = await query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0]; 
};

export const editUpdatePost = async (id, data) => {
  const result = await query(
    "UPDATE posts SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5 RETURNING *",
    [data.name, data.description, data.price, data.image, id]
  );
  return result.rows[0];
};

export const removePostById = async (id) => {
  const result = await query("DELETE FROM posts WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};
