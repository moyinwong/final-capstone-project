import express from "express";
import { userController } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login);
