import express from "express";
import { paymentController, isLoggedIn } from "../main";

export const paymentRoutes = express.Router();

paymentRoutes.put(
  "/create-stripe-connect-account/:userEmail",
  isLoggedIn,
  paymentController.createStripeAccount
);
paymentRoutes.post(
  "/create-payment-intent",
  isLoggedIn,
  paymentController.createPaymentIntent
);
paymentRoutes.post(
  "/create-account-link",
  isLoggedIn,
  paymentController.createAccountLink
);
paymentRoutes.post(
  "/payment-confirmed",
  isLoggedIn,
  paymentController.confirmedPayment
);
