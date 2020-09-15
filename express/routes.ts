import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { courseRoutes } from "./routes/courseRoutes";

export const routes = express.Router();

//dummy test
// routes.get("/", (req, res) => {
//   res.json({ message: "HIHI" });
// });

routes.use("/user", userRoutes);
routes.use("/course", courseRoutes);
