import express from "express";
import { courseController } from "../main";

export const courseRoutes = express.Router();

courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/:courseName", courseController.courseDetailInfoByName);
