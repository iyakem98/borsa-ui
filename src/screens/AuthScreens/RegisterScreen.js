import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { login } from "../../features/auth/authSlice";
import { reset } from "../../features/chat/chatSlice";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Shared/Header";
import LottieView from "lottie-react-native";
import { Checkbox, TextInput } from "react-native-paper";

const windowHeight = Dimensions.get("window").height;

const RegisterScreen = ({ navigation }) => {
  const [signUp, setSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  const [passwordErr, setPasswordErr] = useState(false);

  const [fullNameErr, setFullNameErr] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);

  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isTraveler, setIsTraveler] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/800px-Male_Avatar.jpg?20201202061211"
  );
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [registerForm, setRegisterForm] = useState("");
  const [verifyForm, setVerifyForm] = useState("none");
  const [confirm, setConfirm] = useState("");
  const [mailedTo, setMailedTo] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  let registerUserData = null;
  const storeTokenOnLocal = async (t) => {
    try {
      let msgs = await AsyncStorage.setItem(`myToken`, t);

      console.log("-=-=--=", t);

      console.log("gott", await AsyncStorage.getItem("myToken"));
    } catch (error) {
      console.log("errorr", error);
    }
  };
  const handleUserData = async (value) => {
    try {
      dispatch(login(value));
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user_data", jsonValue);
      storeTokenOnLocal(value.token);
    } catch (e) {
      // saving error
    }
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleLogin = async () => {
    setUserPasswordError("");
    setIsLoading(true);
    const userName = userFullName.split(" ");
    console.log(userName);
    let regex = /^[A-Za-z]+ [A-Za-z]+$/;
    let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!firstName) {
      setFirstNameErr(true);
      setUserPasswordError("First name is required.");
    }
    if (!lastName) {
      setLastNameErr(true);
      setUserPasswordError("Last name is required.");
    }
    if (!emailRegex.test(userEmail)) {
      console.log("yryyr", emailRegex.test(userEmail));
      setUserPasswordError("Please use a valid email");
      setUserEmailError(true);
    }
    if (!checked) {
      setUserPasswordError("You have to Check the Checkbox");
    }
    if (
      !userPassword ||
      !confirmUserPassword ||
      userPassword !== confirmUserPassword ||
      userPassword.length < 6
    ) {
      setPasswordErr(true);
      setUserPasswordError("Password has to be atleast 6 digits and confirmed");
    }
    if (firstName.length < 1) {
      setUserPasswordError("First name is required.");
    } else if (lastName.length < 1) {
      setUserPasswordError("Last name is required.");
    } else if (userPassword !== confirmUserPassword) {
      setUserPasswordError("Passwords do not match");
      setPasswordError(true);
    } else if (
      checked &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      emailRegex.test(userEmail) &&
      userPassword &&
      userPassword === confirmUserPassword &&
      userPassword.length > 5
    ) {
      try {
        const capitalizedFirstName = capitalizeFirstLetter(firstName);
        const capitalizedLastName = capitalizeFirstLetter(lastName);

        const res = await axios.post("http://143.198.168.244/api/users", {
          firstName: capitalizedFirstName,
          lastName: capitalizedLastName,
          email: userEmail.toLowerCase(),
          password: userPassword,
        });
        console.log(res.data);
        await handleUserData(res.data);
      } catch (e) {
        console.log("------------", e);
        console.log("------------", e?.response?.data?.message);
        if (e?.response?.data?.message === "Invalid email or password") {
          setUserPasswordError("Invalid email or password");
        } else if (e?.response?.data?.message === "User already exists") {
          setUserPasswordError("Email already exists");
        } else if (
          e?.response?.data?.message === "Username Taken! put in another one"
        ) {
          setUserPasswordError("Username already taken");
        } else {
          setUserPasswordError("Something Went Wrong");
        }
      }
    }
    setIsLoading(false);
  };

  const Icon = (
    <Pressable
      onPress={() => {
        setVisibility(!visibility);
        setSecureText(!secureText);
      }}
    >
      <Entypo
        name={visibility ? "eye" : "eye-with-line"}
        size={24}
        color="black"
        style={{
          marginTop: 7,
        }}
      />
    </Pressable>
  );
  const checkValidation = (text) => {
    setPasswordAgain(text);
    if (password !== passwordAgain) {
      setPasswordError("passwords do not match ");
    } else {
      setPasswordError("");
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === "" ||
      password === "" ||
      country === "" ||
      city === ""
    ) {
      alert("All fields are required");
      return;
    }
    if (password != passwordAgain) {
      // setPasswordError("error in matching passwords")
      alert("passwords do not match");
      return;
    }
    if (password.length < 8) {
      // setPasswordError("error in matching passwords")
      alert("your password should be at least greater than eight characters");
      return;
    }

    if (
      firstName &&
      lastName &&
      userName &&
      email &&
      password &&
      country &&
      city &&
      password == passwordAgain &&
      password.length > 7
    ) {
      setSignUp(false);
      let userData = {
        firstName,
        lastName,
        email,
        password,
        userName,
        isTraveler,
        profilePic,
        city,
        country,
      };
      console.log(userData);
      try {
        const { data } = await axios.post(`${API_BASE_URL}users/`, userData);
        await AsyncStorage.setItem("cre", JSON.stringify(data));

        // console.log(registerUserData)
        // alert('123')
        // dispatch(register(data))

        //   setTimeout(() => {
        //     // Code to run after the pause

        // }, 5000);
        // await AsyncStorage.setItem('user', JSON.stringify(data))
        // console.log(user)
        setMailedTo(data._id);
        setModalVisible(true);
        setSignUp(false);
      } catch (err) {
        console.log("error is", err);
        alert("Something went wrong try again!");
      }
      // axios.post(`${API_BASE_URL}users/`, userData)
      //     .then((data) => {
      //     // await AsyncStorage.setItem('user', JSON.stringify(data.data))
      //       // const user1 = await AsyncStorage.getItem('user')
      //       dispatch(register(data.data))
      //       console.log(user)
      //     setMailedTo(data.data._id)
      //      setModalVisible(true)
      //      })
      //     .catch((err) => {
      //       console.log("error is", err)
      //       alert("Something went wrong try again!")
      //     });

      //     setSignUp(false)
    }

    // setRegisterForm("none")
    // setVerifyForm("")
    // alert("Sign In Successful");
    // navigate.navigate("Verifyyy")
  };

  const handleVerify = async () => {
    let data = {
      userId: mailedTo,
      otp: confirm,
    };

    axios
      .post(`${API_BASE_URL}users/verify-email`, data)
      .then(async (data) => {
        let userData = {
          firstName,
          lastName,
          email,
          password,
          userName,
          isTraveler,
          profilePic,
          city,
          country,
        };

        alert("Verified. Press OK to continue!");
        const registerUser1 = await AsyncStorage.getItem("cre");
        const registerUser = JSON.parse(registerUser1);
        console.log(registerUser);
        dispatch(register(registerUser));
        // dispatch(login(userData))
        navigate.navigate("Chats");
      })
      .catch((err) => {
        console.log("error is", err);
        alert("Invalid otp!");
      });
  };

  const validateName = (text) => {
    let regex = /^[A-Za-z]+ [A-Za-z]+$/;
    if (regex.test(text)) {
      setFullNameErr(false);
      setFullName(text);
    } else {
      setFullName(text);
      setFullNameErr(true);
      // setFullName("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        height: windowHeight,
        backgroundColor: "#fff",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 50,
          flexGrow: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 30,
          }}
        >
          Create an Account
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 14,
          }}
        >
          Create an account to start using Borsa
        </Text>
        <View>
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text.trim());
              setFirstNameErr(false);
            }}
            mode="outlined"
            style={{
              marginTop: 15,
              marginBottom: 13,
              height: 40,
              // paddingVertical: 5
            }}
            error={firstNameErr}
            outlineStyle={{
              backgroundColor: "#fff",
            }}
            placeholderTextColor="#eee"
          />
          {/* <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text.trim())}
            mode="outlined"
            style={{
              //marginTop: 15,
              marginBottom: 13,
              // paddingVertical: 5
            }}
            error={userPasswordError}
            outlineStyle={{
              backgroundColor: "#fff",
            }}
            placeholderTextColor="#eee"
          /> */}
        </View>

        <View>
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text.trim());
              setLastNameErr(false);
            }}
            mode="outlined"
            style={{
              marginTop: 3,
              marginBottom: 13,
              height: 40,
              // paddingVertical: 5
            }}
            error={lastNameErr}
            outlineStyle={{
              backgroundColor: "#fff",
            }}
            placeholderTextColor="#eee"
          />
          {/* <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text.trim())}
            mode="outlined"
            style={{
              //marginTop: 15,
              marginBottom: 13,
              // paddingVertical: 5
            }}
            error={userPasswordError}
            outlineStyle={{
              backgroundColor: "#fff",
            }}
            placeholderTextColor="#eee"
          /> */}
        </View>

        <TextInput
          label="Email"
          value={userEmail}
          onChangeText={(text) => {
            setUserEmail(text.toLowerCase());
            setUserEmailError(false);
          }}
          mode="outlined"
          style={{
            marginBottom: 13,
            height: 40,
            // paddingVertical: 5
          }}
          error={userEmailError}
          outlineStyle={{
            backgroundColor: "#fff",
          }}
          placeholderTextColor="#eee"
        />
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={userPassword}
          onChangeText={(text) => {
            setUserPassword(text);
            setPasswordErr(false);
          }}
          mode="outlined"
          style={{
            marginBottom: 13,
            height: 40,
          }}
          error={passwordErr}
          outlineStyle={{
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmUserPassword}
          onChangeText={(text) => {
            setConfirmUserPassword(text);
            setPasswordErr(false);
          }}
          mode="outlined"
          style={{
            height: 40,
            // paddingVertical: 5
          }}
          error={passwordErr}
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
            marginTop: 20,
            width: "100%",
            // backgroundColor: "#eee"
          }}
        >
          <View>
            <View
              style={{
                marginRight: 8,
                borderStyle: "solid",
                borderWidth: 0.9,
                borderRadius: 50,
              }}
            >
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="#514590"
                style={{
                  width: 80,
                  backgroundColor: "#eee",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                position: "relative",
                fontFamily: "Poppins_400Regular",
                fontSize: 13,
              }}
            >
              I intend to become a registered user of{" "}
              <Text
                style={{
                  color: "#514590",
                  fontFamily: "Poppins_500Medium",
                  //textDecorationLine: "underline"
                }}
                onPress={() => {
                  // console.log("========")
                }}
              >
                Borsa,
              </Text>{" "}
              and I have reviewed and agreed to the{" "}
              <Text
                style={{
                  color: "#514590",
                  fontFamily: "Poppins_500Medium",
                  //textDecorationLine: "underline"
                }}
                onPress={() => navigation.navigate("Terms & Conditions")}
              >
                Terms and Conditions.
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 20,
            left: 15,
          }}
        >
          {isLoading ? (
            <LottieView
              style={{
                height: 150,
                left: "20%",
                // right: "25%",
                bottom: "15%",
              }}
              source={require("../../assets/loader.json")}
              autoPlay
              loop
            />
          ) : (
            <Pressable
              style={{
                //backgroundColor: "#514590",
                backgroundColor: "#5f43b2",
                paddingVertical: 12,
                borderRadius: 5,
                marginBottom: -15,
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
                {isLoading ? "Loading ..." : "Continue"}
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
                marginTop: 14,
              }}
            >
              I already have an account.{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  color: "#514590",
                  textDecorationLine: "underline",
                  marginTop: 14,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // <View style = {{
    //     height: "100%",
    //   }}>
    //       <View style = {{
    //         height: '38%',
    //         backgroundColor: '#593196',
    //         alignItems: 'center',
    //         justifyContent: 'center'
    //       }}>

    //           <Image
    //               source = {require ('../../data/logos/lwhiteclearbg.png')}
    //               style = {{
    //                   width: 80,
    //                   height: 130,
    //                   resizeMode: 'cover',
    //                   marginBottom: 10
    //               }}
    //               />
    //             <Text style = {{
    //               color: 'white',
    //               fontSize: 17,
    //             }}>
    //               Borsa
    //             </Text>

    //       </View>

    //       {/* {registerForm ? <ScrollView style = {{backgroundColor: 'white',
    //       // display:`${registerForm}`
    //       }}>
    //       <View style = {{
    //         alignItems: 'center',
    //         paddingVertical: 40,
    //         width: '100%',
    //         backgroundColor: 'white'
    //       }}>
    //             <View style = {{
    //                 width: "100%",
    //                 justifyContent: 'space-around',
    //                 flexDirection: 'row',
    //             }}>
    //             <TextInput placeholder='First Name'
    //               style = {{
    //                 width: '36%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 16,

    //               }}
    //               value={firstName}
    //                onChangeText={text => setFirstName(text)}
    //               />

    //             <TextInput placeholder='Last Name'
    //               style = {{
    //                 width: '36%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 16,

    //               }}
    //               value={lastName}
    //                onChangeText={text => setLastName(text)}
    //               />

    //             </View>
    //             <TextInput placeholder='Enter your username'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 8,

    //               }}
    //               value={userName}
    //               onChangeText={text => setuserName(text)}
    //               />
    //             <TextInput placeholder='Enter your email'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 8,

    //               }}
    //               value={email}
    //               onChangeText={text => setEmail(text)}
    //                autoCompleteType="email" keyboardType="email-address"
    //               />

    //             <View style = {{
    //               width: "85%",
    //               flexDirection: 'row',
    //               justifyContent:'center',
    //               borderStyle: 'solid',
    //               borderBottomWidth: StyleSheet.hairlineWidth,
    //               borderColor: "lightgray",
    //               marginVertical: 8,

    //             }}>
    //             <TextInput placeholder='Enter password'
    //               style = {{
    //                 width: '90%',
    //                 paddingHorizontal: 6,
    //                 paddingVertical: 8,

    //                 fontSize: 18

    //               }}
    //               value={password}
    //               onChangeText={text => setPassword(text)}
    //               secureTextEntry={secureText}
    //               />
    //               {Icon}
    //             </View>
    //             <View
    //                 style = {{
    //                 width: "85%",
    //                 flexDirection: 'row',
    //                 // justifyContent:'center',
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 marginVertical: 8,

    //             }}>
    //             <TextInput placeholder='Confirm password'
    //               style = {{
    //                 width: '90%',
    //                 paddingHorizontal: 6,
    //                 paddingVertical: 8,

    //                 fontSize: 18

    //               }}
    //               value={passwordAgain}

    //               onChangeText={(text) => {

    //                 setPasswordAgain(text)
    //               }}
    //               secureTextEntry={secureText}

    //               />
    //                 {Icon}

    //             </View>
    //             <TextInput placeholder='Enter your Country'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginVertical: 8,
    //               }}
    //               value={country}
    //               onChangeText={text => setCountry(text)}
    //               />
    //             <TextInput placeholder='Enter your City'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginVertical: 8,
    //               }}
    //               value={city}
    //               onChangeText={text => setCity(text)}
    //               />

    //               <TouchableHighlight style = {{
    //                 backgroundColor: "#f9f8fc",
    //                 width: "80%",
    //                 paddingHorizontal: 10,
    //                 paddingVertical: 10,

    //               }}>
    //                 <Text style = {{}}>
    //                     Upload profile pic
    //                 </Text>
    //               </TouchableHighlight>
    //               <View>
    //               </View>

    //             <TouchableOpacity style = {{
    //               backgroundColor: '#13b955',
    //               width: "70%",
    //               height: "9%",
    //               marginTop: 40,
    //               marginBottom: 20,
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               borderRadius: 5,

    //               shadowColor: "000",
    //               shadowOffset: {
    //                   width: 0,
    //                   height: 3,
    //               },
    //               shadowOpacity: 0.28,
    //               shadowRadius: 3.00,

    //               elevation: 1,

    //             }}
    //             onPress={() => handleSubmit()}>
    //               <Text style = {{
    //                 color: 'white',
    //                 fontSize: 17,
    //               }}>
    //                 Sign Up
    //               </Text>
    //             </TouchableOpacity>
    //             <Text style = {{
    //               color: 'gray'
    //             }}>
    //               Forgot password?
    //             </Text>

    //             <Pressable
    //               onPress={() => navigate.navigate('Login')}
    //               style = {{
    //                 marginVertical: 30,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: '#593196',
    //                 paddingHorizontal: 3
    //             }}>
    //               <Text style = {{
    //                 //color: '#a991d4'
    //                 color: '#593196',
    //                 fontSize: 16,
    //               }}>
    //                 Already have an account!
    //               </Text>
    //             </Pressable>
    //       </View>
    //       </ScrollView> : null} */}
    //         <ScrollView style = {{backgroundColor: 'white',
    //       // display:`${registerForm}`
    //       }}>
    //       <View style = {{
    //         alignItems: 'center',
    //         paddingVertical: 40,
    //         width: '100%',
    //         backgroundColor: 'white'
    //       }}>
    //             <View style = {{
    //                 width: "100%",
    //                 justifyContent: 'space-around',
    //                 flexDirection: 'row',
    //             }}>
    //             <TextInput placeholder='First Name'
    //               style = {{
    //                 width: '36%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 16,

    //               }}
    //               value={firstName}
    //                onChangeText={text => setFirstName(text)}
    //               />

    //             <TextInput placeholder='Last Name'
    //               style = {{
    //                 width: '36%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 16,

    //               }}
    //               value={lastName}
    //                onChangeText={text => setLastName(text)}
    //               />

    //             </View>
    //             <TextInput placeholder='Enter your username'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 8,

    //               }}
    //               value={userName}
    //               onChangeText={text => setuserName(text)}
    //               />
    //             <TextInput placeholder='Enter your email'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 8,

    //               }}
    //               value={email}
    //               onChangeText={text => setEmail(text)}
    //                autoCompleteType="email" keyboardType="email-address"
    //               />

    //             <View style = {{
    //               width: "85%",
    //               flexDirection: 'row',
    //               justifyContent:'center',
    //               borderStyle: 'solid',
    //               borderBottomWidth: StyleSheet.hairlineWidth,
    //               borderColor: "lightgray",
    //               marginVertical: 8,

    //             }}>
    //             <TextInput placeholder='Enter password'
    //               style = {{
    //                 width: '90%',
    //                 paddingHorizontal: 6,
    //                 paddingVertical: 8,

    //                 fontSize: 18

    //               }}
    //               value={password}
    //               onChangeText={text => setPassword(text)}
    //               secureTextEntry={secureText}
    //               />
    //               {Icon}
    //             </View>
    //             <View
    //                 style = {{
    //                 width: "85%",
    //                 flexDirection: 'row',
    //                 // justifyContent:'center',
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 marginVertical: 8,

    //             }}>
    //             <TextInput placeholder='Confirm password'
    //               style = {{
    //                 width: '90%',
    //                 paddingHorizontal: 6,
    //                 paddingVertical: 8,

    //                 fontSize: 18

    //               }}
    //               value={passwordAgain}

    //               onChangeText={(text) => {

    //                 setPasswordAgain(text)
    //               }}
    //               secureTextEntry={secureText}

    //               />
    //                 {Icon}

    //             </View>
    //             <TextInput placeholder='Enter your Country'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginVertical: 8,
    //               }}
    //               value={country}
    //               onChangeText={text => setCountry(text)}
    //               />
    //             <TextInput placeholder='Enter your City'
    //               style = {{
    //                 width: '85%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginVertical: 8,
    //               }}
    //               value={city}
    //               onChangeText={text => setCity(text)}
    //               />

    //               <TouchableHighlight style = {{
    //                 backgroundColor: "#f9f8fc",
    //                 width: "80%",
    //                 paddingHorizontal: 10,
    //                 paddingVertical: 10,

    //               }}>
    //                 <Text style = {{}}>
    //                     Upload profile pic
    //                 </Text>
    //               </TouchableHighlight>
    //               <View>
    //               </View>

    //             <TouchableOpacity style = {{
    //               backgroundColor: '#13b955',
    //               width: "70%",
    //               height: "9%",
    //               marginTop: 40,
    //               marginBottom: 20,
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               borderRadius: 5,

    //               shadowColor: "000",
    //               shadowOffset: {
    //                   width: 0,
    //                   height: 3,
    //               },
    //               shadowOpacity: 0.28,
    //               shadowRadius: 3.00,

    //               elevation: 1,

    //             }}
    //             onPress={() => handleSubmit()}>
    //               <Text style = {{
    //                 color: 'white',
    //                 fontSize: 17,
    //               }}>
    //                 {signUp ? "Sign Up" : "Please wait..."}
    //               </Text>
    //             </TouchableOpacity>

    //             <Text style = {{
    //               color: 'gray'
    //             }}>
    //               Forgot password?
    //             </Text>

    //             <Pressable
    //               onPress={() => navigate.navigate('Login')}
    //               style = {{
    //                 marginVertical: 30,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: '#593196',
    //                 paddingHorizontal: 3
    //             }}>
    //               <Text style = {{
    //                 //color: '#a991d4'
    //                 color: '#593196',
    //                 fontSize: 16,
    //               }}>
    //                 Already have an account!
    //               </Text>
    //             </Pressable>
    //       </View>
    //       </ScrollView>

    //       <View style={styles.centeredView}>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       Alert.alert('Modal has been closed.');
    //       setModalVisible(!modalVisible);
    //     }}>
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>

    //         <Text style={styles.modalText}>Enter the OTP sent to your email to verify..</Text>

    //         <TextInput placeholder='OTP'
    //               style = {{
    //                 width: '76%',
    //                 paddingHorizontal: 8,
    //                 paddingVertical: 8,
    //                 borderStyle: 'solid',
    //                 borderBottomWidth: StyleSheet.hairlineWidth,
    //                 borderColor: "lightgray",
    //                 fontSize: 18,
    //                 marginBottom: 16,
    //                 textAlign:"center",
    //                 keyboardType:"numeric"
    //               }}
    //               value={confirm}
    //                onChangeText={text => setConfirm(text)}
    //               />

    //         <Pressable
    //           style={[styles.button, styles.buttonCloseNo]}
    //           onPress={() => handleVerify()}>
    //           <Text style={styles.textStyle}>Go</Text>
    //         </Pressable>

    //         <Pressable
    //           style={[styles.button, styles.buttonCloseCancel]}
    //           onPress={()=>{
    //             setModalVisible(!modalVisible)
    //             setSignUp(true)
    //           }}
    //           >
    //           <Text style={styles.textStyleCancel}>Cancel</Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </Modal>

    // </View>

    //   </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCloseYes: {
    backgroundColor: "red",
    marginTop: 10,
    width: "50%",
  },
  buttonCloseNo: {
    backgroundColor: "green",
    marginTop: 10,
    width: 200,
    color: "black",
  },

  buttonCloseCancel: {
    backgroundColor: "#f6f6fb",
    marginTop: 10,
    width: 200,
    color: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleCancel: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RegisterScreen;
