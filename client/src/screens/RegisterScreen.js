import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { register } from '../features/auth/authSlice';

const RegisterScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigation()
    const handleSubmit = async () => {
        if (  firstName === '' || lastName === '' || userName === ''  || email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        // await axios.post("http://192.168.100.2:5002/api/users/login", {email, password});
        const userData = {
            firstName,
            lastName,
            userName,
            email,
            password
          }
        dispatch(register(userData))  
        alert("Sign In Successful");
        navigation.navigate("Chats")

    };

  return (
    <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
    <View style={{ marginVertical: 100 }}>
    {/* <View style={styles.imageContainer}>
        <Image source={require("../assets/logo.png")} style={styles.imageStyles} />
    </View> */}
        <Text style={styles.signupText}>Register</Text>
        <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: '#8e93a1' }}>First Name</Text>
            <TextInput style={styles.signupInput} value={firstName} onChangeText={text => setFirstName(text)}  />
        </View>
        <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: '#8e93a1' }}>Last Name</Text>
            <TextInput style={styles.signupInput} value={lastName} onChangeText={text => setLastName(text)}  />
        </View>
        <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: '#8e93a1' }}>UserName</Text>
            <TextInput style={styles.signupInput} value={userName} onChangeText={text => setuserName(text)}  />
        </View>
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

export default RegisterScreen

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