import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Icons
import { FontAwesome, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

// Routes
import HomeStack from './homeStack';
import SubjectStack from './subjectStack';
import TutorStack from './tutorStack';
import MyCoursesStack from './myCoursesStack';

export default function BottomTap() {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            activeColor="#5b96f7"
            inactiveColor="#9da0a8"
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
                    ),
                }}
            />
            <Tab.Screen
                name="Subject"
                children={SubjectStack}
                options={{
                    tabBarLabel: '科目',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="subject" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tutor"
                children={TutorStack}
                options={{
                    tabBarLabel: '導師',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="team" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyCourse"
                children={MyCoursesStack}
                options={{
                    tabBarLabel: '我的課程',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-school" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator >
    )
}
