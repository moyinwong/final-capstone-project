import express from "express";
import { courseController } from "../main";

export const courseRoutes = express.Router();

courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/:course", courseController.courseDetailInfoByName);
courseRoutes.get("/:course/comment", courseController.courseComments);
