import express from "express";
import { lessonController } from "../main";

export const lessonRoutes = express.Router();

lessonRoutes.get("/summary/:course/:user", lessonController.courseLessons);
lessonRoutes.get("/summary/:course", lessonController.courseLessons);
lessonRoutes.get("/info/:lesson", lessonController.lesson);
lessonRoutes.get("/question/:lesson", lessonController.lessonQuestionAndAnswer);
lessonRoutes.get("/file/:lesson", lessonController.lessonFile);
lessonRoutes.post("/check/:lesson", lessonController.checkAnswer);
