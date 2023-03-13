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
        if ( !email?.length || !password?.length) {
            alert("All fields are required");
            return;
        }
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
       

    };
    return (
        // <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <Text style={styles.signupText}>Sign In</Text>
                <View style={{marginHorizontal:24}}>
                    <Text style={{ fontSize: 16, color: '#8e93a1'}}>EMAIL</Text>
                    <TextInput style={styles.signupInput} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{marginHorizontal:24}}>
                    <Text style={{ fontSize: 16, color: '#8e93a1'}}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                </View>
                <TouchableOpacity onPress={()=>{handleSubmit}} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        // </KeyboardAwareScrollView>
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