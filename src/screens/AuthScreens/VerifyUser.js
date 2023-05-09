import {View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Shared/Header';
import { TextInput } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";


const VerifyUser = ({navigation, route}) => {
    const params = route.params
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  useEffect(()=>{
    console.log("--", params)
  } ,[])

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
      const res = await axios.post('http://143.198.168.244/api/users/verify-email', {
        userId: params?._id,
        otp: userOtp
      });
      console.log(res.data);
      await handleUserData();
    } catch(e) {
      console.log("------------", e.response.data)
      if(e?.response?.data?.message === "Invalid Request, missing parameters") {
        showMessage({
            message: "Invalid Code",
            description: `Please make sure the sent to your email is the same.`,
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
          Verify your email?
        </Text>
        <Text style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 14,
        }}>
          Please fill the Fields from your email we recently sent you.
        </Text>
        <TextInput
          label="Code"
          value={userOtp}
          onChangeText={text => setUserOtp(text)}
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

export default VerifyUser

