import express from "express";
import { userController, isLoggedIn } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login);
userRoutes.get("/info", isLoggedIn, userController.getInfo);
userRoutes.post("/login/google", userController.loginGoogle);
userRoutes.post("/login/facebook", userController.loginFacebook);
userRoutes.get(
  "/:course/:user",
  isLoggedIn,
  userController.allowUserAccessCourse
);
