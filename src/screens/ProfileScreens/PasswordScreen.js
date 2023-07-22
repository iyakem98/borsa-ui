import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { API_BASE_URL } from "../../utils/config";
import { getUserDetails, logout } from "../../features/auth/authSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  {
    /* const handleChangePassword = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}users/change-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers required by your backend
            },
            body: JSON.stringify({ oldPassword, newPassword }),
          });
    
          const data = await response.json();
    
          if (response.status === 200) {
            // Password successfully updated
            Alert.alert('Success', data.message);
          } else {
            // Password update failed
            Alert.alert('Error', data.message);
          }
        } catch (err) {
            if(err?.response?.data?.message === "Incorrect old password") {
                setPasswordError("Incorrect old password")
              } else if(err?.response?.data?.message === "Password must be 6-20 characters long") {
                setPasswordError("Password must be 6-20 characters long")
              } else if(err?.response?.data?.message === "New password cannot be the same as old password") {
                setPasswordError("New password cannot be the same as old password")
              } else {
                setPasswordError("Something went wrong")
              }
        }
      };
    */
  }

  const handlePwdChange = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Please fill in all fields");
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match");
    } else if (newPassword === oldPassword) {
      setPasswordError("You cannot use your old password");
    } else {
      let config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
        },
      };

      let data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      await axios
        .post(`${API_BASE_URL}users/change-password`, data, config)
        // await AsyncStorage.removeItem("user")
        .then((data) => {
          alert("Password changed successfully");
          // dispatch(getUserDetails(user._id));
          navigation.navigate("More");
        })
        .catch((error) => {
          let errResponse =
            (error && error.response && error.response.data) ||
            (error && error.message);

          setPasswordError(errResponse.message);
        });
    }
  };

  const handleCancel = () => {
    navigation.navigate("More");
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          //alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Change Password
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Enter your old password
        </Text>
        <TextInput
          error={passwordError}
          style={{
            color: "gray",
            marginVertical: 0,
            marginBottom: 5,
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
            //height: 50,
            borderRadius: 0,
            width: "100%",
            //  marginLeft:"10vw",
            //  marginRight:"10vw",
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderColor: "gray",
            //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
            borderBottomWidth: 0.6,
            //borderRadius: 5,
            //  opacity:`${isEditing? 1 : 0.5}`
            opacity: 1,
          }}
          underlineColorAndroid="transparent"
          //placeholder = "Password"
          //placeholderTextColor = "black"
          autoCapitalize="none"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={(newText) => {
            setOldPassword(newText);
          }}
          //onChangeText = {this.handlePassword}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
            //marginBottom: 10,
          }}
        >
          Enter new password
        </Text>
        <TextInput
          error={passwordError}
          style={{
            color: "gray",
            marginVertical: 0,
            width: "95%",
            marginBottom: 5,
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
            //height: 50,
            borderRadius: 0,
            width: "100%",
            //  marginLeft:"10vw",
            //  marginRight:"10vw",
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderColor: "gray",
            //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
            borderBottomWidth: 0.6,
            //borderRadius: 5,
            //  opacity:`${isEditing? 1 : 0.5}`
            opacity: 1,
          }}
          underlineColorAndroid="transparent"
          //placeholder = "Password"
          //placeholderTextColor = "black"
          autoCapitalize="none"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(newText) => {
            setNewPassword(newText);
          }}
          //onChangeText = {this.handlePassword}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
            //marginBottom: 10,
          }}
        >
          Confirm new password
        </Text>
        <TextInput
          error={passwordError}
          style={{
            color: "gray",
            marginVertical: 0,
            marginBottom: 5,
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
            //height: 50,
            borderRadius: 0,
            width: "100%",
            //  marginLeft:"10vw",
            //  marginRight:"10vw",
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderColor: "gray",
            //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
            borderBottomWidth: 0.6,
            //borderRadius: 5,
            //  opacity:`${isEditing? 1 : 0.5}`
            opacity: 1,
          }}
          underlineColorAndroid="transparent"
          //placeholder = "Password"
          //placeholderTextColor = "black"
          autoCapitalize="none"
          value={confirmNewPassword}
          secureTextEntry={true}
          onChangeText={(newText) => {
            setConfirmNewPassword(newText);
          }}
          //onChangeText = {this.handlePassword}
        />
      </View>
      {passwordError ? (
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            color: "red",
            fontFamily: "Poppins_400Regular",
            fontSize: 13,
          }}
        >
          {passwordError}
        </Text>
      ) : null}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleCancel}
          style={{
            backgroundColor: "#eee",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 5,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
              //color: 'white',
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePwdChange}
          style={{
            backgroundColor: "#593196",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 5,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordScreen;
