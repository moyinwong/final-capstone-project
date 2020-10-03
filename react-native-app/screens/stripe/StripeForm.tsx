import React from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
//import { Button } from "react-native-paper";
import envData from "../../data/env";
import { Formik, Field } from "formik";
import { string, object, number, date } from "yup";
import valid from "card-validator";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51H5XkyCDvfrPMmRKTzJR6lhsYHm6bUyjWqh9YVxA8dYkhAxRR2QqVUdaCuWAF0tPDaQNCoZRmSHI7jTnUODDcXUN00rXrCxG5M", // Your key
  androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
});

function StripeForm() {
  //
  //
  //
  //
  //
  //
  //some code to get cart courses
  //
  //
  //
  //
  //
  //

  const charge = async () => {
    console.log("run");

    const params = {
      // mandatory
      number: "4242424242424242",
      expMonth: 11,
      expYear: 24,
      cvc: "223",
      // optional
      name: "hihi",
      currency: "hkd",
    };

    const token: any = await Stripe.createTokenWithCardAsync(params);

    console.log(token);

    const stripeToken = token.tokenId;

    let queryRoute: string = "/payment/charge";

    const fetchRes = await fetch(
      `${envData.REACT_APP_BACKEND_URL}${queryRoute}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stripeToken: stripeToken, chargeAmount: 101 }),
      }
    );

    const result = await fetchRes.json();

    console.log(result.message); //should be success
  };

  //yup schema
  let schema = object().shape({
    email: string().email(),
    cardNum: string()
      .test(
        "test-number", // this is used internally by yup
        "無效信用卡", //validation message
        (value: any) => {
          console.log(valid.number(value).isValid);
          return;
        }
      ) // return true false based on validation
      .max(16)
      .required(),
    cvc: string()
      .test("cvc", "無效cvc", (value: any) => {
        //console.log(valid.cvv(value).isValid);
        return valid.cvv(value).isValid;
      })
      .max(3)
      .required(),
  });

  return (
    <View
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Stripe</Text>

      <Formik
        initialValues={{ email: "", cardNum: "", expDate: "", cvc: "" }}
        onSubmit={(values) => Alert.alert(JSON.stringify(values))}
        //validationSchema={schema}
      >
        {({ handleChange, handleBlur, isValid, handleSubmit, values }) => (
          <View>
            <Text>電郵</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={{ backgroundColor: "green", width: 300 }}
            />
            <Text>信用卡號碼</Text>
            <TextInput
              onChangeText={handleChange("cardNum")}
              onBlur={handleBlur("cardNum")}
              value={values.cardNum}
              maxLength={16}
              style={{ backgroundColor: "yellow", width: 300 }}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text>過期日期</Text>
              <TextInput
                onChangeText={handleChange("expDate")}
                onBlur={handleBlur("expDate")}
                value={values.expDate}
                style={{ backgroundColor: "red", width: 100 }}
              />
              <Text>cvc</Text>
              <TextInput
                onChangeText={handleChange("cvc")}
                onBlur={handleBlur("cvc")}
                value={values.cvc}
                maxLength={3}
                style={{ backgroundColor: "orange", width: 100 }}
              />
            </View>
            <Button onPress={handleSubmit} title="提交" />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default StripeForm;
