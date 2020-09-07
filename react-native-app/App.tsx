import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Screens
import Home from './screens/home';
import Tab1 from './screens/tab1';
import Tab2 from './screens/tab2';
import Course from './screens/course';
import Lesson from './screens/lesson';

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

export default function App() {

  const createCourseStack = () => {
    return (
      <Stack.Navigator initialRouteName="Course">
        <Stack.Screen name="Course" component={Course} />
        <Stack.Screen name="Lesson" component={Lesson} />
      </Stack.Navigator>
    )
  }

  const createBottomTap = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen name="Home" component={Home} />
        <MaterialBottomTabs.Screen name="Tab1" component={Tab1} />
        <MaterialBottomTabs.Screen name="Tab2" component={Tab2} />
        <MaterialBottomTabs.Screen name="CourseStack" children={createCourseStack} />
      </MaterialBottomTabs.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {createBottomTap()}
    </NavigationContainer>
  );
}
