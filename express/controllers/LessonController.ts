import { LessonService } from "../services/LessonService";
import { Request, Response } from "express";

export class LessonController {
  constructor(private lessonService: LessonService) {}

  courseLessons = async (req: Request, res: Response) => {
    try {
      const { course } = req.params;
      const lessons = await this.lessonService.getLessonsByCourseName(course);

      console.log(lessons);

      if (lessons.length === 0) {
        return res.status(401).json({ message: "no lesson found" });
      }
      return res.json({ lessons: lessons });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
}
