// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import Stars from '../../../sharedComponents/stars';

// Functions
import showModal from '../../../functions/showModal';
import showSubscribeBox from '../../../functions/showSubscribeBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import homeStyles from '../../../styles/homeStyles';

// Data
import subjectsData from '../../../data/subjectsData';
import tutorsTestData from '../../../data/tutorsTestData';
import coursesTestData from '../../../data/coursesTestData';

export default function Home(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    // State
    const subjects = subjectsData('all');
    const [mainSubjectsData, setMainSubjectsData] = useState([
        subjects[0], subjects[1], subjects[10], subjects[4], subjects[3], subjects[18]
    ]);

    const [coursesListData, setCoursesListData] = useState(
        coursesTestData('inProgress')
    );

    const [tutorsData, setTutorsData] = useState(
        tutorsTestData('all')
    );

    const [myCoursesListData, setMyCoursesListData] = useState(
        coursesTestData('completed')
    );

    return (
        <ScrollView
            style={{ ...globalStyles.container, paddingTop: 12, paddingHorizontal: 0 }}
            showsVerticalScrollIndicator={false}
        >

            {/* 熱門科目 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>熱門科目</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={mainSubjectsData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.subjectBox}
                        onPress={() => navigation.navigate('CoursesList', { subject: item.title })}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            // colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 0.4)']}
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)']}
                            style={homeStyles.linearGradient}
                        >
                        </LinearGradient>
                        <Image
                            style={homeStyles.subjectPic}
                            resizeMode='cover'
                            source={item.pic}
                        />
                        <Text style={homeStyles.subjectTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* 熱門課程 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>熱門課程</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={coursesListData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.courseBox}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                        onLongPress={() => showModal(item.isPurchased)}
                    >
                        <View style={homeStyles.coursePicContainer}>
                            <Image
                                style={homeStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={homeStyles.courseInfoContainer}>

                            <Text style={homeStyles.courseTitle}>{item.title}</Text>
                            <View style={homeStyles.courseSubInfoContainer}>
                                <Text style={homeStyles.courseInfoText}>{item.tutor}</Text>
                                <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                                <View style={homeStyles.courseScoreContainer}>
                                    <Text style={homeStyles.courseInfoText}>{"評分: "}</Text>

                                    <Stars score={item.aveScore} />

                                </View>
                                {item.isPurchased ?
                                    (
                                        <Text style={{ ...homeStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                    ) : (
                                        <Text style={homeStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                    )}
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 最受歡迎導師 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>最受歡迎導師</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={homeStyles.tutorBox}
                        onPress={() => navigation.navigate('Tutor', { tutor: item })}
                        onLongPress={() => showSubscribeBox()}
                    >
                        <View style={homeStyles.tutorPicContainer}>
                            <Image
                                style={homeStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={homeStyles.tutorInfoContainer}>
                            <Text style={homeStyles.tutorName}>{item.name}</Text>
                            <Text style={homeStyles.tutorInfo}>{'訂閱數: ' + item.numSubscribed}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 我的課程 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>我的課程</Text>
            </View>

            <FlatList
                style={homeStyles.flatList}
                keyExtractor={(item) => item.id}
                data={myCoursesListData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.homeHorizontalFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ ...homeStyles.courseBox, height: 240 }}
                        onPress={() => navigation.navigate('Course', { title: item.title })}
                        onLongPress={() => showModal(true)}
                    >
                        <View style={homeStyles.coursePicContainer}>
                            <Image
                                style={homeStyles.coursePic}
                                resizeMode='cover'
                                source={item.coursePic}
                            />
                        </View>
                        <View style={homeStyles.courseInfoContainer}>

                            <Text style={homeStyles.courseTitle}>{item.title}</Text>
                            <View style={homeStyles.courseSubInfoContainer}>
                                <Text style={homeStyles.courseInfoText}>{item.tutor}</Text>
                                <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.numOfLessons}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />

            <View style={globalStyles.homeVerticalFooter}>
            </View>

        </ScrollView>
    )
}
