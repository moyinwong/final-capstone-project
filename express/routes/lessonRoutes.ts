import express from "express";
import { lessonController, fileUpload } from "../main";

export const lessonRoutes = express.Router();

lessonRoutes.get("/summary/:course/:user", lessonController.courseLessons);
lessonRoutes.get("/summary/:course", lessonController.courseLessons);
lessonRoutes.get("/info/:lesson", lessonController.lesson);
lessonRoutes.get("/question/:lesson", lessonController.lessonQuestionAndAnswer);
lessonRoutes.get("/file/:lesson", lessonController.lessonFile);
lessonRoutes.post("/check/:lesson", lessonController.checkAnswer);
lessonRoutes.post(
  "/creation/:courseName",
  fileUpload.array("files", 10),
  lessonController.createLesson
);
lessonRoutes.post(
  "/creation/question/:lessonName",
  lessonController.createLessonQuestion
);
lessonRoutes.get("/threads/retrieve/:lessonId", lessonController.getThreads);
