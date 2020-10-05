// React, React Native
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Routes
import LessonTopTap from '../topTap/lessonTopTap';

// Screens
import MyCoursesList from '../../screens/bottomTap/myCoursesStack/MyCoursesList';
import TutorInfo from '../../screens/bottomTap/commonScreens/tutorInfo';
import CoursesList from '../../screens/bottomTap/commonScreens/coursesList';
import Course from '../../screens/bottomTap/commonScreens/course';
import StripeForm from "../../screens/bottomTap/commonScreens/StripeForm";

// Functions
import stackTransition from '../../functions/stackTransition';

export default function TutorStack(props: { navigation: { toggleDrawer: () => void; }; }) {
    const Stack = createStackNavigator();

    function toggleDrawerClick(): void {
        props.navigation.toggleDrawer();
    }

    return (
        <Stack.Navigator
            initialRouteName="MyCourses"
            headerMode="float"
            screenOptions={{
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
                headerBackground: () => (
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
                        style={{ height: '100%', width: '100%' }}
                    >
                    </LinearGradient>
                ),
                headerLeftContainerStyle: {
                    marginLeft: 18
                }
            }}
        >
            <Stack.Screen
                name="MyCourses"
                component={MyCoursesList}
                options={{
                    title: '我的課程',
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
            <Stack.Screen
                name="StripeForm"
                children={StripeForm}
                options={{
                    title: "信用卡資料",
                    ...stackTransition,
                }}
            />
        </Stack.Navigator>
    )
}
