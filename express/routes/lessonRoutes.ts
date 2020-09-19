import express from "express";
import { lessonController } from "../main";

export const lessonRoutes = express.Router();

lessonRoutes.get("/:course", lessonController.courseLessons);
