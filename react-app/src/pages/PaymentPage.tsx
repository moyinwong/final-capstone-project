import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
//import { Elements } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";

// const stripePromise = loadStripe(
//   process.env.REACT_APP_STRIPE_TEST_KEY as string
// );

const PaymentPage: React.FC = () => {
  const stripePromise = loadStripe(
    "pk_test_51H5XkyCDvfrPMmRKTzJR6lhsYHm6bUyjWqh9YVxA8dYkhAxRR2QqVUdaCuWAF0tPDaQNCoZRmSHI7jTnUODDcXUN00rXrCxG5M"
  );
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          {/* <InjectedCheckoutForm elements="" stripe="" /> */}
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
