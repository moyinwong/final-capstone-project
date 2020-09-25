import express from "express";
import { courseController } from "../main";
import { upload } from '../main'
export const courseRoutes = express.Router();

courseRoutes.post('/create/:userEmail', upload.single('file'), courseController.courseCreation)
courseRoutes.get('/all/:tutor', courseController.courseByInstructor)
courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/:course", courseController.courseDetailInfoByName);
courseRoutes.get("/:course/comment", courseController.courseComments);
