// React, React Native
import React from "react";
import { enableScreens } from "react-native-screens";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import LeftDrawer from "./routes/drawer/leftDrawer";

// Screens
import Login from "./screens/login/login";

// Contexts
import CartContextProvider from "./contexts/cartContext";
import StripeForm from "./screens/stripe/StripeForm";

// Dummy Variable
const isSignIn = false;

export default function App() {
  // Before rendering any navigation stack
  enableScreens();

  return (
    <CartContextProvider>
      {isSignIn ? (
        <NavigationContainer>{LeftDrawer()}</NavigationContainer>
      ) : (
        <StripeForm />
        // <Login />
      )}
    </CartContextProvider>
  );
}
