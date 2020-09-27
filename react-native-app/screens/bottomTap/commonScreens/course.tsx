// React, React Native
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Stars from '../../../sharedComponents/stars';

// Styles
import globalStyles from '../../../styles/globalStyles';
import courseStyles from '../../../styles/courseStyles';

// Interfaces
import ICourse from '../../../Interfaces/ICourse';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';

export default function Courses() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // State
    const [coursesListData, setCoursesListData] = useState(

    );

    // Param
    let course: ICourse = {
        title: null,
        description: null,
        tutor: null,
        numOfLessons: null,
        price: null,
        aveScore: null,
        numOfStudents: null,
        isPurchased: null,
        coursePic: null,
        tutorPic: null,
        id: null
    }

    if (route.params) {
        course = route.params.course;
    }

    // Dummy Data
    const isSubscribed = false;

    return (
        <View style={globalStyles.container}>

            <View
                style={courseStyles.courseBox}
            >
                <View style={courseStyles.coursePicContainer}>
                    <Image
                        style={courseStyles.coursePic}
                        resizeMode='cover'
                        source={course.coursePic}
                    />
                </View>
                <View style={courseStyles.courseInfoContainer}>
                    <Text style={courseStyles.courseTitle}>{course.title}</Text>
                    <Text style={courseStyles.courseInfoText}>{course.description}</Text>
                    <Text style={courseStyles.courseInfoText}>{'學生人數: ' + course.numOfStudents}</Text>

                    <View style={courseStyles.courseScoreContainer}>
                        <Text style={courseStyles.courseInfoText}>{"評分: "}</Text>

                        <Stars score={course.aveScore} />

                    </View>
                </View>
            </View>

            <View style={courseStyles.tutorBox}>
                <View style={courseStyles.tutorPicContainer}>
                    <Image
                        style={courseStyles.tutorPic}
                        resizeMode='cover'
                        source={course.tutorPic}
                    />
                </View>
                <View>
                    <Text style={courseStyles.tutorName}>{course.tutor}</Text>
                    <View style={courseStyles.tutorSubscribedBox}>
                        <Text style={courseStyles.tutorNumOfSubscribedText}>訂閱數: 100</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 40 }}>
                    {isSubscribed ? (
                        <View style={courseStyles.tutorSubscribedBox}>
                            <MaterialIcons name="done" size={26} color="#22c736" />
                            <Text style={courseStyles.tutorSubscribedText}>已訂閱</Text>
                        </View>
                    ) : (
                            <TouchableOpacity
                                style={courseStyles.tutorSubscribeButton}
                                onPress={() => showSubscribeBox()}
                            >
                                <Text style={courseStyles.tutorSubscribeButtonText}>訂閱</Text>
                            </TouchableOpacity>
                        )}
                </View>
            </View>

            <View>
                <Text>{'課程簡介: ' + course.description}</Text>
            </View>

            <View>
                <Text>課程內容:</Text>
            </View>

            <View>
                <Text>學生反映:</Text>
            </View>

        </View>
    )
}
