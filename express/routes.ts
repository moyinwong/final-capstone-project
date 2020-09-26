import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { courseRoutes } from "./routes/courseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { lessonRoutes } from "./routes/lessonRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";

export const routes = express.Router();

//dummy test
// routes.get("/", (req, res) => {
//   res.json({ message: "HIHI" });
// });

routes.use("/user", userRoutes);
routes.use("/course", courseRoutes);
routes.use("/category", categoryRoutes);
routes.use("/lesson", lessonRoutes);
routes.use("/payment", paymentRoutes);
