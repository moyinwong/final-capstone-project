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
// paymentRoutes.post(
//   "/create-account-link",
//   isLoggedIn,
//   paymentController.createAccountLink
// );
paymentRoutes.post(
  "/payment-confirmed",
  isLoggedIn,
  paymentController.confirmedPayment
);
paymentRoutes.get(
  "/create-stripe-account-link/:userEmail",
  isLoggedIn,
  paymentController.createAccountLink
);

paymentRoutes.get(
  "/check-stripe-account-status/:userEmail",
  isLoggedIn,
  paymentController.getStripeAccountStatus
);

paymentRoutes.get(
  "/create-login-link/:userEmail",
  isLoggedIn,
  paymentController.getStripeAccountLoginLink
);
paymentRoutes.post(
  "/charge",
  // isLoggedIn,
  paymentController.MobilePayment
);
