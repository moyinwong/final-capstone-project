// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Icons
import { MaterialIcons } from '@expo/vector-icons';

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

    // Hooks
    const navigation = useNavigation();

    // State
    const [popularCoursesListData, setPopularCoursesListData] = useState(
        []
    );
    const [goodCoursesListData, setGoodCoursesListData] = useState(
        []
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
            style={{ ...globalStyles.container, paddingTop: 12, paddingHorizontal: 0 }}
            showsVerticalScrollIndicator={false}
        >

            <HomeCategories />

            {/* 熱門課程 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>熱門課程</Text>
            </View>

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

                            <Text style={homeStyles.courseTitle}>{item.course_name}</Text>
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

            {/* 熱門課程 */}
            <View style={homeStyles.titleContainer}>
                <Text style={homeStyles.screenTitle}>最受好評課程</Text>
            </View>

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

                            <Text style={homeStyles.courseTitle}>{item.course_name}</Text>
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

            <View style={globalStyles.homeVerticalFooter}>
            </View>

        </ScrollView>
    )
}
