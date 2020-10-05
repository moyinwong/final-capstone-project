// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorsStyles from '../../../styles/tutorsStyles';

// Data
import envData from '../../../data/env';

export default function TutorsList() {

    // Hooks
    const navigation = useNavigation();

    // State
    const [tutorsList, setTutorsList] = useState(
        []
    );

    // Fetch
    async function getTutorsList(category: string) {
        try {
            let queryRoute: string = "/course/tutor/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${category}`
            );

            const result = await fetchRes.json();
            setTutorsList(result.tutors);
        } catch (err) {
            console.log(err);
        }
    }

    const category = "all";
    useFocusEffect(
        useCallback(() => {
            getTutorsList(category);
        }, [category])
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                numColumns={2}
                style={tutorsStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsList}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.tutorsFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tutorsStyles.tutorBox}
                        onPress={() => navigation.navigate('TutorInfo', {
                            tutor: item.email
                        })}
                        onLongPress={() => showSubscribeBox()}
                    >
                        <View style={tutorsStyles.tutorPicContainer}>
                            <Image
                                style={tutorsStyles.tutorPic}
                                resizeMode='cover'
                                source={{ uri: `${envData.REACT_APP_BACKEND_FILE_URL}/img/${item.image}` }}
                            />
                        </View>
                        <View style={tutorsStyles.tutorInfoContainer}>
                            <Text style={tutorsStyles.tutorName}>{item.name}</Text>
                            <Text style={tutorsStyles.tutorInfo}>{'總學生人數: ' + item.total_students_num}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
