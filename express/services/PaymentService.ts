import Knex from "knex";
import { tables } from "../tables";
//import { tables } from "../tables";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//import { logger } from "../logger";

export class PaymentService {
  constructor(private knex: Knex) {}

  createStripeConnectAccount = async (email: string) => {
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
  };

  createPaymentIntent = async (
    //transferGroupId: string,
    description: string,
    totalPrice: number
  ) => {
    const paymentIntent = await stripe.paymentIntents.create({
      description,
      payment_method_types: ["card"],
      amount: totalPrice * 100,
      currency: "hkd",
      //transfer_group: transferGroupId,
    });

    return paymentIntent;
  };

  retrievePaymentIntent = async (paymentIntentSecret: string) => {
    console.log("hehehhe" + paymentIntentSecret);
    const paymentIntentId = paymentIntentSecret.split("_secret_")[0];
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return paymentIntent;
  };

  createTransfer = async (
    tutor_name: string,
    amount: number,
    chargeId: string
  ) => {
    const [result] = await this.knex
      .select(`${tables.USERS}.stripe_id`)
      .from(`${tables.USERS}`)
      .where(`${tables.USERS}.name`, tutor_name)
      .limit(1);

    const tutorStripeAccountId = result.stripe_id;

    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: "hkd",
      destination: tutorStripeAccountId,
      //transfer_group: transferGroupId,
      source_transaction: chargeId,
    });

    return transfer;
  };

  addUserPurchasedCourse = async (
    userEmail: string,
    courseId: number,
    coursePrice: number
  ) => {
    const [user] = await this.knex
      .select("id")
      .from(`${tables.USERS}`)
      .where(`${tables.USERS}.email`, userEmail)
      .limit(1);

    const userId = user.id;

    const result = await this.knex(`${tables.PURCHASED_COURSES}`).insert([
      {
        user_id: userId,
        course_id: courseId,
        payment_method: "credit card",
        paid_amount: coursePrice,
      },
    ]);
    return result;
  };

  createAccountLinks = async (accountId: string) => {
    const accountLinks = await stripe.accountLinks.create({
      account: "acct_1HVXrIF1vd04vxx6",
      refresh_url: "https://localhost:3000",
      return_url: "https://localhost:3000",
      type: "account_onboarding",
    });
    return accountLinks;
  };
}
