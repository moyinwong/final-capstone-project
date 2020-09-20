import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Icons
import { FontAwesome, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

// Routes
import HomeStack from '../stacks/homeStack';
import SubjectStack from '../stacks/subjectStack';
import TutorStack from '../stacks/tutorStack';
import MyCoursesStack from '../stacks/myCoursesStack';

export default function BottomTap() {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f1964a"
            inactiveColor="#606060"
            barStyle={{
                backgroundColor: '#ffffff'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: '首頁',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="Subject"
                children={SubjectStack}
                options={{
                    tabBarLabel: '科目',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="subject" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="Tutor"
                children={TutorStack}
                options={{
                    tabBarLabel: '導師',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="team" color={color} size={24} />
                    )
                }}
            />
            <Tab.Screen
                name="MyCourse"
                children={MyCoursesStack}
                options={{
                    tabBarLabel: '我的課程',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-school" color={color} size={24} />
                    )
                }}
            />
        </Tab.Navigator >
    )
}
