import express from "express";
import { courseController, isLoggedIn } from "../main";
import { upload } from "../main";
export const courseRoutes = express.Router();

courseRoutes.post(
  "/create/:userEmail",
  upload.single("file"),
  courseController.courseCreation
  );
  
courseRoutes.get("/all/lessons/:courseId", courseController.getAllLessons);
courseRoutes.get("/completion", courseController.checkCompletion);
courseRoutes.get("/all/:tutor", courseController.courseByInstructor);
courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/good-comment", courseController.popularCourses);
courseRoutes.get("/:course", courseController.courseDetailInfoByName);
courseRoutes.get("/:course/comment", courseController.courseComments);
courseRoutes.put("/comment/update", isLoggedIn, courseController.updateComment);
