// React, React Native
import React, { useState, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';

// Styles
import globalStyles from '../../../../styles/globalStyles';

export default function Tutorial(this: any, props: { navigation: { goBack: () => void; }; }) {

    // Hooks
    const [showVideo, setShowVideo] = useState(false);
    // const [playing, setPlaying] = useState(false);

    // const onStateChange = useCallback((state) => {
    //     if (state === "ended") {
    //         setPlaying(false);
    //         Alert.alert("您已完成課堂");
    //     }
    // }, []);

    const myUrl = 'https://youtu.be/oZCM4u7d_6U';

    return (
        <View style={globalStyles.container}>
            {showVideo ? (
                // <YoutubePlayer
                //     height={300}
                //     play={playing}
                //     videoId={"/k8KZ3cSbKC8"}
                //     onChangeState={onStateChange}
                // />

                // <WebView
                //     originWhitelist={['*']}
                //     source={{ uri: "https://www.youtube.com/embed/k8KZ3cSbKC8" }}
                //     javaScriptEnabled={true}
                //     domStorageEnabled={true}
                // />

                // <YouTube
                //     // apiKey='AIzaSyBDTPBWOEZXuWmrz1b3VBE-6nUJAWvfYGA'
                //     videoId='k8KZ3cSbKC8'
                //     play={true}
                //     fullscreen={true}
                //     loop={false}
                // />
                <Text>aaa</Text>
            ) : (
                    <Text>Video</Text>
                )
            }

            <TouchableOpacity
                onPress={() => setShowVideo(!showVideo)}
            >
                <Text>Start Lesson</Text>
            </TouchableOpacity>
        </View >
    )
}
