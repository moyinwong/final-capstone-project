import React from "react";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "../components/CheckoutForm";

const PaymentPage: React.FC = () => {
  return (
    <div>
      <div>
        <Elements>
          <InjectedCheckoutForm elements="" stripe="" />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
