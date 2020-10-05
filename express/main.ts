import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cors from "cors";
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const app = express();

//set up knex
import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig["development"]);

//use CORS
app.use(cors());

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'
});

export const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'tecky-final-capstone-project-upload',
      metadata: (req,file,cb)=>{
          cb(null,{fieldName: file.fieldname});
      },
      key: (req,file,cb)=>{
          cb(null,`${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
      }
  })
})

//storage file
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${__dirname}/public/img`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
//   },
// });

// export const upload = multer({ storage });

//storage file
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/file`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.substring(
        0,
        file.originalname.lastIndexOf(".")
      )}-${Date.now()}.${file.mimetype.split("/")[1]}`
    );
  },
});

export const fileUpload = multer({ storage: fileStorage });

//set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up guards
import { createIsLoggedIn } from "./guards";

//set up services & controllers
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { CourseService } from "./services/CourseService";
import { CourseController } from "./controllers/CourseController";
import { CategoryService } from "./services/CategoryService";
import { CategoryController } from "./controllers/CategoryController";
import { LessonService } from "./services/LessonService";
import { LessonController } from "./controllers/LessonController";
import { PaymentService } from "./services/PaymentService";
import { PaymentController } from "./controllers/PaymentController";

const userService = new UserService(knex);
export const userController = new UserController(userService);

const courseService = new CourseService(knex);
export const courseController = new CourseController(courseService);

const categoryService = new CategoryService(knex);
export const categoryController = new CategoryController(categoryService);

const lessonService = new LessonService(knex);
export const lessonController = new LessonController(lessonService);

const paymentService = new PaymentService(knex);
export const paymentController = new PaymentController(paymentService);

//create guards
export const isLoggedIn = createIsLoggedIn(userService);

import { routes } from "./routes";
import { logger } from "./logger";

const API_VERSION = "/api";

app.use(express.static("public"));
app.use(API_VERSION, routes);

//dummy check if guards works
app.get(`${API_VERSION}/test`, isLoggedIn, (req, res) => {
  logger.debug(req.user);

  //if success, hello world, fail, permission denied
  res.json(req.user);
});

//listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`listening to Port: ${PORT}`);
});
