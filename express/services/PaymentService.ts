import Knex from "knex";
//import { tables } from "../tables";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//import { logger } from "../logger";

export class PaymentService {
  constructor(private knex: Knex) {}

  hihi() {
    console.log(this.knex);
  }

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
