import express from "express";
import { courseController, isLoggedIn } from "../main";
import { upload } from "../main";
export const courseRoutes = express.Router();

courseRoutes.post(
  "/create/:userEmail",
  upload.single("file"),
  courseController.courseCreation
);

courseRoutes.get("/tutor/:tutorEmail", courseController.getCourseDetailByTutor);
courseRoutes.get("/tutor/info/:tutorEmail", courseController.getTutorInfo);
courseRoutes.get("/all/lessons/:courseId", courseController.getAllLessons);
courseRoutes.get("/completion", courseController.checkCompletion);
courseRoutes.get("/all/:tutor", courseController.courseByInstructor);
courseRoutes.get("/popular", courseController.popularCourses);
courseRoutes.get("/good-comment", courseController.goodCommentCourses);
courseRoutes.get("/:course", courseController.courseDetailInfoByName);
courseRoutes.get("/:course/comment", courseController.courseComments);
courseRoutes.put("/comment/update", isLoggedIn, courseController.updateComment);
