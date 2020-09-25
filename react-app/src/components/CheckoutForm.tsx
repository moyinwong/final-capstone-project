// CheckoutForm.js
import React from "react";
import { Button, Form } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./CheckoutForm.scss";

interface IProps {
  elements: any;
  stripe: any;
}

interface IState {}

class CheckoutForm extends React.Component<IProps> {
  handleSubmit = (ev: any) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    console.log("ahahahhaha");

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // because only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    //const cardElement = this.props.elements.getElement("card");

    // From here we can call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    // this.props.stripe
    //   .createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: { name: "Jenny Rosen" },
    //   })
    //   .then(({ paymentMethod }: any) => {
    //     console.log("Received Stripe PaymentMethod:", paymentMethod);
    //   });

    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    // this.props.stripe.confirmCardPayment(
    //   process.env.REACT_APP_STRIPE_SECRET_KEY,
    //   {
    //     payment_method: {
    //       card: cardElement,
    //     },
    //   }
    // );

    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    // this.props.stripe.confirmCardSetup("{PAYMENT_INTENT_CLIENT_SECRET}", {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // });

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe
      .createToken({ type: "card", name: "Jenny Rosen" })
      .then(function (result: stripe.TokenResponse) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement: any = document.getElementById("card-errors");
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          console.log(result);
          //payment(event, result.token.id);
        }
      });
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    // this.props.stripe.createSource({
    //   type: "card",
    //   owner: {
    //     name: "Jenny Rosen",
    //   },
    // });
  };

  render() {
    return (
      <Form className="stripe-form" onSubmit={this.handleSubmit}>
        <div>
          <label>Card details</label>
          <CardElement
            style={{ base: { fontSize: "18px" } }}
            hidePostalCode={true}
          />
        </div>
        <div id="card-errors" role="alert"></div>
        <Button type="submit" value="submit">
          確定付款
        </Button>
      </Form>
    );
  }
}

export default injectStripe(CheckoutForm);
