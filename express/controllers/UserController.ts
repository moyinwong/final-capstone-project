import { UserService } from "../services/UserService";
//import jwtSimple from "jwt-simple";

import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      console.log(this.userService);
      return;
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
