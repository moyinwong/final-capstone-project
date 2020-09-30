// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

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

    // State
    const [tutorsData, setTutorsData] = useState(
        tutorsTestData('all')
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
                        onPress={() => navigation.navigate('TutorInfo',
                            { tutor: item }
                        )}
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
