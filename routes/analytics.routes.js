import express from "express";
import { totalUsers, mostActiveUsers, totalPosts, mostLikedPosts } from "../controller/analytics.controller.js"

const analytics = express.Router();

analytics.get("/users", totalUsers);    // Retrieve the total number of users
analytics.get("/users/top-active", mostActiveUsers);    // Retrieve the top 5 most active users, based on the number of posts

analytics.get("/posts", totalPosts);    // Retrieve the total number of posts.
analytics.get("/posts/top-liked", mostLikedPosts);    // Retrieve the top 5 most liked posts



export default analytics;