// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";

// Styles
import globalStyles from '../../../../styles/globalStyles';
import tutorialStyles from '../../../../styles/tutorialStyles';

export default function Tutorial(this: any, props: { navigation: { goBack: () => void; }; }) {

    // Hooks
    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("您已完成課堂");
        }
    }, []);

    const isFocused = useIsFocused();

    return (
        <View style={globalStyles.container}>
            {isFocused ? (
                <View style={tutorialStyles.videoContainer}>
                    <YoutubePlayer
                        height={1080}
                        videoId={"k8KZ3cSbKC8"}
                        onChangeState={onStateChange}

                        allowWebViewZoom={true}
                    />
                </View>
            ) : (
                    <Text>影片</Text>
                )
            }

        </View >
    )
}
