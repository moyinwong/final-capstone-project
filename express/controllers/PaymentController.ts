import { PaymentService } from "../services/PaymentService";
import { Request, Response } from "express";
import { logger } from "../logger";
//import { logger } from "../logger";

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // makeId(length: number): string {
  //   let result = "";
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  createStripeAccount = async (req: Request, res: Response) => {
    try {
      const account = await this.paymentService.createStripeConnectAccount(
        "testing2@abc.com"
      );

      const accountLink = await this.paymentService.createAccountLinks(
        account.id
      );
      return res.json({ url: accountLink.url });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  createPaymentIntent = async (req: Request, res: Response) => {
    try {
      const { cartCourses } = req.body;
      let description: string = "buy ";
      let totalPrice: number = 0;
      for (let course of cartCourses) {
        description += `${course.course_name}, `;
        totalPrice += parseFloat(course.price);
      }

      const paymentIntent = await this.paymentService.createPaymentIntent(
        //transferGroupId,
        description,
        totalPrice
      );

      const paymentIntentSecret = paymentIntent.client_secret;
      return res.json({ paymentIntentSecret });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  confirmedPayment = async (req: Request, res: Response) => {
    try {
      const paymentIntentSecret = req.body.paymentIntent;
      const { cartCourses, userEmail } = req.body;

      const paymentIntent = await this.paymentService.retrievePaymentIntent(
        paymentIntentSecret
      );

      const chargeId: string = paymentIntent.charges.data[0].id;

      for (let course of cartCourses) {
        const transfer = await this.paymentService.createTransfer(
          course.tutor_name,
          parseFloat(course.price) * 0.9,
          chargeId
        );
        if (transfer.type === "StripeInvalidRequestError") {
          throw new Error(transfer);
        } else {
          const addCourseRes = await this.paymentService.addUserPurchasedCourse(
            userEmail,
            parseInt(course.id),
            parseFloat(course.price)
          );
          logger.info(addCourseRes);
        }

        logger.info(transfer);
      }

      return res.json({ message: "success" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  createAccountLink = async (req: Request, res: Response) => {
    try {
      const accountLink = await this.paymentService.createAccountLinks(
        "acct_1HVYOVLAxpq9vdD8"
      );

      return res.json({ url: accountLink.url });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
}
