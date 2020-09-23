import { LessonService } from "../services/LessonService";
import { Request, Response } from "express";
import { logger } from "../logger";

export class LessonController {
  constructor(private lessonService: LessonService) {}

  courseLessons = async (req: Request, res: Response) => {
    try {
      const { course, user } = req.params;
      logger.debug(course, user);

      let lessons;
      if (user) {
        lessons = await this.lessonService.getLessonSummaryByCourseAndUser(
          course,
          user
        );
        if (lessons.length !== 0) {
          return res.json({ lessons });
        }
      }

      lessons = await this.lessonService.getLessonSummaryByCourse(course);

      if (lessons.length === 0) {
        return res.status(401).json({ message: "no lesson found" });
      }
      return res.json({ lessons });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  lesson = async (req: Request, res: Response) => {
    try {
      const { lesson } = req.params;
      const lessonInfo = await this.lessonService.getLessonAccessibility(
        lesson
      );
      return res.json({ lessonInfo });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  lessonQuestionAndAnswer = async (req: Request, res: Response) => {
    try {
      const { lesson } = req.params;
      const questionAndAnswer = await this.lessonService.getLessonQuestionAndAnswer(
        lesson
      );
      return res.json({ questionAndAnswer });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  lessonFile = async (req: Request, res: Response) => {
    try {
      const { lesson } = req.params;
      const files = await this.lessonService.getLessonFiles(lesson);
      return res.json({ files });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  checkAnswer = async (req: Request, res: Response) => {
    try {
      const { lesson } = req.params;
      const questionAndAnswers = req.body;

      const questionAndCorrectAnswers: Array<{
        question: string;
        answer_body: string;
      }> = await this.lessonService.getCorrectAnswer(lesson);

      const result = [];

      for (let correctAnswer of questionAndCorrectAnswers) {
        logger.debug(questionAndCorrectAnswers[correctAnswer.question]);
        logger.debug(correctAnswer.answer_body);
        if (
          questionAndAnswers[correctAnswer.question] ===
          correctAnswer.answer_body
        ) {
          const newObj = {};
          newObj[correctAnswer.question] = "correct";
          result.push(newObj);
        } else {
          const newObj = {};
          newObj[correctAnswer.question] = "wrong";
          result.push(newObj);
        }
      }
      return res.json({ result });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
}
