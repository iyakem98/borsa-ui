import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../features/auth/authSlice";
import { ChatState } from "../../context/ChatProvider";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Shared/Header";
import { TextInput } from "react-native-paper";
import LottieView from "lottie-react-native";

// import * as AppAuth from 'expo-google-sign-in'

import io from "socket.io-client";
import { API_BASE_URL } from "../../utils/config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { fetchChat } from "../../features/chat/chatSlice";

const height = Dimensions.get("screen").height;

const LoginScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  // const {
  //   isLoading, setIsLoading
  // } = ChatState();
  const { chattts } = useSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");
  const [pushToken, setPushToken] = useState(null);
  // console.log('loading', isLoading)
  // useEffect(()=>{
  //   console.log("----------{{}}}", user)
  // }, [user])

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const storeTokenOnLocal = async (t) => {
    try {
      let msgs = await AsyncStorage.setItem(`myToken`, t);
    } catch (error) {
      console.log("errorr", error);
    }
  };

  const handleUserData = async (value) => {
    try {
      dispatch(login(value));
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user_data", jsonValue);
      // dispatch(fetchChat())
      // console.log('chattts data after login', chattts)
    } catch (e) {
      // saving error
    }
  };

  const handleLogin = async () => {
    setUserPasswordError("");
    setIsLoading(true);
    try {
      const res = await axios.post("http://143.198.168.244/api/users/login", {
        email: userEmail.toLowerCase(),
        password: userPassword,
        pushToken: pushToken ? pushToken : null,
      });
      // console.log(res.data);
      await handleUserData(res.data);
      storeTokenOnLocal(res.data.token);
      // console.log('fetching chats')
      // navigate.navigate("Chats")
      // dispatch(fetchChat())
      // fetchChatOnLoginOnly(res.data.token)
    } catch (e) {
      if (e?.response?.data?.message === "Invalid email or password") {
        setUserPasswordError("Invalid email or password");
      } else {
        setUserPasswordError("Something Went Wrong");
      }
    }
    setIsLoading(false);
  };

  const { onlineStatus, setonlineStatus } = ChatState();
  // const ENDPOINT = "http://192.168.100.2:5000"

  // var socket = useRef(null)
  // var socket = io(ENDPOINT)
  var socket = io(API_BASE_URL);
  const [socketConnected, setsocketConnected] = useState(false);
  // const navigation = useNavigation()

  const [invalidArgs, setInvalidArgs] = useState(false);

  const navigate = useNavigation();

  const [isLogging, setIsLogging] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePassword = (password) => {
    if (password.length > 0) {
      if (password.length > 7) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setInvalidArgs(true);
    }

    if (
      validateEmail(email) &&
      email.length > 0 &&
      validatePassword(password) &&
      password.length > 0
    ) {
      const userData = {
        email,
        password,
      };

      if (remember) {
        let save_user = await AsyncStorage.setItem("saved_email", email);
        let save_pass = await AsyncStorage.setItem("saved_password", password);

        const user1 = await AsyncStorage.getItem("saved_email");
        const user2 = await AsyncStorage.getItem("saved_password");

        console.log(user1 + " " + user2);
      } else {
        await AsyncStorage.removeItem("saved_email");
        await AsyncStorage.removeItem("saved_password");
      }

      try {
        setIsLogging(true);
        // const {data} = await  axios.post(`${API_BASE_URL}users/login`, userData)
        dispatch(login(userData));
        navigate.navigate("Chats");
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
      } catch (err) {
        setIsLogging(false);
        console.log(err);
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
    } else {
      setInvalidArgs(true);
    }

    // setonlineStatus(true)
    // socket.on('connect', () => {
    //   socket.emit('user_online', user)
    // })
  };
  // const callnavigateFunc =  () => {
  //   navigate.navigate("Chats")
  // }

  const checkSavedLogin = async () => {
    let em = await AsyncStorage.getItem("saved_email");
    let pwd = await AsyncStorage.getItem("saved_password");

    if (em != null && pwd != null) {
      setEmail(await AsyncStorage.getItem("saved_email"));
      setPassword(await AsyncStorage.getItem("saved_password"));
    }
  };

  useEffect(() => {
    checkSavedLogin();
  }, []);

  // const fetchChatOnLoginOnly = async(userToken) =>{
  // console.log('user token', userToken)

  // }
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: height,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
          flexGrow: 1,
          height: height,
        }}
        style={
          {
            // height: height,
          }
        }
      >
        <Header />
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 30,
          }}
        >
          Login
        </Text>
        <TextInput
          label="Email"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text.toLowerCase())}
          mode="outlined"
          style={{
            marginTop: 15,
            marginBottom: 13,
            // paddingVertical: 5
          }}
          error={userPasswordError}
          outlineStyle={{
            backgroundColor: "#fff",
          }}
          placeholderTextColor="#eee"
        />
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
          mode="outlined"
          style={
            {
              // paddingVertical: 5
            }
          }
          secureTextEntry={true}
          error={userPasswordError}
          outlineStyle={{
            backgroundColor: "#fff",
          }}
        />
        {userPasswordError ? (
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "red",
              fontFamily: "Poppins_400Regular",
              fontSize: 13,
            }}
          >
            {userPasswordError}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 15,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("ForgotPassword", userEmail);
            }}
          >
            <Text
              style={{
                color: "#514590",
                fontFamily: "Poppins_500Medium",
                fontSize: 15,
              }}
            >
              Forgot password?
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 80,
            left: 15,
          }}
        >
          {isLoading ? (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Logging you in!
              </Text>
              <LottieView
                style={{
                  height: 250,
                  //left: "5%",
                  //right: '20%',
                  bottom: "5%",
                }}
                source={require("../../assets/loader.json")}
                autoPlay
                loop
              />
            </View>
          ) : (
            <Pressable
              style={{
                //backgroundColor: "#514590",
                backgroundColor: "#5f43b2",
                //backgroundColor: '#593196',
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 25,
                width: "100%",
              }}
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {isLoading ? "Loading ..." : "Login"}
              </Text>
            </Pressable>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  color: "#514590",
                  textDecorationLine: "underline",
                }}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
    // <View style = {{
    //   height: "100%",
    //   backgroundColor: 'white'
    // }}>
    //     <View style = {{
    //       height: '38%',
    //       backgroundColor: '#593196',
    //       alignItems: 'center',
    //       justifyContent: 'center'
    //     }}>

    //         <Image
    //             source = {require ('../../data/logos/lwhiteclearbg.png')}
    //             style = {{
    //                 width: 80,
    //                 height: 130,
    //                 resizeMode: 'cover',
    //                 marginBottom: 10
    //             }}
    //             />
    //           <Text style = {{
    //             color: 'white',
    //             fontSize: 17,

    //           }}>
    //             Borsa
    //           </Text>

    //     </View>

    //         <Text
    //             style={{
    //               color:"red",
    //               fontSize:12,
    //               marginTop:5,
    //               margin:0,
    //               // display:`${invalidArgs ? '' : 'none'}`
    //           }}
    //             >
    //              {invalidArgs &&
    //              <View>
    //                <MaterialIcons name="error-outline" size={14} color="red" />
    //               <Text>Invalid email or password. Please retry!</Text>
    //              </View>
    //               }
    //             </Text>

    //     <KeyboardAvoidingView style = {{
    //       alignItems: 'center',
    //       behaviour: `${Platform.OS=="ios" ? 'padding' : 'height'}`,
    //       paddingVertical: 40,
    //       width: '100%',
    //       backgroundColor: 'white'
    //     }}>
    //           <TextInput placeholder='Email'
    //             style = {{
    //               width: '85%',
    //               paddingHorizontal: 8,
    //               paddingVertical: 8,
    //               borderStyle: 'solid',
    //               borderBottomWidth: StyleSheet.hairlineWidth,
    //               placeholderTextColor:"#9a73ef",
    //               fontSize: 15,
    //               marginBottom: 16,
    //               // borderColor: '#7a42f4',
    //               // borderWidth: 1

    //             }}
    //             value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address"
    //             />
    //            {email.length && !validateEmail(email) ? <Text
    //             style={{
    //               color:"red",
    //               fontSize:12,
    //               marginTop:-5,
    //               // display:`${email.length && !validateEmail(email) ? '' : 'none'}`
    //           }}
    //             >Invalid email.
    //             </Text>: null}

    //           <View style = {{
    //             width: "85%",
    //             flexDirection: 'row',
    //             //justifyContent:'center',
    //             borderStyle: 'solid',
    //             borderBottomWidth: StyleSheet.hairlineWidth,
    //             borderColor: "lightgray",

    //           }}>
    //           <TextInput placeholder='Password'
    //             style = {{
    //               width: '85%',
    //               paddingHorizontal: 8,
    //               paddingVertical: 8,
    //               borderStyle: 'solid',
    //               borderBottomWidth: StyleSheet.hairlineWidth,
    //               placeholderTextColor:"#9a73ef",
    //               fontSize: 15,
    //               marginBottom: 16,
    //               // borderColor: '#7a42f4',
    //               // borderWidth: 1
    //             }}
    //             value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password"
    //             />

    //             <AntDesign name="eye" size={24} color="lightgray" style = {{
    //               marginTop: 7,
    //             }} />

    //           </View>

    //          {validatePassword(password) ? <Text
    //             style={{
    //               color:"red",
    //               fontSize:12,
    //               marginTop:-1,
    //               display:`${validatePassword(password) ? 'none' : ''}`
    //           }}
    //             >Password must be atleast 8 characters.
    //             </Text> : null }

    //           <TouchableOpacity style = {{
    //             backgroundColor: '#13b955',
    //             width: "70%",
    //             height: "14%",
    //             marginTop: 60,
    //             marginBottom: 20,
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             borderRadius: 5,

    //             shadowColor: "000",
    //             shadowOffset: {
    //                 width: 0,
    //                 height: 3,
    //             },
    //             shadowOpacity: 0.28,
    //             shadowRadius: 3.00,

    //             elevation: 1,

    //           }}
    //           onPress= {() => handleSubmit()}
    //            >
    //             <Text style = {{
    //               color: 'white',
    //               fontSize: 16,
    //             }}>
    //               {
    //                 isLogging? "Logging in..." : "Login"
    //               }

    //             </Text>
    //           </TouchableOpacity>
    //           <Text style = {{
    //             color: 'gray'
    //           }}>
    //             Forgot password?
    //           </Text>

    //           <Pressable
    //             onPress={() => navigate.navigate('Register')}
    //             style = {{
    //               marginVertical: 30,
    //               borderStyle: 'solid',
    //               borderBottomWidth: StyleSheet.hairlineWidth,
    //               borderColor: '#593196',
    //               paddingHorizontal: 3
    //           }}>
    //             <Text style = {{
    //               //color: '#a991d4'
    //               color: '#593196',
    //               fontSize: 16,
    //             }}>
    //               Create a new account!
    //             </Text>
    //           </Pressable>
    //     </KeyboardAvoidingView>
    // </View>
  );
};

export default LoginScreen;
