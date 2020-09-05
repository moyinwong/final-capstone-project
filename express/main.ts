import express from "express";
import bodyParser from "body-parser";

const app = express();

import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { createIsLoggedIn } from "./guards";

import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

const userService = new UserService(knex);
export const userController = new UserController(userService);

//create guards
export const isLoggedIn = createIsLoggedIn(userService);

import { routes } from "./routes";
import { logger } from "./logger";
const API_VERSION = "/api";

app.use(API_VERSION, routes);

//dummy check if guards works
app.get(`${API_VERSION}/test`, isLoggedIn, (req, res) => {
  logger.info(req.user);

  //if success, hello world, fail, permission denied
  res.json({ message: "hello, world" });
});

//listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`listening to Port: ${PORT}`);
});
