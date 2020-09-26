// // CheckoutForm.js
// import React from "react";
// import { Button, Form } from "react-bootstrap";
// import { injectStripe } from "react-stripe-elements";
// import "./CheckoutForm.scss";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// interface IProps {
//   elements: any;
//   stripe: any;
// }

// interface IState {}

// class CheckoutForm extends React.Component<IProps> {
//   handleSubmit = async (ev: any) => {
//     // We don't want to let default form submission happen here, which would refresh the page.
//     ev.preventDefault();
//     const authToken = localStorage.getItem("token");
//     console.log("ahahahhaha");

//     // const paymentIntent = await this.props.stripe.paymentIntents.create({
//     //   payment_method_types: ["alipay"],
//     //   amount: 1099,
//     //   currency: "hkd",
//     // });

//     // const alipay = await this.props.stripe
//     //   .confirmAlipayPayment(paymentIntent, {
//     //     // Return URL where the customer should be redirected to after payment
//     //     return_url: `${window.location.href}`,
//     //   })
//     //   .then((result: any) => {
//     //     if (result.error) {
//     //       // Inform the customer that there was an error.
//     //       console.log(result.error.message);
//     //     }
//     //   });

//     // console.log(alipay);

//     const token: stripe.Token = await this.props.stripe
//       .createToken({ type: "card", name: "Jenny Rosen" })
//       .then(function (result: stripe.TokenResponse) {
//         if (result.error) {
//           // Inform the user if there was an error.
//           var errorElement: any = document.getElementById("card-errors");
//           errorElement.textContent = result.error.message;
//         } else {
//           // Send the token to your server.
//           return result.token;
//           //payment(event, result.token.id);
//         }
//       });

//     console.log(token);

//     const formObj: {
//       chargeAmount?: number;
//       stripeToken?: string;
//     } = {};

//     formObj.chargeAmount = 100;
//     formObj.stripeToken = token.id;

//     console.log(formObj.stripeToken);

//     let queryRoute: string = "/payment/charge";

//     const fetchRes = await fetch(
//       `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(formObj),
//       }
//     );

//     console.log(fetchRes);
//     // token type can optionally be inferred if there is only one Element
//     // with which to create tokens
//     // this.props.stripe.createToken({name: 'Jenny Rosen'});

//     // You can also use createSource to create Sources.
//     // See our Sources documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-create-source
//     // With createSource, you will not need to pass in the reference to
//     // the Element. It will be inferred automatically.
//     // this.props.stripe.createSource({
//     //   type: "card",
//     //   owner: {
//     //     name: "Jenny Rosen",
//     //   },
//     // });
//   };

//   render() {
//     return (
//       <Form className="stripe-form" onSubmit={this.handleSubmit}>
//         <div>
//           <label>Card details</label>
//           {/* <CardElement
//             style={{ base: { fontSize: "18px" } }}
//             hidePostalCode={true}
//           /> */}
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "#9e2146",
//                 },
//               },
//             }}
//           />
//         </div>
//         <div id="card-errors" role="alert"></div>
//         <Button type="submit" value="submit">
//           確定付款
//         </Button>
//       </Form>
//     );
//   }
// }

// export default injectStripe(CheckoutForm);
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement, StripeCardElementOptions } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const authToken = localStorage.getItem("token");

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

  const handlePaymentIntent = async () => {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    if (!stripe || !elements || !authToken) {
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

    const { paymentIntentSecret } = await fetchRes.json();

    console.log(paymentIntentSecret);

    if (window.confirm("確認")) {
      const confirmRes = stripe.confirmCardPayment(paymentIntentSecret, {
        payment_method: paymentMethod?.id,
      });
      console.log("yes");
    } else {
      console.log("no");
    }
  };

  const handleCreateAccount = async () => {
    if (!stripe || !elements || !authToken) {
      return;
    }

    const cardElement: StripeCardElement | null = elements.getElement(
      CardElement
    );

    // Use your card Element with other Stripe.js APIs
    if (!cardElement) return;

    let queryRoute: string = "/payment/create-stripe-connect-account";

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

    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_OPTIONS} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <Button onClick={handleCheckOut}>checkOut</Button>
      <Button onClick={handlePaymentIntent}>checkOut</Button>
      <Button onClick={handleCreateAccount}>account</Button>
    </form>
  );
};

export default CheckoutForm;
