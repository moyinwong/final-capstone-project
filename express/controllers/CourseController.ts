import { CourseService } from "../services/CourseService";

import { Request, Response } from "express";

export class CourseController {
  constructor(private courseService: CourseService) {}

  popularCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getMostPurchasedCourses();
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  categoryCourses = async (req: Request, res: Response) => {
    try {
      let categoryName: string = req.params.name;
      const courses = await this.courseService.getCoursesByCategory(
        categoryName
      );
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
