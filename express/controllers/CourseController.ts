import { CourseService, ICourseInfo } from "../services/CourseService";

import { Request, Response } from "express";

export class CourseController {
  constructor(private courseService: CourseService) {}

  popularCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getMostPurchasedCourses();
      console.log(courses.length);
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  goodCommentCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getBestRatingCommentCourses();
      console.log(courses.length);
      res.json({ courses: courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  courseDetailInfoByName = async (req: Request, res: Response) => {
    try {
      const { course } = req.params;
      const [courseInfo] = await this.courseService.getCourseInfoByName(course);
      if (!courseInfo) {
        return res.status(401).json({ message: "no such course" });
      }
      console.log(courseInfo);
      return res.json({ course: courseInfo });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  courseComments = async (req: Request, res: Response) => {
    try {
      const { course } = req.params;
      const comments = await this.courseService.getCourseComments(course);
      res.json({ comments });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  courseByInstructor = async (req: Request, res: Response) => {
    try {
      const { tutor } = req.params;
      const courses = await this.courseService.getCourseByInstructor(tutor);

      if (!courses) {
        res
          .status(401)
          .json({ message: "cannot find any course by this instructor" });
      }
      // console.log(courses)
      res.json({ courses });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "error on course by instructor" });
    }
  };

  courseCreation = async (req: Request, res: Response) => {
    try {
      const userEmail = req.params.userEmail;
      const {
        courseTitle,
        courseCategory,
        coursePrice,
        courseDescription,
        courseObjective,
        coursePrerequisite,
      } = req.body;

      const newCourseInfo: ICourseInfo = {
        courseTitle: courseTitle,
        courseCategory: parseInt(courseCategory),
        coursePrice: parseInt(coursePrice),
        courseDescription: courseDescription,
        courseObjective: courseObjective,
        coursePrerequisite: coursePrerequisite,
      };
      const courseCover = req.file.filename;

      const createdCourse = await this.courseService.createCourse(
        userEmail,
        newCourseInfo,
        courseCover
      );
      console.log(createdCourse);

      res.status(200).json({ message: "successfully created course" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Cannot create course" });
    }
  };

  updateComment = async (req: Request, res: Response) => {
    try {
      const userEmail = req.params.userEmail;
      const { courseName, comment, rating } = req.body;

      const purchasedCourse = await this.courseService.findPurchasedCourseId(
        userEmail,
        courseName
      );
      if (!purchasedCourse)
        return res
          .status(401)
          .json({ message: "user has no right to access course" });
      const purchasedCourseId = purchasedCourse.id;

      const result = await this.courseService.addNewComment(
        purchasedCourseId,
        comment,
        parseInt(rating)
      );
      console.log(result);

      if (result[0] !== 1)
        return res.status(400).json({ message: "fail to update" });

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Cannot create course" });
    }
  };
}
