import React, { useContext } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import envData from "../../../data/env";
import { Formik } from "formik";
import * as yup from "yup";
import valid from "card-validator";
import { CartContext } from "../../../contexts/cartContext";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51H5XkyCDvfrPMmRKTzJR6lhsYHm6bUyjWqh9YVxA8dYkhAxRR2QqVUdaCuWAF0tPDaQNCoZRmSHI7jTnUODDcXUN00rXrCxG5M", // Your key
  androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
});

interface CardInfo {
  email: string;
  cardHolderName: string;
  cardNum: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

const inputStyle = {
  borderBottomColor: "black",
  borderBottomWidth: 2,
  marginBottom: 10,
};

function StripeForm() {
  const cartCourses: any = useContext(CartContext);

  const cartCourses: any = useContext(CartContext);

  console.log(cartCourses.cartList);

  let totalPrice = 0;

  for (let course of cartCourses.cartList) {
    totalPrice += Math.round(parseFloat(course.price), 2);
  }

  console.log(totalPrice);

  const charge = async (cardInfo: CardInfo) => {
    console.log("run");

    const params = {
      // mandatory
      number: cardInfo.cardNum,
      expMonth: parseInt(cardInfo.expMonth),
      expYear: parseInt(cardInfo.expYear),
      cvc: cardInfo.cvc,
      // optional
      name: cardInfo.cardHolderName,
      currency: "hkd",
      email: cardInfo.email,
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
        body: JSON.stringify({
          stripeToken: stripeToken,
          chargeAmount: totalPrice,
          cartCourses: cartCourses.cartList,
        }),
      }
    );

    const result = await fetchRes.json();

    console.log(result.message); //should be success
  };

  //yup schema
  let schema = yup.object().shape({
    email: yup.string().email("請填寫正確電郵"),
    cardHolderName: yup
      .string()
      .test(
        "test-name", // this is used internally by yup
        "無效姓名", //validation message
        (value) => {
          //console.log(valid.number(value).isValid);
          return valid.cardholderName(value).isValid;
        }
      ) // return true false based on validation
      .required("必需填寫此項"),
    cardNum: yup
      .string()
      .test(
        "test-number", // this is used internally by yup
        "無效信用卡", //validation message
        (value) => {
          //console.log(valid.number(value).isValid);
          return valid.number(value).isValid;
        }
      ) // return true false based on validation
      .max(16)
      .required("必需填寫此項"),
    expMonth: yup
      .string()
      .test("test-expirymonth", "錯誤月份", (value: any) => {
        //console.log(valid.expirationMonth(value).isValid);
        return valid.expirationMonth(value).isValid;
      })
      .max(2)
      .required("必需填寫此項"),
    expYear: yup
      .string()
      .test("test-expiryyear", "錯誤年份", (value: any) => {
        //console.log(valid.expirationYear(value).isValid);
        return valid.expirationYear(value).isValid;
      })
      .max(2)
      .required("必需填寫此項"),
    cvc: yup
      .string()
      .test("cvc", "無效cvc", (value: any) => {
        //console.log(valid.cvv(value).isValid);
        return valid.cvv(value).isValid;
      })
      .max(3)
      .required("必需填寫此項"),
  });

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Stripe Form</Text>

      <Formik
        initialValues={{
          email: "",
          cardHolderName: "",
          cardNum: "",
          expMonth: "",
          expYear: "",
          cvc: "",
        }}
        onSubmit={(values) => charge(values)}
        validationSchema={schema}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          values,
        }) => (
          <View>
            <Text>電郵</Text>
            <View style={{ ...inputStyle }}>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={{
                  width: 300,
                }}
              />
            </View>
            {touched.email && errors.email && (
              <View>
                <Text>{errors.email}</Text>
              </View>
            )}
            <Text>持卡人姓名</Text>
            <View style={{ ...inputStyle }}>
              <TextInput
                onChangeText={handleChange("cardHolderName")}
                onBlur={handleBlur("cardHolderName")}
                value={values.cardHolderName}
                style={{ width: 300 }}
              />
            </View>

            {touched.cardHolderName && errors.cardHolderName && (
              <View>
                <Text>{errors.cardHolderName}</Text>
              </View>
            )}
            <Text>信用卡號碼</Text>
            <View style={{ ...inputStyle }}>
              <TextInput
                onChangeText={handleChange("cardNum")}
                onBlur={handleBlur("cardNum")}
                value={values.cardNum}
                maxLength={16}
                style={{ width: 300 }}
              />
            </View>

            {touched.cardNum && errors.cardNum && (
              <View>
                <Text>{errors.cardNum}</Text>
              </View>
            )}

            <Text>過期日期</Text>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ ...inputStyle }}>
                <TextInput
                  onChangeText={handleChange("expMonth")}
                  onBlur={handleBlur("expMonth")}
                  value={values.expMonth}
                  style={{ width: 50 }}
                  maxLength={2}
                />
              </View>

              {touched.expMonth && errors.expMonth && (
                <View>
                  <Text>{errors.expMonth}</Text>
                </View>
              )}
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              >
                <Text>/</Text>
              </View>
              <View style={{ ...inputStyle }}>
                <TextInput
                  onChangeText={handleChange("expYear")}
                  onBlur={handleBlur("expYear")}
                  value={values.expYear}
                  style={{ width: 50 }}
                  maxLength={2}
                />
              </View>

              {touched.expYear && errors.expYear && (
                <View>
                  <Text>{errors.expYear}</Text>
                </View>
              )}
            </View>
            <Text>CVC</Text>
            <View style={{ ...inputStyle }}>
              <TextInput
                onChangeText={handleChange("cvc")}
                onBlur={handleBlur("cvc")}
                value={values.cvc}
                maxLength={3}
                style={{ width: 100 }}
              />
            </View>

            {touched.cvc && errors.cvc && (
              <View>
                <Text>{errors.cvc}</Text>
              </View>
            )}
            <Button onPress={handleSubmit} title="提交" disabled={!isValid} />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default StripeForm;
