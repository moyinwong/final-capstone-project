// Components
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import coursesListStyles from '../../../styles/coursesListStyles';

export default function CoursesList(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    interface ICoursesListParam {
        subject?: string | null
        tutor?: string | null
        user?: string | null
        completedCourse?: boolean | null
    }

    let coursesListParam: ICoursesListParam = {
        subject: null,
        tutor: null,
        user: null,
        completedCourse: null
    }

    if (route.params) {
        coursesListParam = route.params;
    }

    // State
    const [coursesListData, setCoursesListData] = useState(
        [
            {
                title: 'Express Server',
                description: '教你寫Server',
                tutor: 'Gordon Lau',
                numOfLessons: 8,
                aveScore: 4.6,
                pic: require('../../../assets/coursesPic/express.jpg'),
                id: '1'
            },
            {
                title: 'FireBase',
                description: '教你寫Server',
                tutor: 'Gordon Lau',
                numOfLessons: 6,
                aveScore: 4.5,
                pic: require('../../../assets/coursesPic/firebase.png'),
                id: '2'
            },
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Jason Lee',
                numOfLessons: 12,
                aveScore: 4.4,
                pic: require('../../../assets/coursesPic/flutter.png'),
                id: '3'
            },
            {
                title: 'JavaScript',
                description: '教你JS',
                tutor: 'Jason Lee',
                numOfLessons: 9,
                aveScore: 4.5,
                pic: require('../../../assets/coursesPic/javaScript.png'),
                id: '4'
            },
            {
                title: 'Jest',
                description: '教你寫Test',
                tutor: 'Jason Lee',
                numOfLessons: 3,
                aveScore: 4.0,
                pic: require('../../../assets/coursesPic/jest.png'),
                id: '5'
            },
            {
                title: 'Knex',
                description: '教你寫migration',
                tutor: 'Andrew Shek',
                numOfLessons: 2,
                aveScore: 4.2,
                pic: require('../../../assets/coursesPic/knex.png'),
                id: '6'
            },
            {
                title: 'Flutter',
                description: '教你寫App',
                tutor: 'Jason Lee',
                numOfLessons: 12,
                aveScore: 4.4,
                pic: require('../../../assets/coursesPic/flutter.png'),
                id: '7'
            },
            {
                title: 'Python',
                description: '教你寫Python',
                tutor: 'Dragon Lung',
                numOfLessons: 12,
                aveScore: 4.1,
                pic: require('../../../assets/coursesPic/python.png'),
                id: '8'
            },
            {
                title: 'React',
                description: '兩日學識React',
                tutor: 'Alex Lau',
                numOfLessons: 3,
                aveScore: 4.2,
                pic: require('../../../assets/coursesPic/react.png'),
                id: '9'
            },
            {
                title: 'React Native',
                description: '三日學識React Native',
                tutor: 'Alex Lau',
                numOfLessons: 5,
                aveScore: 4.5,
                pic: require('../../../assets/coursesPic/reactNative.png'),
                id: '10'
            },
            {
                title: 'TensorFlow',
                description: '三日學識AI',
                tutor: 'Beeno Tung',
                numOfLessons: 12,
                aveScore: 4.8,
                pic: require('../../../assets/coursesPic/tensorFlow.png'),
                id: '11'
            },
            {
                title: 'TypeScript',
                description: '三日學識Type Script',
                tutor: 'Gordon Lau',
                numOfLessons: 3,
                aveScore: 4.6,
                pic: require('../../../assets/coursesPic/typeScript.jpg'),
                id: '12'
            }
        ]
    );

    return (
        <View style={globalStyles.container}>

            <View>
                {coursesListParam.subject ?
                    (
                        <Text>所有<Text style={coursesListStyles.paramTitle}>{coursesListParam.subject}</Text>課程</Text>
                    )
                    : (
                        <Text><Text style={coursesListStyles.paramTitle}>{coursesListParam.tutor}</Text>的課程</Text>
                    )}
            </View>

            <FlatList
                style={coursesListStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={coursesListStyles.tutorBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                    >
                        <View style={coursesListStyles.tutorPicContainer}>
                            <Image
                                style={coursesListStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={coursesListStyles.tutorInfoContainer}>
                            <Text style={coursesListStyles.tutorName}>{item.title}</Text>
                            <Text style={coursesListStyles.tutorName}>{item.description}</Text>
                            <Text style={coursesListStyles.tutorName}>{item.tutor}</Text>
                            <Text style={coursesListStyles.tutorName}>{"總共堂數: " + item.numOfLessons}</Text>
                            <Text style={coursesListStyles.tutorName}>{item.aveScore}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
