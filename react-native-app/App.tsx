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
import UserContextProvider from "./contexts/userContext";
import CartContextProvider from "./contexts/cartContext";
import LessonContextProvider from "./contexts/lessonContext";

// Dummy Variable
const isSignIn = true;

export default function App() {
  // Before rendering any navigation stack
  enableScreens();

  return (
    <UserContextProvider>
      <CartContextProvider>
        <LessonContextProvider>
          {isSignIn ? (
            <NavigationContainer>{LeftDrawer()}</NavigationContainer>
          ) : (
              //<StripeForm />
              <Login />
            )}
        </LessonContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}
