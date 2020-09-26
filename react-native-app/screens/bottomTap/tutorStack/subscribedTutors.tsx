// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorsStyles from '../../../styles/tutorsStyles';

export default function SubscribedTutors(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    // Hooks
    const navigation = useNavigation();

    // State
    const [tutorsData, setTutorsData] = useState(
        [
            {
                name: 'Alex Lau',
                pic: require('../../../assets/tutorsPic/alex.jpeg'),
                id: '1'
            },
            {
                name: 'Gordon Lau',
                pic: require('../../../assets/tutorsPic/gordon.jpg'),
                id: '2'
            },
            {
                name: 'Jason Lee',
                pic: require('../../../assets/tutorsPic/jason.jpg'),
                id: '3'
            },
            {
                name: 'Andrew Shek',
                pic: require('../../../assets/tutorsPic/andrew.jpg'),
                id: '4'
            }
        ]
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
                        onPress={() => navigation.navigate('CoursesList', { tutor: item.name })}
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
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
