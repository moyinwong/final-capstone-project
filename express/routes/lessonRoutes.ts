import express from "express";
import { lessonController, fileUpload } from "../main";

export const lessonRoutes = express.Router();

lessonRoutes.put("/edit/:lessonName", fileUpload.array('files', 10), lessonController.editLesson);
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
lessonRoutes.post(
  "/completion/:courseId/:lessonId/:userId",
  lessonController.lessonCompleted
);
lessonRoutes.post("/topic/create", lessonController.createNewTopic);
lessonRoutes.post("/thread/create", lessonController.createNewThread);
