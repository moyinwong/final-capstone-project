// React, React Native
import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Routes
import LessonTopTap from '../topTap/lessonTopTap';

// Screens
import Cart from '../../screens/bottomTap/cartStack/cart';
import TutorInfo from '../../screens/bottomTap/commonScreens/tutorInfo';
import CoursesList from '../../screens/bottomTap/commonScreens/coursesList';
import Course from '../../screens/bottomTap/commonScreens/course';

// Functions
import stackTransition from '../../functions/stackTransition';

export default function CartStack(props: { navigation: { toggleDrawer: () => void; }; }) {
    const Stack = createStackNavigator();

    function toggleDrawerClick(): void {
        props.navigation.toggleDrawer();
    }

    return (
        <Stack.Navigator
            initialRouteName="Cart"
            headerMode="float"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#5b96f7"
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerLeft: (props) => (
                    <FontAwesome name="navicon" color={props.tintColor} size={24}
                        onPress={() => {
                            toggleDrawerClick();
                        }}
                    />
                ),
                headerLeftContainerStyle: {
                    marginLeft: 18
                }
            }}
        >
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    title: '購物車',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="CoursesList"
                component={CoursesList}
                options={{
                    title: '課程列表',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="Course"
                component={Course}
                options={{
                    title: '課程',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="Tutor"
                component={TutorInfo}
                options={{
                    title: '導師',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="Lesson"
                children={LessonTopTap}
                options={{
                    title: '課堂',
                    ...stackTransition
                }}
            />
        </Stack.Navigator>
    )
}