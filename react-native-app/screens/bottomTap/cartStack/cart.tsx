// React, React Native
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Context
import { CartContext } from "../../../contexts/cartContext";
import { CourseContext } from '../../../contexts/courseContext';

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import globalStyles from "../../../styles/globalStyles";
import cartStyles from "../../../styles/cartStyles";

export default function Cart(props: { navigation: { goBack: () => void } }) {
  // Context
  const { cartList, cartSum, removeCartList } = useContext(CartContext);
  const { setCourseName } = useContext(CourseContext);

  // Hooks
  const navigation = useNavigation();

  function pay() {
    if (cartSum != 0) {
      navigation.navigate("StripeForm");
    } else {
      Alert.alert(
        "無需付款",
        "請先將課程加到購物車",
        [
          {
            text: "取消",
            onPress: () => console.log("取消"),
            style: "cancel"
          }
        ],
        { cancelable: true }
      )
    }
  }

  return (
    <View style={{ ...globalStyles.container, paddingHorizontal: 0 }}>
      <FlatList
        style={cartStyles.flatList}
        keyExtractor={(item) => item.id.toString()}
        data={cartList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={globalStyles.myCoursesFooter}></View>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={cartStyles.courseBox}
            onPress={() => {
              setCourseName(item.course_name),
                navigation.navigate("Course", { screen: 'CourseIntro' })
            }}
          >
            <View style={cartStyles.coursePicContainer}>
              <Image
                style={cartStyles.coursePic}
                resizeMode="cover"
                source={{ uri: item.image }}
              />
            </View>

            <View style={cartStyles.courseInfoContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode='tail'
                style={cartStyles.courseTitle}
              >{item.course_name}</Text>
              <View style={cartStyles.courseSubInfoContainer}>
                <View style={cartStyles.courseSubInfoTextContainer}>
                  <Text style={cartStyles.courseInfoText}>
                    {item.tutor_name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={cartStyles.courseInfoText}
                  >{item.course_description}
                  </Text>
                  <Text style={cartStyles.courseInfoText}>
                    {"總共堂數: " + item.lessons_number}
                  </Text>
                </View>

                <View style={cartStyles.courseSubInfoLowerContainer}>
                  <Text style={cartStyles.coursePrice}>
                    {"價錢: $" + item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeCartList(item)}
                    style={cartStyles.deleteButton}
                  >
                    <MaterialIcons name="delete" size={27} color="#a5aebf" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={cartStyles.paymentContainer}>
        <View style={cartStyles.totalPriceContainer}>
          <Text style={cartStyles.totalPrice}>{"合共:"}</Text>
          <Text style={cartStyles.totalPrice}>{"$ " + cartSum}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={cartStyles.payButton}
            onPress={() => pay()}
          >
            <Text style={cartStyles.payText}>付款</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
