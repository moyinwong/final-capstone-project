import express from "express";
import { lessonController } from "../main";

export const lessonRoutes = express.Router();

lessonRoutes.get("/", (req, res) => res.json({ message: "ahha" }));
lessonRoutes.get("/summary/:course/:user", lessonController.courseLessons);
lessonRoutes.get("/summary/:course", lessonController.courseLessons);
