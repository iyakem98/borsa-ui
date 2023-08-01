import {
  View,
  Text,
  Pressable,
  Stylesheet,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
const ContactScreen = () => {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const HandleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}users/email/contact-us`,
        {
          fullName: fullName,
          email: email,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
          },
        }
      );
      setLoading(false);
      //  console.log('message sent sucessfully')
      alert("feedback sent sucessfully");
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return (
      <>
        <ActivityIndicator
          size="large"
          color="#777"
          style={{ paddingTop: 300 }}
        />
        {/* <Text>sending message</Text> */}
      </>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: height,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{
          position: "relative",
          flex: 1,
          height: height - 200,
        }}
      >
        <View
          style={{
            //paddingTop: 20,
            backgroundColor: "#fff",
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "50%",
              width: "100%",
              backgroundColor: "#593196",
              //backgroundColor: '#a991d4',
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <Image
              source={require("../../data/logos/lwhiteclearbg.png")}
              style={{
                width: 80,
                height: 130,
                resizeMode: "cover",
                marginBottom: 10,
              }}
            />
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 30,
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <MaterialIcons name="email" size={17} color="white" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 5,
                      marginBottom: 7,
                    }}
                  >
                    info@borsa.world
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="phone" size={17} color="white" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 5,
                    }}
                  >
                    +1(310) 351-5957
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="location-pin" size={17} color="white" />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: "#fff",
                    }}
                  >
                    Seattle WA, USA
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              height: "50%",
              width: "100%",
              alignItems: "center",
              backgroundColor: "#f9f8fc",
            }}
          >
            <View
              style={{
                height: 430,
                width: "90%",
                backgroundColor: "#fff",
                position: "absolute",
                paddingTop: 30,
                zIndex: 1000,
                marginTop: -100,
                paddingHorizontal: 10,
                borderRadius: 30,

                shadowColor: "gray",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },

                shadowOpacity: 0.6,
                shadowRadius: 1.0,

                elevation: 1,
              }}
            >
              {/* <View style = {{
                    width: 500,
                    // justifyContent: 'space-around',
                    // flexDirection: 'row',
                }}> */}
              {/* <TextInput placeholder='Name'
                 value={fullName}
                 onChangeText={text => setFullName(text)}
                  style = {{
                    width: '43%',
                    //paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,
  
                  }}
                  /> */}

              {/* <TextInput placeholder='Last Name'
                  style = {{
                    width: '43%',
                    //paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,
  
                  }}
                  /> */}

              {/* </View> */}

              <TextInput
                placeholder="Name"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                style={{
                  width: "100%",
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: "solid",
                  borderBottomWidth: 0.5,
                  borderColor: "lightgray",
                  fontSize: 18,
                  marginBottom: 16,
                }}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  width: "100%",
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: "solid",
                  borderBottomWidth: 0.5,
                  borderColor: "lightgray",
                  fontSize: 18,
                  marginBottom: 16,
                }}
              />

              <TextInput
                placeholder="feedback"
                value={message}
                onChangeText={(text) => setMessage(text)}
                style={{
                  width: "100%",
                  // paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: "solid",
                  borderWidth: 0.5,
                  height: 100,
                  borderColor: "lightgray",
                  fontSize: 18,
                  textAlignVertical: "top",
                  marginBottom: 16,
                }}
                multiline={true}
              />

              <Pressable
                style={{
                  backgroundColor: "#13b955",
                  width: "50%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onPress={() => {
                  setLoading(true);
                  HandleSubmit();
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ContactScreen;
