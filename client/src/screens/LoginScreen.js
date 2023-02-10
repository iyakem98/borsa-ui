import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reset } from '../features/chat/chatSlice';



const LoginScreen = ({navigation}) => {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigation()
    const {onlineStatus, setonlineStatus} = ChatState()
    const handleSubmit = async () => {
        if ( email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        // await axios.post("http://192.168.100.2:5002/api/users/login", {email, password});
        const userData = {
            email,
            password,
          }
        dispatch(login(userData)) 
        setonlineStatus(true)
        setonlineStatus((state) => {
            // console.log(state)
            return state
          })
        alert("Sign In Successful");
        navigation.navigate("Chats")
        // const user =  await AsyncStorage.getItem("user")
        // const user1 = JSON.parse(user)
        // console.log(user1)

    };
    return (
        <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
            {/* <View style={styles.imageContainer}>
                <Image source={require("../assets/logo.png")} style={styles.imageStyles} />
            </View> */}
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity> */}
                {/* <Text style={{ fontSize: 12, textAlign: 'center' }}>Not yet registered? Sign Up</Text>
                <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text> */}
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
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
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: { justifyContent: "center", alignItems: "center" },
    imageStyles: { width: 100, height: 100, marginVertical: 20 }
})

export default LoginScreen