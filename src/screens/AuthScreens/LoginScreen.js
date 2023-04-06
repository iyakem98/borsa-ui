import {View, Text, ImageBackground, Image, SafeAreaView, TextInput, StyleSheet, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { login } from '../../features/auth/authSlice';
import { ChatState } from '../../context/ChatProvider';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as AppAuth from 'expo-google-sign-in'

import io from 'socket.io-client'
import { API_BASE_URL } from '../../utils/config';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true)

  const {onlineStatus, setonlineStatus} = ChatState()
  const dispatch = useDispatch();
  // const ENDPOINT = "http://192.168.100.2:5000"
 
  // var socket = useRef(null)
  // var socket = io(ENDPOINT)
  var socket = io(API_BASE_URL)
  const [socketConnected, setsocketConnected] = useState(false)
  // const navigation = useNavigation()

  const [invalidArgs, setInvalidArgs] = useState(false)

  const navigate = useNavigation()

  const [isLogging, setIsLogging] = useState(false)

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePassword = (password) => {
    
    if(password.length>0){
      if(password.length>7){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
    
  };


  const handleSubmit = async () => {
     
    if ( email === '' || password === '') {
       setInvalidArgs(true)
    }

    if(validateEmail(email) && email.length>0 && validatePassword(password) && password.length>0){
      const userData = {
        email,
        password,
      }

      if(remember){
        let save_user = await AsyncStorage.setItem('saved_email', email)
        let save_pass = await AsyncStorage.setItem('saved_password', password)

        const user1 = await AsyncStorage.getItem('saved_email')
        const user2 = await AsyncStorage.getItem('saved_password')

        console.log(user1+' '+user2)
      }else{
        await AsyncStorage.removeItem('saved_email')
        await AsyncStorage.removeItem('saved_password')
      }

      
      try{
        setIsLogging(true)
        // const {data} = await  axios.post(`${API_BASE_URL}users/login`, userData)
        dispatch(login(userData))
        navigate.navigate('Chats')
        // if (data) {
        //   setIsLogging(true)
        //   // console.log(data)
        //   // localStorage.setItem('user', JSON.stringify(response.data))
        //   // setIsLogging(false)
        //   const user = await AsyncStorage.setItem('user', JSON.stringify(data))
        //   const user1 = await AsyncStorage.getItem('user')
        //   // console.log(user1)
        //   navigate.navigate("Chats")
        //   // setIsLogging(false)
        //   // console.log(JSON.stringify(user1))
        //   // socket.emit('user_online', { data, socketID : socket.id})
        //   // return data;
          
        // }
      }
      catch(err){
        setIsLogging(false)
        console.log(err)
      }
      //  axios.post(`${API_BASE_URL}users/login`, userData)
      //   .then((data) => {
      //     setIsLogging(false)
      //    console.log(data.data)
      //   // AsyncStorage.removeItem('user')
      //   //  dispatch(login(userData))
      //   const user = await AsyncStorage.setItem('user', JSON.stringify(data))
      //   const user1 = await AsyncStorage.getItem('user')
      //    navigate.navigate('Chats')
      //    })
      //   .catch((err) => {
      //     console.log("error")
      //     setIsLogging(false)
      //   });
 
    
    }else{
      setInvalidArgs(true)
    }
    
      // setonlineStatus(true)
      // socket.on('connect', () => {
      //   socket.emit('user_online', user)
      // })
  }
  // const callnavigateFunc =  () => {
  //   navigate.navigate("Chats")
  // }

  const checkSavedLogin = async () => {

    let em = await AsyncStorage.getItem('saved_email')
    let pwd = await AsyncStorage.getItem('saved_password')

    if(em!=null && pwd!=null){
      setEmail(await AsyncStorage.getItem('saved_email'))
      setPassword(await AsyncStorage.getItem('saved_password'))
    }
  }

  useEffect(() => {  
    checkSavedLogin()
 }, [])

  return (
    <View style = {{
      height: "100%",
      backgroundColor: 'white'
    }}>
        <View style = {{
          height: '38%',
          backgroundColor: '#593196',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

            <Image 
                source = {require ('../../data/logos/lwhiteclearbg.png')} 
                style = {{
                    width: 80,
                    height: 130,
                    resizeMode: 'cover',
                    marginBottom: 10
                }}
                />  
              <Text style = {{
                color: 'white',
                fontSize: 17,
                
                
              }}>
                Borsa
              </Text>

        </View>

            <Text 
                style={{
                  color:"red",
                  fontSize:12,
                  marginTop:5,
                  margin:0,
                  // display:`${invalidArgs ? '' : 'none'}`
              }}
                >
                 {invalidArgs &&
                 <View>
                   <MaterialIcons name="error-outline" size={14} color="red" />
                  <Text>Invalid email or password. Please retry!</Text> 
                 </View> 
                  }
                </Text>

        <KeyboardAvoidingView style = {{
          alignItems: 'center',
          behaviour: `${Platform.OS=="ios" ? 'padding' : 'height'}`,
          paddingVertical: 40,
          width: '100%',
          backgroundColor: 'white'
        }}>
              <TextInput placeholder='Email'
                style = {{
                  width: '85%',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: 'solid',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  placeholderTextColor:"#9a73ef",
                  fontSize: 15,
                  marginBottom: 16,
                  // borderColor: '#7a42f4',
                  // borderWidth: 1

                }}
                value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address"
                />
               {email.length && !validateEmail(email) ? <Text 
                style={{
                  color:"red",
                  fontSize:12,
                  marginTop:-5,
                  // display:`${email.length && !validateEmail(email) ? '' : 'none'}`
              }}
                >Invalid email.
                </Text>: null} 

              <View style = {{
                width: "85%",
                flexDirection: 'row',
                //justifyContent:'center',
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "lightgray",
                
              }}>
              <TextInput placeholder='Password'
                style = {{
                  width: '85%',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: 'solid',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  placeholderTextColor:"#9a73ef",
                  fontSize: 15,
                  marginBottom: 16,
                  // borderColor: '#7a42f4',
                  // borderWidth: 1
                }}
                value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" 
                />

            

                <AntDesign name="eye" size={24} color="lightgray" style = {{
                  marginTop: 7,
                }} />

              </View>


             {validatePassword(password) ? <Text 
                style={{
                  color:"red",
                  fontSize:12,
                  marginTop:-1,
                  display:`${validatePassword(password) ? 'none' : ''}`
              }}
                >Password must be atleast 8 characters.
                </Text> : null }

              <TouchableOpacity style = {{
                backgroundColor: '#13b955',
                width: "70%",
                height: "14%",
                marginTop: 60,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,

                shadowColor: "000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.28,
                shadowRadius: 3.00,

                elevation: 1,

              }} 
              onPress= {() => handleSubmit()} 
               >
                <Text style = {{
                  color: 'white',
                  fontSize: 16,
                }}>
                  {
                    isLogging? "Logging in..." : "Login"
                  }
                  
                </Text>
              </TouchableOpacity>
              <Text style = {{
                color: 'gray'
              }}>
                Forgot password?
              </Text>

              <Pressable 
                onPress={() => navigate.navigate('Register')}
                style = {{
                  marginVertical: 30,
                  borderStyle: 'solid',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: '#593196',
                  paddingHorizontal: 3
              }}>
                <Text style = {{
                  //color: '#a991d4'
                  color: '#593196',
                  fontSize: 16,
                }}>
                  Create a new account!
                </Text>
              </Pressable>
        </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

