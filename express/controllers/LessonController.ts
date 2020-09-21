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
}
