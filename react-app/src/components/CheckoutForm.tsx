import React, { ChangeEvent, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  StripeCardElement,
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
//import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { ICourse } from "../pages/CategoryPage";
import "./CheckoutForm.scss";

interface ICheckOutFormError {
  message: string;
}

const CARD_OPTIONS: StripeCardElementOptions = {
  hidePostalCode: true,
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#67ace5",
      color: "#fff",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87e5fd",
      },
    },

    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField: React.FC<{
  onChange: (e: StripeCardElementChangeEvent) => void;
}> = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field: React.FC<{
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
}> = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton: React.FC<{
  processing: boolean;
  error: ICheckOutFormError | null;
  children: any;
  disabled: boolean;
}> = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage: React.FC<{ children: any }> = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton: React.FC<{
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const userEmail = useSelector((state: IRootState) => state.auth.email);
  const [error, setError] = useState<ICheckOutFormError | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const authToken = localStorage.getItem("token");
  const [paymentIntent, setPaymentIntent] = useState<string>("");

  const cartCourses = useSelector((state: IRootState) => state.cart.courses);

  useEffect(() => {
    //create intent once got the information
    if (cartCourses.length > 0 && authToken && stripe && userEmail) {
      createPaymentIntent(cartCourses, authToken);
    }
  }, [cartCourses, authToken, stripe, userEmail]);

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement: StripeCardElement | null = elements.getElement(
      CardElement
    );

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

    const confirmRes = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: paymentMethod?.id,
    });

    console.log(confirmRes);

    if (confirmRes.error) {
      setError({ message: confirmRes.error.message as string });
      return;
    }

    const confirmedPaymentIntent = confirmRes.paymentIntent;

    if (confirmedPaymentIntent?.status !== "succeeded") {
      setError({ message: "付款不成功" });
    }

    const confirmedPaymentRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/payment/payment-confirmed/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ paymentIntent, cartCourses, userEmail }),
      }
    );

    const result = await confirmedPaymentRes.json();
    console.log(result);
  };

  const createPaymentIntent = async (course: ICourse[], authToken: string) => {
    //console.log("hahaha");
    //console.log(stripe);
    if (!stripe || !authToken) {
      return;
    }

    let queryRoute: string = "/payment/create-payment-intent";

    const info = {
      userEmail,
      cartCourses,
    };

    const fetchRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(info),
      }
    );

    const paymentIntentObj: {
      paymentIntentSecret: string;
    } = await fetchRes.json();
    const { paymentIntentSecret } = paymentIntentObj;
    console.log(paymentIntentSecret);
    console.log("obj" + paymentIntentObj);
    setPaymentIntent(paymentIntentSecret);
  };

  const confirmedPaymentIntent = async (
    course: ICourse[],
    authToken: string
  ) => {
    console.log("hahahaHAHAHAHA");
    //console.log(stripe);
    // if (!stripe || !authToken) {
    //   return;
    // }

    // let queryRoute: string = "/payment/create-payment-intent";

    // const info = {
    //   userEmail,
    //   cartCourses,
    // };

    // const fetchRes = await fetch(
    //   `${process.env.REACT_APP_BACKEND_URL}${queryRoute}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //     body: JSON.stringify(info),
    //   }
    // );

    // const paymentIntentObj: {
    //   paymentIntentSecret: string;
    // } = await fetchRes.json();
    // const { paymentIntentSecret } = paymentIntentObj;
    // console.log(paymentIntentSecret);
    // console.log("obj" + paymentIntentObj);
    // setPaymentIntent(paymentIntentSecret);
  };

  return (
    <form className="Form stripe-form" onSubmit={handleSubmit}>
      <div className="stripe-form-title">
        <h1>請填寫付款資料</h1>
      </div>
      <fieldset className="FormGroup">
        <Field
          label="姓名"
          id="name"
          type="text"
          placeholder="請填上姓名"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="電郵"
          id="email"
          type="email"
          placeholder="請填上電郵"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="電話"
          id="phone"
          type="tel"
          placeholder="請填上電話號碼"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e: any) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error?.message}</ErrorMessage>}
      <SubmitButton
        processing={processing}
        error={error}
        disabled={!stripe || !cardComplete}
      >
        確認付款
      </SubmitButton>
      <ResetButton onClick={reset} disabled={false} />
    </form>
  );
};

export default CheckoutForm;
