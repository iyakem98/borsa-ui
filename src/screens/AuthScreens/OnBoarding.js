import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const OnBoarding = ({ navigation }) => {
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@doNotShowOnBoarding", "true");
    } catch (e) {
      // saving error
    }
  };

  return (
    <View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        }}
        style={{
          height: windowHeight,
          width: windowWidth,
          position: "absolute",
        }}
      />
      {/* rgba(0,0,0,0.8) */}
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "#444"]}
        style={{
          height: windowHeight,
          width: windowWidth,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 30,
          }}
        >
          Time to Democratize Shipment!
        </Text>
        <Text
          style={{
            color: "#ddd",
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            marginTop: 10,
          }}
        >
          Do you want to get paid to travel?
        </Text>
        <Text
          style={{
            color: "#ddd",
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
            marginTop: 10,
          }}
        >
          Do you want to get your items delivered asap?
        </Text>
        <Text
          style={{
            color: "#ddd",
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          Just click below and begin your journey!
        </Text>
        <Pressable
          style={{
            backgroundColor: "#514590",
            paddingVertical: 15,
            borderRadius: 5,
            marginBottom: 25,
            marginTop: 20,
            width: "100%",
          }}
          onPress={() => {
            storeData();
            navigation.navigate("Register");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
