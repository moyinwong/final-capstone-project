import express from "express";
import { userRoutes } from "./routes/userRoutes";

export const routes = express.Router();

//dummy test
// routes.get("/", (req, res) => {
//   res.json({ message: "HIHI" });
// });

routes.use("/user", userRoutes);
