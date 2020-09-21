import { CategoryService } from "../services/CategoryService";

import { Request, Response } from "express";
// import { logger } from "../logger";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  categoryCourses = async (req: Request, res: Response) => {
    try {
      let categoryName: string = req.params.name;
      const courses = await this.categoryService.getCoursesByCategory(
        categoryName
      );
      console.log(courses)
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  subcategoryCourses = async (req: Request, res: Response) => {
    try {
      console.log(req.params);
      let subcategoryName: string = req.params.name;
      const courses = await this.categoryService.getCoursesBySubcategory(
        subcategoryName
      );
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
