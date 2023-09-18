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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    if (firstName.length < 1) {
      setUserPasswordError("You have to provide first name");
    } else if (lastName.length < 1) {
      setUserPasswordError("You have to provide last name");
    } else if (userPassword !== confirmUserPassword) {
      setUserPasswordError("Passwords do not match");
    } else if (checked && firstName.length > 0 && lastName.length > 0) {
      try {
        //const capitalizedFirstName = capitalizeFirstLetter(userName[0]);
        //const capitalizedLastName = capitalizeFirstLetter(userName[1]);;

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
    } else {
      setUserPasswordError("You have to Check the Checkbox");
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

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    extraScrollHeight={50}
    style = {{
      backgroundColor: "#fff",
      height: 0,
    }}
    
  >
    <View
      style={{
        height: windowHeight,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 60,
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
            onChangeText={(text) => setFirstName(text.trim())}
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
          />
        </View>

        <TextInput
          label="Email"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text.toLowerCase())}
          mode="outlined"
          style={{
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
          style={{
            marginBottom: 13,
          }}
          error={userPasswordError}
          outlineStyle={{
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmUserPassword}
          onChangeText={(text) => setConfirmUserPassword(text)}
          mode="outlined"
          style={
            {
              // paddingVertical: 5
            }
          }
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
                left: "15%",
                right: "20%",
                bottom: "5%",
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
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
    </KeyboardAwareScrollView>
  
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
