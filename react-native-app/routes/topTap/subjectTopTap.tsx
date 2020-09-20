import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MainSubject from '../../screens/bottomTap/subjectStack/mainSubject';
import ScienceSubject from '../../screens/bottomTap/subjectStack/scienceSubject';
import BusinessSubject from '../../screens/bottomTap/subjectStack/businessSubject';
import LinguisticSubject from '../../screens/bottomTap/subjectStack/linguisticSubject';
import OtherSubject from '../../screens/bottomTap/subjectStack/otherSubject';

const Tab = createMaterialTopTabNavigator();

export default function SubjectTopTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MainSubject"
                component={MainSubject}
                options={{
                    title: "主科"
                }}
            />
            <Tab.Screen
                name="ScienceSubject"
                component={ScienceSubject}
                options={{
                    title: "理科"
                }}
            />
            <Tab.Screen
                name="BusinessSubject"
                component={BusinessSubject}
                options={{
                    title: "商科"
                }}
            />
            <Tab.Screen
                name="LinguisticSubject"
                component={LinguisticSubject}
                options={{
                    title: "文科"
                }}
            />
            <Tab.Screen
                name="OtherSubject"
                component={OtherSubject}
                options={{
                    title: "其他"
                }}
            />
        </Tab.Navigator>
    );
}
