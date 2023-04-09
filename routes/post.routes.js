import express from "express";
import { createPost, getPost, updatePost, deletePost, incrementLike, decrementLike } from "../controller/post.controller.js"; 
import { authenticate } from "../middleware/authenticate.js";


const post = express.Router();

post.post('/', createPost); // Create a new post. The request should include the user_id
post.get("/:id", getPost);  // Retrieve a post by id
post.put("/:id", authenticate, updatePost); // Update a post's content by id
post.delete("/:id",authenticate, deletePost); // Delete a post by id
post.post("/:id/like",authenticate, incrementLike); // Increment the like count of a post by id.
post.post("/:id/unlike",authenticate, decrementLike); // Decrement the like count of a post by id.The count should not go below 0.

export default post;