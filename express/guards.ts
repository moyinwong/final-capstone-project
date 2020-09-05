import express from "express";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";
import { Bearer } from "permit";
import { UserService } from "./services/UserService";

const permit = new Bearer({
  query: "access_token",
});

//create isLoggedIn function
export function createIsLoggedIn(userService: UserService) {
  return async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      //no token, return
      const token = permit.check(req);
      if (!token) {
        return res.status(401).json({ msg: "Permission Denied" });
      }

      //has token
      const payload: { id: number } = jwtSimple.decode(token, jwt.jwtSecret);
      const user = await userService.getUserByID(payload.id);
      if (!user) {
        return res.status(401).json({ msg: "Permission Denied" });
      }
      // just want info other than password
      const { password, ...others } = user;

      req.user = { ...others };

      return next();
    } catch (err) {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  };
}
