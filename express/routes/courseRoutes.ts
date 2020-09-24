import express from "express";
import { courseController } from "../main";
import { upload } from '../main'
export const courseRoutes = express.Router();

courseRoutes.post('/create', upload.single('file'), courseController.courseCreation)
courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/:course", courseController.courseDetailInfoByName);
courseRoutes.get("/:course/comment", courseController.courseComments);
