import express from "express";
import { userRoutes } from "./routes/userRoutes";

export const routes = express.Router();

routes.use("/user", userRoutes);
