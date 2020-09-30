// React, React Native
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Icons
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

// Styles
import homeCategoriesStyles from '../styles/homeCategoriesStyles';

export default function HomeCategories() {

    const navigation = useNavigation();

    return (
        // 瀏覽課程 導師圑隊 我的課程 購物車
        <View style={homeCategoriesStyles.container}>

            <View style={homeCategoriesStyles.subContainer}>
                <TouchableOpacity
                    style={homeCategoriesStyles.box}
                    onPress={() => navigation.navigate('Subject', {screen: 'Subject'})}
                >
                    <MaterialIcons name="subject" color={'#5b96f7'} size={32} />
                    <Text style={homeCategoriesStyles.text}>瀏覽課程</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={homeCategoriesStyles.box}
                >
                    <AntDesign name="team" color={'#22c736'} size={32} />
                    <Text style={homeCategoriesStyles.text}>導師圑隊</Text>
                </TouchableOpacity>
            </View>

            <View style={homeCategoriesStyles.subContainer}>
                <TouchableOpacity
                    style={homeCategoriesStyles.box}
                    onPress={() => navigation.navigate('MyCourse')}
                >
                    <Ionicons name="ios-school" color={'#ee4949'} size={32} />
                    <Text style={homeCategoriesStyles.text}>我的課程</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={homeCategoriesStyles.box}
                >
                    <AntDesign name="shoppingcart" color={'#e96a43'} size={32} />
                    <Text style={homeCategoriesStyles.text}>購物車</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
