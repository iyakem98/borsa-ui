import {View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Shared/Header';
import { TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';


const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  const handleUserData = async (value) => {
    try {
      dispatch({
        type: "LOGIN",
        payload: { user: value },
      });
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user_data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const handleLogin = async() => {
    setIsLoading(true)
    try {
      const res = await axios.post('http://143.198.168.244/api/users/forgot-password', {
        email: userEmail
      });
      console.log(res.data);
      await navigation.navigate('VerifyUser', res.data)
    } catch(e) {
      console.log("------------", e.response.data)
      if(e?.response?.data?.message === "Invalid Email") {
        showMessage({
            message: "Invalid Email",
            description: `Please make sure you have a registered email`,
            type: "warning",
        });
      } else {
        showMessage({
            message: "Something went wrong",
            description: `Please check your email or connection`,
            type: "warning",
        });
      }
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      <Header backBtn />
      <ScrollView contentContainerStyle={{
        paddingHorizontal: 15,
        flexGrow: 1
      }}>
        <Text style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 30,
          marginTop: 10,
        }}>
          Forgot your Password?
        </Text>
        <Text style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 14,
        }}>
          We will send you an email after you put your email.
        </Text>
        <TextInput
          label="Email"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
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
          placeholderTextColor= "#eee"
        />
        <Pressable style={{
          backgroundColor: "#514590",
          // bottom: 10,
          // left: 15,
          // position: "absolute",
          paddingVertical: 15,
          borderRadius: 5,
          marginTop: 15,
          width: "100%"
        }} onPress={handleLogin}>
          <Text style={{
              color: "#fff",
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              textAlign: "center"
          }}>{isLoading ? "Loading ..." : "Login"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen

