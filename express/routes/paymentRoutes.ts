import express from "express";
import { paymentController, isLoggedIn } from "../main";

export const paymentRoutes = express.Router();

// paymentRoutes.post(
//   "/charge",
//   isLoggedIn,
//   paymentController.chargeAndUpdatePurchaseCourse
// );
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
