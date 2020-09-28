import { UserService } from "../services/UserService";
import jwtSimple from "jwt-simple";
import jwt from "../jwt";
import { checkPassword, hashPassword } from "../hash";
import { Request, Response } from "express";
import { logger } from "../logger";
import fetch from "node-fetch";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    logger.debug(req.body.email);
    logger.debug(req.body.password);
    try {
      if (!req.body.email || !req.body.password) {
        res.status(401).json({ msg: "Missing Email/Password" });
        return;
      }
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);

      if (!user || !(await checkPassword(password, user.password))) {
        res.status(401).json({ msg: "Wrong Email/Password" });
        return;
      }

      //return token
      const payload = {
        id: user.id,
      };
      const token = jwtSimple.encode(payload, jwt.jwtSecret);

      res.json({
        token: token,
        email: user.email,
        isTutor: user.is_tutor,
      });
    } catch (e) {
      logger.error(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  getInfo = async (req: Request, res: Response) => {
    try {
      const user = req.user;

      res.status(200).json({
        user: {
          email: user?.email,
          isTutor: user?.is_tutor,
        },
      });
    } catch (e) {
      logger.error(e.message);
      res.status(401).json({ message: "unauthorized" });
    }
  };

  loginGoogle = async (req: Request, res: Response) => {
    try {
      if (!req.body.accessToken) {
        res.status(401).json({ message: "Wrong Access Token" });
        return;
      }
      const { accessToken } = req.body;
      const fetchResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await fetchResponse.json();

      if (result.error) {
        res.status(401).json({ message: "Wrong Access Token" });
        return;
      }

      //debug
      logger.debug(result);
      let payload: { id: number };

      let user = await this.userService.getUserByGoogleId(result.id);

      //debug
      logger.debug(user);

      if (!user) {
        const password = await hashPassword("noPasswordProvided");
        const userID = await this.userService.createUserWithGoogle(
          result.email,
          password,
          result.id,
          result.name,
          result.picture
        );
        payload = { id: userID };
        user = await this.userService.getUserByGoogleId(result.id);
      } else {
        // user found
        payload = { id: user.id };
      }

      //debug
      logger.debug(payload);

      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      res.json({
        token: token,
        email: user.email,
        isTutor: user.is_tutor,
      });
    } catch (e) {
      logger.error(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  loginFacebook = async (req: Request, res: Response) => {
    try {
      if (!req.body.accessToken) {
        res.status(401).json({ message: "Wrong Access Token!" });
        return;
      }

      const { accessToken } = req.body;
      const fetchResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
      );
      const result = await fetchResponse.json();
      if (result.error) {
        res.status(401).json({ message: "Wrong Access Token!" });
        return;
      }

      //debug
      logger.debug(result);

      let user = await this.userService.getUserByFacebookId(result.id);

      //debug
      logger.debug(user);

      if (!user) {
        const password = await hashPassword("noPasswordProvided");
        user = (
          await this.userService.createUserWithFacebook(
            result.email,
            password,
            result.id,
            result.name,
            result.picture
          )
        )[0];
      }

      const payload = {
        id: user?.id,
        email: user?.email,
      };

      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      res.json({
        token: token,
        email: user.email,
        isTutor: user.is_tutor,
      });
    } catch (e) {
      logger.error(e.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  allowUserAccessCourse = async (req: Request, res: Response) => {
    try {
      const { user, course } = req.params;
      const isAllow = await this.userService.getUserIsAllowAccessCourse(
        user,
        course
      );
      logger.debug(isAllow);
      res.json({ is_allow: isAllow });
    } catch (err) {
      logger.error(err);

      res.status(500).json({ message: "Internal server error" });
    }
  };

  userAllCourses = async (req: Request, res: Response) => {
    try {
      const { user } = req.params;
      const courses = await this.userService.getUserAllAllowAccessCourses(user);

      res.json({ courses });
    } catch (err) {
      logger.error(err);

      res.status(500).json({ message: "Internal server error" });
    }
  };
}
