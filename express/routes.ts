import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { courseRoutes } from "./routes/courseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";

export const routes = express.Router();

//dummy test
// routes.get("/", (req, res) => {
//   res.json({ message: "HIHI" });
// });

routes.use("/user", userRoutes);
routes.use("/course", courseRoutes);
routes.use("/category", categoryRoutes);
