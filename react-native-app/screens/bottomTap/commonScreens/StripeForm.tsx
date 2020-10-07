// React, React Native
import React, { useContext, useState } from "react";
import { Text, TextInput, View, Pressable, ActivityIndicator, TouchableOpacity, Keyboard, Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

// Stripe
import { PaymentsStripe as Stripe } from "expo-payments-stripe";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Form
import { Formik } from "formik";
import * as yup from "yup";
import valid from "card-validator";

// Context
import { UserContext } from "../../../contexts/userContext";
import { CartContext } from "../../../contexts/cartContext";

// Data
import envData from "../../../data/env";

// Styles
import stripeFormStyles from '../../../styles/stripeFormStyles';

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

export default function StripeForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [displayMessage, setDisplayMessage] = useState<string>("");
  // Context
  const { user } = useContext(UserContext);
  const cartCourses: any = useContext(CartContext);
  const navigation = useNavigation();

  //console.log(user);

  const userEmail = user.email;

  //console.log(cartCourses.cartList);

  let totalPrice = 0;

  for (let course of cartCourses.cartList) {
    totalPrice += Math.round(parseFloat(course.price), 2);
  }

  //console.log(totalPrice);

  const charge = async (cardInfo: CardInfo) => {
    // setIsLoading(true);
    // console.log(`isLoading: ${isLoading} should be true`);
    console.log("run");

    // Testing
    navigation.navigate('PaymentLoading');

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

    //console.log(token);

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
          userEmail,
          stripeToken: stripeToken,
          chargeAmount: totalPrice,
          cartCourses: cartCourses.cartList,
        }),
      }
    );

    const result = await fetchRes.json();

    console.log("result: ", result.message); //should be success

    setIsLoading(false);
    console.log(`isLoading: ${isLoading} should be false`);

    if (result.message === "success") {
      // setDisplayMessage("已成功付款");
      // setIsDone(true);
      // console.log(`isDone: ${isDone} should be true`);

      cartCourses.setCartList([]);
      cartCourses.setCartSum(0);
      cartCourses.setCartNum(0);
      cartCourses.storeCartList([]);
      cartCourses.storeCartSum(0);

      // Testing
      navigation.navigate('PaymentSuccess');
    } else {
      // setDisplayMessage("伺服器錯誤");
      // setIsDone(true);
      // console.log(`isDone: ${isDone} should be true`);

      navigation.navigate('PaymentFail');
    }

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
    <Pressable
      style={stripeFormStyles.wholeScreen}
      onPress={Keyboard.dismiss}
    >

      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
        style={stripeFormStyles.linearGradient}
      >
      </LinearGradient>

      {/* {isLoading && (
        <View
          style={{
            backgroundColor: "#00ffbb",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100000,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {isDone && (
        <View
          style={{
            backgroundColor: "#00ffbb",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100000,
          }}
        >
          <Text>{displayMessage}</Text>
        </View>
      )} */}

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
            <View style={stripeFormStyles.form}>
              <Text style={stripeFormStyles.text}>電郵</Text>
              <View style={stripeFormStyles.inputLine}>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={stripeFormStyles.input}
                />
              </View>
              {touched.email && errors.email && (
                <View>
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                </View>
              )}
              <Text style={stripeFormStyles.text}>持卡人姓名</Text>
              <View style={stripeFormStyles.inputLine}>
                <TextInput
                  onChangeText={handleChange("cardHolderName")}
                  onBlur={handleBlur("cardHolderName")}
                  value={values.cardHolderName}
                  style={stripeFormStyles.input}
                />
              </View>

              {touched.cardHolderName && errors.cardHolderName && (
                <View>
                  <Text style={{ color: "red" }}>{errors.cardHolderName}</Text>
                </View>
              )}
              <Text style={stripeFormStyles.text}>信用卡號碼</Text>
              <View style={stripeFormStyles.inputLine}>
                <TextInput
                  onChangeText={handleChange("cardNum")}
                  onBlur={handleBlur("cardNum")}
                  value={values.cardNum}
                  maxLength={16}
                  style={stripeFormStyles.input}
                  keyboardType='numeric'
                />
              </View>

              {touched.cardNum && errors.cardNum && (
                <View>
                  <Text style={{ color: "red" }}>{errors.cardNum}</Text>
                </View>
              )}

              <Text style={stripeFormStyles.text}>過期日期</Text>

              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={stripeFormStyles.inputLine}>
                  <TextInput
                    onChangeText={handleChange("expMonth")}
                    onBlur={handleBlur("expMonth")}
                    value={values.expMonth}
                    style={{ ...stripeFormStyles.input, width: 60 }}
                    maxLength={2}
                    keyboardType='numeric'
                  />
                </View>

                {touched.expMonth && errors.expMonth && (
                  <View>
                    <Text style={{ color: "red" }}>{errors.expMonth}</Text>
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
                  <Text style={stripeFormStyles.text}>/</Text>
                </View>
                <View style={stripeFormStyles.inputLine}>
                  <TextInput
                    onChangeText={handleChange("expYear")}
                    onBlur={handleBlur("expYear")}
                    value={values.expYear}
                    style={{ ...stripeFormStyles.input, width: 60 }}
                    maxLength={2}
                    keyboardType='numeric'
                  />
                </View>

                {touched.expYear && errors.expYear && (
                  <View>
                    <Text style={{ color: "red" }}>{errors.expYear}</Text>
                  </View>
                )}
              </View>
              <Text style={stripeFormStyles.text}>CVC</Text>
              <View style={stripeFormStyles.inputLine}>
                <TextInput
                  onChangeText={handleChange("cvc")}
                  onBlur={handleBlur("cvc")}
                  value={values.cvc}
                  maxLength={3}
                  style={stripeFormStyles.input}
                  keyboardType='numeric'
                />
              </View>

              {touched.cvc && errors.cvc && (
                <View>
                  <Text style={{ color: "red" }}>{errors.cvc}</Text>
                </View>
              )}
              <TouchableOpacity
                style={stripeFormStyles.button}
                onPress={handleSubmit}
              >
                <Text style={stripeFormStyles.buttonText}>提交</Text>
              </TouchableOpacity>
            </View>
          )}
      </Formik>
    </Pressable>
  );
};
