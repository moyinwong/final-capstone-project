import { UserService } from "../services/UserService";
import jwtSimple from "jwt-simple";
import jwt from "../jwt";
import { checkPassword } from "../hash";
import { Request, Response } from "express";
import { logger } from "../logger";

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
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
