// React, React Native
import React from "react";
import { enableScreens } from "react-native-screens";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import OverallStack from './routes/overallStack';

// Contexts
import UserContextProvider from "./contexts/userContext";
import CartContextProvider from "./contexts/cartContext";
import LessonContextProvider from "./contexts/lessonContext";

export default function App() {
  // Before rendering any navigation stack
  enableScreens();

  return (
    <UserContextProvider>
      <CartContextProvider>
        <LessonContextProvider>
          <NavigationContainer>{OverallStack()}</NavigationContainer>
        </LessonContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}
