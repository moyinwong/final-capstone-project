// React, React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorStyles from '../../../styles/tutorStyles';

export default function Tutor(props: { navigation: { navigate: (arg0: string) => void; }; }) {

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
            },
            {
                name: 'Dragon Lung',
                pic: require('../../../assets/tutorsPic/dragon.jpg'),
                id: '5'
            },
            {
                name: 'Beeno Tung',
                pic: require('../../../assets/tutorsPic/beeno.jpg'),
                id: '6'
            }
        ]
    );

    return (
        <View style={globalStyles.container}>

            <FlatList
                numColumns={2}
                style={tutorStyles.flatList}
                keyExtractor={(item) => item.id}
                data={tutorsData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tutorStyles.tutorBox}
                        onPress={() => navigation.navigate('CoursesList', { tutor: item.name })}
                    >
                        <View style={tutorStyles.tutorPicContainer}>
                            <Image
                                style={tutorStyles.tutorPic}
                                resizeMode='cover'
                                source={item.pic}
                            />
                        </View>
                        <View style={tutorStyles.tutorInfoContainer}>
                            <Text style={tutorStyles.tutorName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}
