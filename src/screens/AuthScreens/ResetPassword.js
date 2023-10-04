import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Shared/Header";
import { TextInput } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

const ResetPassword = ({ route }) => {
  const params = route.params;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    console.log("--", params);
  }, []);

  const handleReset = async () => {
    if (!password || password.length < 6 || password != confirm) {
      showMessage({
        message: "Password Error",
        description: `Password must be atleast 6 characters and confirmed.`,
        type: "warning",
      });
    }
    if (!userOtp || userOtp.length < 4) {
      showMessage({
        message: "OTP Error",
        description: `OTP can't be empty or less than 4 digits.`,
        type: "warning",
      });
    }

    if (
      password &&
      password.length > 5 &&
      password == confirm &&
      userOtp &&
      userOtp.length == 4
    ) {
      setIsLoading(true);

      console.log("RESET PASSWORD: ", {
        userId: params?._id,
        otp: userOtp,
        password: password,
      });

      await axios
        .post("http://143.198.168.244/api/users/reset-password", {
          userId: params?._id,
          otp: userOtp,
          password: password,
        })
        // await AsyncStorage.removeItem("user")
        .then((res) => {
          showMessage({
            message: "Change Succeeded",
            description: `Please login with your new password.`,
            type: "success",
          });

          setTimeout(() => {
            navigation.navigate("Login");
          }, 3000);
        })
        .catch((e) => {
          let errResponse =
            (e && e.response && e?.response?.data) || (e && e?.message);

          console.log("------------", errResponse);
          if (
            errResponse?.message ===
            "New password cannot be the same as old password"
          ) {
            showMessage({
              message: "Error",
              description: `New password cannot be the same as old password.`,
              type: "warning",
            });
          } else {
            showMessage({
              message: "Error",
              description: `Something went wrong. Try again.`,
              type: "warning",
            });
          }
        });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Header backBtn />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          Reset your password
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
          }}
        >
          Please check your email for OTP.
        </Text>
        <TextInput
          label="OTP"
          value={userOtp}
          onChangeText={(text) => setUserOtp(text)}
          mode="outlined"
          keyboardType="numeric"
          maxLength={4}
          style={{
            marginTop: 15,
            marginBottom: 13,
            // paddingVertical: 5
          }}
          outlineStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
          }}
          placeholderTextColor="#eee"
        />
        <TextInput
          label="New Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry
          style={{
            marginTop: 15,
            marginBottom: 13,
            // paddingVertical: 5
          }}
          outlineStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
          }}
          placeholderTextColor="#eee"
        />
        <TextInput
          label="Confirm New Password"
          value={confirm}
          secureTextEntry
          onChangeText={(text) => setConfirm(text)}
          mode="outlined"
          style={{
            marginTop: 15,
            marginBottom: 13,
            // paddingVertical: 5
          }}
          outlineStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
          }}
          placeholderTextColor="#eee"
        />
        <Pressable
          style={{
            //backgroundColor: "#514590",
            backgroundColor: "#5f43b2",
            // bottom: 10,
            // left: 15,
            // position: "absolute",
            paddingVertical: 15,
            borderRadius: 5,
            marginTop: 15,
            width: "100%",
          }}
          onPress={handleReset}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {isLoading ? "Resetting ..." : "Reset"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
