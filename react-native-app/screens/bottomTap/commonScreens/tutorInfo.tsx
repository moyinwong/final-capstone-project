// React, React Native
import React from 'react';
import { View, Text, Image } from 'react-native';

// Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

// Styles
import globalStyles from '../../../styles/globalStyles';
import tutorIntroStyles from '../../../styles/tutorStyles';

// Interfaces
import ITutor from '../../../Interfaces/ITutor';

export default function TutorInfo() {

    // Hooks
    const navigation = useNavigation();
    const route = useRoute();

    // Param
    let tutor: ITutor = {
        name: null,
        pic: null,
        title: null,
        team: null,
        description: null,
        numSubscribed: null,
        id: null
    }

    if (route.params) {
        tutor = route.params.tutor;
    }

    return (
        <View style={globalStyles.container}>

            <View style={tutorIntroStyles.tutorBox}>
                <View style={tutorIntroStyles.tutorPicContainer}>
                    <Image
                        style={tutorIntroStyles.tutorPic}
                        resizeMode='cover'
                        source={tutor.pic}
                    />
                </View>
                <View style={tutorIntroStyles.tutorInfoContainer}>
                    <Text style={tutorIntroStyles.tutorName}>{tutor.name}</Text>
                    <Text style={tutorIntroStyles.tutorInfo}>{tutor.title}</Text>
                    <Text style={tutorIntroStyles.tutorInfo}>{tutor.team}</Text>
                    <Text style={tutorIntroStyles.tutorInfo}>{tutor.description}</Text>
                    <Text style={tutorIntroStyles.tutorNumSubscribed}>{'訂閱數: ' + tutor.numSubscribed}</Text>
                </View>
            </View>

        </View>
    )
}
