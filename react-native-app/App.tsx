import React from 'react';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native'

// Routes
import LeftDrawer from './routes/drawer/leftDrawer';

// Screens
import Login from './screens/login/login';

// Dummy Variable
const isSignIn = true;

export default function App() {
  // Before rendering any navigation stack
  enableScreens();

  return (
    isSignIn ? (
      <NavigationContainer>
        {LeftDrawer()}
      </NavigationContainer>
    ) : (
        <Login />
      )
  );
}
