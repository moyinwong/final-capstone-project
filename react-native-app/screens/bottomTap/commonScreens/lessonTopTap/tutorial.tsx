// React, React Native
import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";

// Context
import { LessonContext } from '../../../../contexts/lessonContext';

// Navigation
import { useFocusEffect } from '@react-navigation/native';

// Styles
import globalStyles from '../../../../styles/globalStyles';
import tutorialStyles from '../../../../styles/tutorialStyles';

// Data
import envData from '../../../../data/env';

export default function Tutorial(this: any, props: { navigation: { goBack: () => void; }; }) {

    // Context
    const { lessonName } = useContext(LessonContext);

    // Hooks
    const isFocused = useIsFocused();
    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("您已完成課堂");
        }
    }, []);

    // Lesson Info
    // State
    const [lesson, setLesson] = useState(
        'lesson'
    );

    const [videoLink, setVideoLink] = useState(
        'link'
    );

    const [videoDescription, setVideoDescription] = useState(
        '簡介'
    );

    // Fetch
    async function getLessonsInfo(lesson: string) {
        try {
            if (lessonName) {
                setLesson(lessonName);
            }

            let queryRoute: string = "/lesson/info/";

            const fetchRes = await fetch(
                `${envData.REACT_APP_BACKEND_URL}${queryRoute}${lesson}`
            );

            const result = await fetchRes.json();
            let link = await (result.lessonInfo.video_url.split('youtu.be/')[1]);
            let descriptionText = await (result.lessonInfo.lesson_description.split(" ").join(""));
            setVideoLink(link);
            setVideoDescription(descriptionText);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLessonsInfo(lesson);
        }, [lesson])
    );

    return (
        <View style={globalStyles.container}>
            {isFocused ? (
                <View style={tutorialStyles.videoContainer}>
                    <YoutubePlayer
                        height={1080}
                        videoId={videoLink}
                        onChangeState={onStateChange}
                        allowWebViewZoom={true}
                    />
                </View>
            ) : (
                    <Text>影片</Text>
                )
            }
            <View style={tutorialStyles.videoTextContainer}>
                <Text style={tutorialStyles.videoText}>{videoDescription}</Text>
            </View>

        </View >
    )
}
