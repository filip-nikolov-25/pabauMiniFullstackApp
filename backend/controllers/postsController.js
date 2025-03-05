import {
    editUpdatePost,
    getFullListOfPosts,
    getPostById,
    newPost,
    removePostById,
  } from "../models/showPosts.js";
  
  const validatePost = (data) => {
    const { name, price, description } = data;
  
    if (!name || !description || price === undefined) {
      return "Name, description, and price are required.";
    }
  
    if (typeof price !== "number" || price < 0) {
      return "Price must be a positive number.";
    }
    return null;
  };
  
  export const createPosts = async (request, response) => {
    const validationError = validatePost(request.body);
  
    if (validationError) {
      return response.status(400).send(validationError);
    }
  
    const { name, price, description, image } = request.body;
  
    if (!image) {
      return response.status(400).send("Image URL is required.");
    }
  
    try {
      const result = await newPost({ name, price, description, image });
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Server error");
    }
  };
  
  
  export const getAllPosts = async (request, response) => {
    try {
      const result = await getFullListOfPosts();
      response.status(200).send(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Server error");
    }
  };
  
  export const getOnePost = async (request, response) => {
    const { id } = request.params;
    try {
      const result = await getPostById(id);
  
      if (!result) {
        return response.status(404).send(`Post with ID ${id} not found.`);
      }
  
      response.status(200).json(result); 
    } catch (e) {
      console.error(e);
      response.status(500).send("Server error ");
    }
  };
  
  export const updatePost = async (request, response) => {
    const { id } = request.params;
    const validationError = validatePost(request.body);
  
    if (validationError) {
      return response.status(400).send(`Missing fields`);
    }
  
    try {
      const result = await editUpdatePost(id, request.body);
  
      if (!result) {
        return response.status(404).send(`Post with ID ${id} not found.`);
      }
  
      response.status(200).json(result); 
    } catch (error) {
      console.error(error);
      response.status(500).send("Server error ");
    }
  };

export const deletePost = async (request, response) => {
  const { id } = request.params;

  try {
    const result = await removePostById(id);

    if (result) {
      return response.status(200).json({ message: `Post with ID ${id} deleted` });
    } else {
      return response.status(404).json({ message: `Post with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server error " });
  }
};
