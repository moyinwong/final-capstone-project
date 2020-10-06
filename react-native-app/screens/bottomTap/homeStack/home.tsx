// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';

// Context
import { UserContext } from '../../../contexts/userContext';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Icons
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Components
import HomeCategories from '../../../sharedComponents/homeCategories';
import Stars from '../../../sharedComponents/stars';

// Functions
import showModal from '../../../functions/showModal';

// Styles
import globalStyles from '../../../styles/globalStyles';
import homeStyles from '../../../styles/homeStyles';

// Data
import envData from '../../../data/env';

export default function Home() {

    // Context
    const { user } = useContext(UserContext);

    // Hooks
    const navigation = useNavigation();

    // State
    const [popularCoursesListData, setPopularCoursesListData] = useState(
        []
    );
    const [goodCoursesListData, setGoodCoursesListData] = useState(
        []
    );
    // Render Popular Courses
    const [renderPopCourses, setRenderPopCourses] = useState(
        true
    );

    // Fetch
    async function getCourses(queryRoute: string, categoryName: string) {
        try {
            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${categoryName}`
            );

            const result = await fetchRes.json();
            if (categoryName == "popular") {
                setPopularCoursesListData(result.courses);
            } else {
                setGoodCoursesListData(result.courses);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const queryRoute = '/course/'
    useFocusEffect(
        useCallback(() => {
            getCourses(queryRoute, "popular");
            getCourses(queryRoute, "good-comment");
        }, [queryRoute])
    );

    return (
        <ScrollView
            style={{ ...globalStyles.container, paddingHorizontal: 0 }}
            showsVerticalScrollIndicator={false}
        >

            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['rgba(119, 251, 176, 1)', 'rgba(166, 241, 141, 1)']}
                style={homeStyles.linearGradient}
            >
            </LinearGradient>

            {user.email != null &&
                (<Text style={homeStyles.welcomeText}>{'歡迎, ' + user.email.split('@')[0]}</Text>)
            }

            <Formik
                initialValues={{ searchText: '' }}
                onSubmit={(value) => {
                    let tempValue = value.searchText;
                    value.searchText = '';
                    navigation.navigate('CoursesList',
                        { searchFor: tempValue }
                    )
                }}
            >
                {(props) => (
                    <View style={homeStyles.searchBox}>
                        <TextInput
                            style={homeStyles.searchText}
                            placeholder='搜尋'
                            onChangeText={props.handleChange('searchText')}
                            value={props.values.searchText}
                        />
                        <Pressable
                            style={homeStyles.searchButton}
                            onPress={props.handleSubmit}
                        >
                            <AntDesign name="search1" size={24} color="#999999" />
                        </Pressable>
                    </View>
                )}

            </Formik>

            <HomeCategories />

            <View style={homeStyles.titleContainer}>
                <Pressable
                    style={homeStyles.titleButton}
                    onPress={() => setRenderPopCourses(true)}
                >
                    <Text
                        style={renderPopCourses ? (homeStyles.screenTitle) : (homeStyles.nonActiveScreenTitle)}
                    >熱門課程</Text>
                </Pressable>
                <Pressable
                    style={homeStyles.titleButton}
                    onPress={() => setRenderPopCourses(false)}
                >
                    <Text
                        style={!renderPopCourses ? (homeStyles.screenTitle) : (homeStyles.nonActiveScreenTitle)}
                    >最受好評課程</Text>
                </Pressable>
            </View>

            {renderPopCourses ? (
                <FlatList
                    style={homeStyles.flatList}
                    keyExtractor={(item) => item.id.toString()}
                    data={popularCoursesListData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                    ListFooterComponent={
                        <View style={globalStyles.homeHorizontalFooter}>
                        </View>
                    }

                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={homeStyles.courseBox}
                            onPress={() => navigation.navigate('Course',
                                { courseName: item.course_name }
                            )}
                            // ssssssssssssssssssss
                            onLongPress={() => showModal(false)}
                        >
                            <View style={homeStyles.coursePicContainer}>
                                <Image
                                    style={homeStyles.coursePic}
                                    resizeMode='cover'
                                    source={{ uri: item.image }}
                                />
                            </View>
                            <View style={homeStyles.courseInfoContainer}>

                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    style={homeStyles.courseTitle}
                                >{item.course_name}</Text>
                                <View style={homeStyles.courseSubInfoContainer}>
                                    <Text style={homeStyles.courseInfoText}>{item.tutor_name}</Text>
                                    <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.lessons_number}</Text>
                                    <View style={homeStyles.courseScoreContainer}>
                                        <Text style={homeStyles.courseInfoText}>{"評分: "}</Text>

                                        <Stars score={item.rated_score} />

                                        <Text style={{ ...homeStyles.courseInfoText, fontSize: 16 }}>{" (" + item.rated_num + ")"}</Text>
                                    </View>
                                    {/* sssdsfvdsvdsvdsbvsdbsdbsdbds */}
                                    {false ?
                                        (
                                            <View style={homeStyles.coursePriceContainer}>
                                                <MaterialIcons name="done" size={26} color="#22c736" />
                                                <Text style={{ ...homeStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                            </View>
                                        ) : (
                                            <View style={homeStyles.coursePriceContainer}>
                                                <Text style={homeStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                            </View>
                                        )}
                                </View>

                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                    <FlatList
                        style={homeStyles.flatList}
                        keyExtractor={(item) => item.id.toString()}
                        data={goodCoursesListData}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                        ListFooterComponent={
                            <View style={globalStyles.homeHorizontalFooter}>
                            </View>
                        }

                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={homeStyles.courseBox}
                                onPress={() => navigation.navigate('Course',
                                    { courseName: item.course_name }
                                )}
                                // ssssssssssssssssssss
                                onLongPress={() => showModal(false)}
                            >
                                <View style={homeStyles.coursePicContainer}>
                                    <Image
                                        style={homeStyles.coursePic}
                                        resizeMode='cover'
                                        source={{ uri: item.image }}
                                    />
                                </View>
                                <View style={homeStyles.courseInfoContainer}>

                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                        style={homeStyles.courseTitle}>{item.course_name}</Text>
                                    <View style={homeStyles.courseSubInfoContainer}>
                                        <Text style={homeStyles.courseInfoText}>{item.tutor_name}</Text>
                                        <Text style={homeStyles.courseInfoText}>{"總共堂數: " + item.lessons_number}</Text>
                                        <View style={homeStyles.courseScoreContainer}>
                                            <Text style={homeStyles.courseInfoText}>{"評分: "}</Text>

                                            <Stars score={item.rated_score} />

                                            <Text style={{ ...homeStyles.courseInfoText, fontSize: 16 }}>{" (" + item.rated_num + ")"}</Text>
                                        </View>
                                        {/* sssdsfvdsvdsvdsbvsdbsdbsdbds */}
                                        {false ?
                                            (
                                                <View style={homeStyles.coursePriceContainer}>
                                                    <MaterialIcons name="done" size={26} color="#22c736" />
                                                    <Text style={{ ...homeStyles.coursePrice, color: '#22c736' }}>{"已購買"}</Text>
                                                </View>
                                            ) : (
                                                <View style={homeStyles.coursePriceContainer}>
                                                    <Text style={homeStyles.coursePrice}>{"價錢: $" + item.price}</Text>
                                                </View>
                                            )}
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}

            <View style={globalStyles.homeVerticalFooter}>
            </View>

        </ScrollView>
    )
}
