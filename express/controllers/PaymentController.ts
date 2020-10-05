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
      const { userEmail } = req.params;

      const account = await this.paymentService.createStripeConnectAccount(
        userEmail
      );

      const userId = await this.paymentService.inputStripeId(
        account.id,
        userEmail
      );
      logger.debug(userId);

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
      const { courses } = req.body;
      let description: string = "buy ";
      let totalPrice: number = 0;
      for (let course of courses) {
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
      const { courses, userEmail } = req.body;

      const paymentIntent = await this.paymentService.retrievePaymentIntent(
        paymentIntentSecret
      );

      const chargeId: string = paymentIntent.charges.data[0].id;

      for (let course of courses) {
        const transfer = await this.paymentService.createTransfer(
          course.tutor_name,
          parseFloat(course.price) * 0.9,
          chargeId,
          `${userEmail} purchased ${course.course_name}`
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
      const { userEmail } = req.params;

      const userInfo = await this.paymentService.getStripeId(userEmail);

      if (userInfo.length === 0) {
        return res.status(400).json({ message: "no such user" });
      }

      const stripeId = userInfo[0].stripe_id;

      if (!stripeId) {
        return res.status(400).json({ message: "user has no stripe account" });
      }

      const accountLink = await this.paymentService.createAccountLinks(
        stripeId
      );

      return res.json({ url: accountLink.url });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getStripeAccountStatus = async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.params;

      const userInfo = await this.paymentService.getStripeId(userEmail);

      if (userInfo.length === 0) {
        return res.status(400).json({ message: "no such user" });
      }

      const stripeId = userInfo[0].stripe_id;

      if (!stripeId) {
        return res.status(400).json({ message: "user has no stripe account" });
      }

      const accountInfo = await this.paymentService.retrieveStripeAccountStatus(
        stripeId
      );

      return res.json({ stripestatus: accountInfo.charges_enabled });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getStripeAccountLoginLink = async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.params;

      const userInfo = await this.paymentService.getStripeId(userEmail);

      if (userInfo.length === 0) {
        return res.status(400).json({ message: "no such user" });
      }

      const stripeId = userInfo[0].stripe_id;

      if (!stripeId) {
        return res.status(400).json({ message: "user has no stripe account" });
      }

      const loginLink = await this.paymentService.createStripeLoginLink(
        stripeId
      );

      return res.json({ link: loginLink });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  MobilePayment = async (req: Request, res: Response) => {
    try {
      const { stripeToken, chargeAmount, cartCourses } = req.body;

      console.log(cartCourses);

      //wait for userEmail

      const data = await this.paymentService.createPaymentByCharge(
        stripeToken,
        parseFloat(chargeAmount)
      );

      console.log(data);

      if (data.status !== "succeeded") throw new Error(data.message);

      return res.json({ message: "success" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
}
