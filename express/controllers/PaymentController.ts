import { PaymentService } from "../services/PaymentService";
import { Request, Response } from "express";
//import { logger } from "../logger";

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  makeId(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // chargeAndUpdatePurchaseCourse = async (req: Request, res: Response) => {
  //   try {
  //     const { chargeAmount, stripeToken } = req.body;
  //     const fetchStripeRes = await this.paymentService.fetchStripePayment(
  //       stripeToken,
  //       chargeAmount
  //     );
  //     return res.json({
  //       message: "已收到款項",
  //       receipt: fetchStripeRes.receipt_url,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(500).json({ message: "internal server error" });
  //   }
  // };

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

  // createCheckout = async (req: Request, res: Response) => {
  //   try {
  //     //const paymentIntent = await this.paymentService.createPaymentIntent();

  //     const sessionId = await this.paymentService.createStripePaymentSession();

  //     const tranfer = await this.paymentService.createTransfer(
  //       "acct_1HVIZmEar5uWLoZR"
  //     );

  //     console.log(tranfer);

  //     return res.json({ id: sessionId });
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(500).json({ message: "internal server error" });
  //   }
  // };

  createPaymentIntent = async (req: Request, res: Response) => {
    try {
      const transferGroupId = this.makeId(10);

      const paymentIntentSecret = await this.paymentService.createPaymentIntent(
        transferGroupId
      );

      const transfer = await this.paymentService.createTransfer(
        "acct_1HVIZmEar5uWLoZR",
        transferGroupId
      );

      console.log(transfer);

      console.log(paymentIntentSecret);

      return res.json({ paymentIntentSecret });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
}
