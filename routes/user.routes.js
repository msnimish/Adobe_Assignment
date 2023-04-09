import express from "express";
import { getUser, login, register } from "../controller/user.controller.js";

const user = express.Router();

user.get("/getUser", getUser);

user.post("/register", register);
user.post("/login", login);

export default user;