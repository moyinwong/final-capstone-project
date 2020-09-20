import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Routes
import SubjectTopTap from '../topTap/subjectTopTap';

// Screens
import Course from '../../screens/bottomTap/commonScreens/course';
import Lesson from '../../screens/bottomTap/commonScreens/lesson';
import Quiz from '../../screens/bottomTap/commonScreens/quiz';

// Functions
import stackTransition from '../../functions/stackTransition';

export default function SubjectStack(props: { navigation: { toggleDrawer: () => void; }; }) {
    const Stack = createStackNavigator();

    function toggleDrawerClick(): void {
        props.navigation.toggleDrawer();
    }

    return (
        <Stack.Navigator
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
                name="Subject"
                children={SubjectTopTap}
                options={{
                    title: '科目',
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
                name="Lesson"
                component={Lesson}
                options={{
                    title: '課堂',
                    ...stackTransition
                }}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={{
                    title: '測驗',
                    ...stackTransition
                }}
            />
        </Stack.Navigator>
    )
}
