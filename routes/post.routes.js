import express from "express";
import { createPost, getPost, updatePost, deletePost, incrementLike, decrementLike, getAllPosts, getAllMyPosts, deleteMyPosts } from "../controller/post.controller.js"; 
import { authenticate } from "../middleware/authenticate.js";


const post = express.Router();

post.post('/', createPost); // Create a new post. The request should include the user_id
post.get("/allPosts", getAllPosts);  // Retrieve all posts
post.get("/allMyPosts", getAllMyPosts);  // Retrieve all my posts
post.get("/:id", getPost);  // Retrieve a post by id
post.put("/:id", authenticate, updatePost); // Update a post's content by id
post.delete("/deleteMyPosts", deleteMyPosts); // Delete a post by id
post.delete("/:id",authenticate, deletePost); // Delete a post by id
post.post("/:id/like", incrementLike); // Increment the like count of a post by id.
post.post("/:id/unlike", decrementLike); // Decrement the like count of a post by id.The count should not go below 0.

export default post;