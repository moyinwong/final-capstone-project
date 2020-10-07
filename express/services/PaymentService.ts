import Knex from "knex";
import { tables } from "../tables";
import { logger } from "../logger";
//import { tables } from "../tables";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//import { logger } from "../logger";

export class PaymentService {
  constructor(private knex: Knex) {}

  createStripeConnectAccount = async (email: string) => {
    const user = await this.knex(tables.USERS).where("email", email).update(
      {
        is_tutor: true,
      },
      ["id"]
    );
    logger.debug(user);

    const account = await stripe.accounts.create({
      type: "express",
      country: "HK",
      email: email,
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
    //console.log("hehehhe" + paymentIntentSecret);
    const paymentIntentId = paymentIntentSecret.split("_secret_")[0];
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return paymentIntent;
  };

  createTransfer = async (
    tutor_name: string,
    amount: number,
    chargeId: string,
    description: string
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
      description: description,
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
      account: accountId,
      refresh_url: "https://e-ducate.life",
      return_url: "https://e-ducate.life",
      type: "account_onboarding",
    });
    return accountLinks;
  };

  inputStripeId = async (accountId: number, userEmail: string) => {
    const userId = await this.knex(tables.USERS)
      .update(
        {
          stripe_id: accountId,
        },
        ["id"]
      )
      .where("email", userEmail);

    return userId;
  };

  getStripeId = async (userEmail: string) => {
    const result = await this.knex
      .select("stripe_id")
      .from(`${tables.USERS}`)
      .where("email", userEmail)
      .limit(1);

    return result;
  };

  retrieveStripeAccountStatus = async (stripeId: string) => {
    const account = await stripe.account.retrieve(stripeId);
    return account;
  };

  createStripeLoginLink = async (stripeId: string) => {
    const loginLink = await stripe.accounts.createLoginLink(stripeId);
    return loginLink;
  };

  createPaymentByCharge = async (stripeToken: string, chargeAmount: number) => {
    const data: any = await stripe.charges.create({
      source: stripeToken,
      amount: chargeAmount * 100,
      currency: "hkd",
    });
    return data;
  };
}
