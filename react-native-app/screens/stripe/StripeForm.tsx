import React from "react";
import { View } from "react-native";
import Stripe from "expo-payments-stripe";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51H5XkyCDvfrPMmRKTzJR6lhsYHm6bUyjWqh9YVxA8dYkhAxRR2QqVUdaCuWAF0tPDaQNCoZRmSHI7jTnUODDcXUN00rXrCxG5M", // Your key
  androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
});

function StripeForm() {
  return <View></View>;
}

export default StripeForm;
