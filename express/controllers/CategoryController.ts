import { CategoryService } from "../services/CategoryService";

import { Request, Response } from "express";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  categoryCourses = async (req: Request, res: Response) => {
    try {
      let categoryName: string = req.params.name;
      const courses = await this.categoryService.getCoursesByCategory(
        categoryName
      );
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
