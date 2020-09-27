// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Functions
import showSubscribeBox from '../../../functions/showSubscribeBox';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorsStyles from '../../../styles/tutorsStyles';

// Data
import tutorsTestData from '../../../data/tutorsTestData';

export default function TutorsList() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Params
    let category = 'all';
    if (route.params) {
        category = route.params.category;
    }

    // State
    const [tutorsData, setTutorsData] = useState(
        tutorsTestData(category)
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                numColumns={2}
                style={tutorsStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsData}
                showsVerticalScrollIndicator={false}

                ListFooterComponent={
                    <View style={globalStyles.tutorsFooter}>
                    </View>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tutorsStyles.tutorBox}
                        onPress={() => navigation.navigate('TutorInfo', { tutor: item })}
                        onLongPress={() => showSubscribeBox()}
                    >
                        <View style={tutorsStyles.tutorPicContainer}>
                            <Image
                                style={tutorsStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={tutorsStyles.tutorInfoContainer}>
                            <Text style={tutorsStyles.tutorName}>{item.name}</Text>
                            <Text style={tutorsStyles.tutorInfo}>{'訂閱數: ' + item.numSubscribed}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
