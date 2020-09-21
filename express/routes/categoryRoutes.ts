import express from "express";
import { categoryController } from "../main";

export const categoryRoutes = express.Router();

categoryRoutes.get("/:name", categoryController.categoryCourses);
categoryRoutes.get("/others/:name", categoryController.subcategoryCourses);
<<<<<<< HEAD

=======
//categoryRoutes.get("/all", categoryController.allCourses);
>>>>>>> eb5ab3068d56df61bb4aaa344d4f53a26fa36b62
