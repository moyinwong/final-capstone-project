import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement, StripeCardElementOptions } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { ICourse } from "../pages/CategoryPage";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const authToken = localStorage.getItem("token");
  const [paymentIntent, setPaymentIntent] = useState<string>("");

  const cartCourses = useSelector((state: IRootState) => state.cart.courses);

  useEffect(() => {
    if (cartCourses.length > 0 && authToken) {
      createPaymentIntent(cartCourses, authToken);
    }
  }, [cartCourses, authToken]);

  const CARD_OPTIONS: StripeCardElementOptions = {
    hidePostalCode: true,
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "black",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement: StripeCardElement | null = elements.getElement(
      CardElement
    );

    // Use your card Element with other Stripe.js APIs
    if (!cardElement) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const result: any = await stripe.createToken(cardElement);

    console.log(result.token);

    const formObj: {
      chargeAmount?: number;
      stripeToken?: string;
    } = {};

    formObj.chargeAmount = 100;
    formObj.stripeToken = result.token.id;

    console.log("token: ", formObj.stripeToken);

    let queryRoute: string = "/payment/charge";

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formObj),
      }
    );
    // .then(function (result: stripe.TokenResponse) {
    //   if (result.error) {
    //     // Inform the user if there was an error.
    //     var errorElement: any = document.getElementById("card-errors");
    //     errorElement.textContent = result.error.message;
    //   } else {
    //     // Send the token to your server.
    //     return result.token;
    //     //payment(event, result.token.id);
    //   }
    // });
  };
  const handleCheckOut = async () => {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    if (!stripe || !elements || !authToken) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    let queryRoute: string = "/payment/create-checkout-session";

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const result = await fetchRes.json();

    console.log(result.id);

    const CheckOutFetchRes = await stripe.redirectToCheckout({
      sessionId: result.id,
    });

    console.log(CheckOutFetchRes);
  };

  const createPaymentIntent = async (course: ICourse[], authToken: string) => {
    if (!stripe || !authToken) {
      return;
    }

    let queryRoute: string = "/payment/create-payment-intent";

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const paymentIntentObj: {
      paymentIntentSecret: string;
    } = await fetchRes.json();
    const { paymentIntentSecret } = paymentIntentObj;

    setPaymentIntent(paymentIntentSecret);
  };

  // const handlePaymentIntent = async () => {
  //   const cardElement: StripeCardElement | null = elements.getElement(
  //     CardElement
  //   );

  //   // Use your card Element with other Stripe.js APIs
  //   if (!cardElement) return;

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement,
  //   });

  //   let queryRoute: string = "/payment/create-payment-intent";

  //   const fetchRes = await fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     }
  //   );

  //   const { paymentIntentSecret } = await fetchRes.json();

  //   console.log(paymentIntentSecret);

  //   if (window.confirm("確認")) {
  //     const confirmRes = stripe.confirmCardPayment(paymentIntentSecret, {
  //       payment_method: paymentMethod?.id,
  //     });
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  // };

  // const handleCreateAccount = async () => {
  //   if (!stripe || !elements || !authToken) {
  //     return;
  //   }

  //   const cardElement: StripeCardElement | null = elements.getElement(
  //     CardElement
  //   );

  //   // Use your card Element with other Stripe.js APIs
  //   if (!cardElement) return;

  //   let queryRoute: string = "/payment/create-stripe-connect-account";

  //   const fetchRes = await fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     }
  //   );

  //   const result = await fetchRes.json();

  //   console.log(result);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {/* <Button onClick={handleCheckOut}>checkOut</Button>
      <Button onClick={handlePaymentIntent}>checkOut</Button>
      <Button onClick={handleCreateAccount}>account</Button> */}
    </form>
  );
};

export default CheckoutForm;
