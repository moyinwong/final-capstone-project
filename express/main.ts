import express from "express";
import bodyParser from "body-parser";

const app = express();

import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import { createIsLoggedIn } from "./guards";

import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

const userService = new UserService(knex);
export const userController = new UserController(userService);

// export const isLoggedIn = createIsLoggedIn(userService);

import { routes } from "./routes";
const API_VERSION = "/api/";

app.use(API_VERSION, routes);
// app.get(`${API_VERSION}/test`, isLoggedIn, (req, res) => {
//     console.log(req.user);
//     res.json({ message: "hello, world" });
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening to Port: ${PORT}`);
});
