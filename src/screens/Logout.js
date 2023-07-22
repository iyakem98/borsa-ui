import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();
  // useEffect(()=>
  // {
  // const remove = async() => {
  //     await AsyncStorage.removeItem('user')
  //     await AsyncStorage.clear()
  // }
  // })
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
    alert(" Logout  Successful");
  };
  return (
    <Pressable>
      <TouchableOpacity onPress={handleLogout} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default Logout;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

{
  /* <TouchableOpacity onPress={handleLogout} style={styles.buttonStyle}>
<Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity> */
}
