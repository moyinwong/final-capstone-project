import express from "express";
import { userController, isLoggedIn, upload } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/signup", upload.single('image'), userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.get("/info", isLoggedIn, userController.getInfo);
userRoutes.post("/login/google", userController.loginGoogle);
userRoutes.post("/login/facebook", userController.loginFacebook);
userRoutes.get(
  "/:course/:user",
  isLoggedIn,
  userController.allowUserAccessCourse
);
userRoutes.get("/:user/course/all", isLoggedIn, userController.userAllCourses);

userRoutes.get("/course-detail/all/:userId", isLoggedIn, userController.getAllCourseDetail);
