import express from "express";
import { paymentController, isLoggedIn } from "../main";

export const paymentRoutes = express.Router();

paymentRoutes.post(
  "/create-stripe-connect-account",
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
