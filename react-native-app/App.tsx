import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Feedback from './screens/leftDrawer/feedback';

import Home from './screens/bottomTap/home';
import Tab1 from './screens/bottomTap/tab1';
import Tab2 from './screens/bottomTap/tab2';

import Course from './screens/courseStack/course';
import Lesson from './screens/courseStack/lesson';

// Before rendering any navigation stack
enableScreens();

const Drawer = createDrawerNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function leftDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="bottomTap" children={bottomTap} />
      <Drawer.Screen name="feedback" component={Feedback} />
    </Drawer.Navigator>
  )
}

function bottomTap() {
  return (
    <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen name="Home" component={Home} />
      <MaterialBottomTabs.Screen name="Tab1" component={Tab1} />
      <MaterialBottomTabs.Screen name="Tab2" component={Tab2} />
      <MaterialBottomTabs.Screen name="CourseStack" children={courseStack} />
    </MaterialBottomTabs.Navigator>
  )
}

function courseStack() {
  return (
    <Stack.Navigator initialRouteName="Course">
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Lesson" component={Lesson} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      {leftDrawer()}
    </NavigationContainer>
  );
}
