import Knex from "knex";
//import { tables } from "../tables";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//import { logger } from "../logger";

export class PaymentService {
  constructor(private knex: Knex) {}

  hihi() {
    console.log(this.knex);
  }
  // fetchStripePayment = async (stripeToken: any, chargeAmount: number) => {
  //   console.log(stripeToken);
  //   try {
  //     const paymentIntent = await stripe.paymentIntents.create(
  //       {
  //         payment_method_types: ["card"],
  //         amount: 99 * 100,
  //         currency: "hkd",
  //         application_fee_amount: 9 * 100,
  //       },
  //       {
  //         stripeAccount: "acct_1HVIZmEar5uWLoZR",
  //       }
  //     );

  //     console.log(paymentIntent);

  //     const handlePayment = await stripe.handleCardPayment(
  //       paymentIntent.client_secret
  //     );

  //     console.log(handlePayment);

  //     // const fetchStripeRes: any = await stripe.charges.create({
  //     //   source: stripeToken,
  //     //   amount: chargeAmount * 100,
  //     //   currency: "hkd",
  //     // });

  //     const user = await this.knex.select("*").from("users");

  //     logger.debug(user);

  //     return paymentIntent;
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // };

  createStripeConnectAccount = async (email: string) => {
    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: "HK",
        email: "clintco10@example.com",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      return account;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  createPaymentIntent = async (transferGroupId: string) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: 99 * 100,
        currency: "hkd",
        transfer_group: transferGroupId,
      });

      console.log(paymentIntent);

      return paymentIntent.client_secret;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // createStripePaymentSession = async () => {
  //   try {
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ["card"],
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "hkd",
  //             product_data: {
  //               name: "test",
  //             },
  //             unit_amount: 2000,
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       payment_intent_data: {
  //         transfer_group: 111,
  //       },
  //       mode: "payment",
  //       success_url: "https://localhost:3000/",
  //       cancel_url: "https://localhost:3000/cart",
  //     });
  //     return session.id;
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // };

  createTransfer = async (
    connectedAccount: string,
    transferGroupId: string
  ) => {
    try {
      const transfer = await stripe.transfers.create({
        amount: 300,
        currency: "hkd",
        destination: connectedAccount,
        transfer_group: transferGroupId,
      });

      return transfer;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  createAccountLinks = async (accountId: string) => {
    try {
      const accountLinks = await stripe.accountLinks.create({
        account: "acct_1HVXrIF1vd04vxx6",
        refresh_url: "https://localhost:3000",
        return_url: "https://localhost:3000",
        type: "account_onboarding",
      });
      return accountLinks;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
