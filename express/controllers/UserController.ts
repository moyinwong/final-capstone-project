import { UserService } from "../services/UserService";
import jwtSimple from "jwt-simple";
import jwt from "../jwt";
import { checkPassword } from "../hash";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      if (!req.body.username || !req.body.password) {
        res.status(401).json({ msg: "Missing Username/Password" });
        return;
      }
      const { username, password } = req.body;
      const user = await this.userService.getUserByUsername(username);
      if (!user || !(await checkPassword(password, user.password))) {
        res.status(401).json({ msg: "Wrong Username/Password" });
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
