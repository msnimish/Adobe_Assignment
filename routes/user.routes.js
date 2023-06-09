import express from "express";
import { getUser, login, register, updateUser, deleteUser, getAllUsers, decodeToken  } from "../controller/user.controller.js";
import { validate } from "../middleware/authenticate.js";

const user = express.Router();


user.get("/allUsers", getAllUsers);  // Retrieve all user's data.
user.get("/getUserId", decodeToken);  // Getting userID via jwt token
user.post("/",validate, register);   //Create a new user.
user.post("/login",validate, login); // User Login
user.get("/:id", getUser);  // Retrieve a user by id.
user.put("/:id", updateUser);   // Update a user's name or bio by id
user.delete("/:id", deleteUser); // Delete a user by id

export default user;