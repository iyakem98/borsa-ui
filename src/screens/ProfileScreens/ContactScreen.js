import {
    View,
    Text,
    Pressable,
    Stylesheet,
    //TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
     Modal,
     Linking

  } from "react-native";
  import { MaterialIcons, Entypo } from "@expo/vector-icons";
  import emailjs from "@emailjs/browser";
  import { useState } from "react";
  import { useSelector } from "react-redux";
  import axios from "axios";
  import { API_BASE_URL } from "../../utils/config";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { ActivityIndicator } from "react-native";
  import { Checkbox, TextInput } from 'react-native-paper';
  import LottieView  from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";

  const ContactScreen = () => {
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // const transparent = "rgba(0,0,0,0.5)"
    const { user } = useSelector((state) => state.auth);
    const navigation = useNavigation();
    const HandleSubmit = async () => {
      if(fullName && email && message){
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
        // setLoading(false);
        setModalVisible(false)
        //  console.log('message sent sucessfully')
        setFullName('')
        setEmail('')
        setMessage('')
        alert("feedback sent sucessfully");
        navigation.navigate("More")

      } catch (err) {
        console.log(err);
      }
    }
    };
    // if (loading) {
    //   return (
    //     <>
    //       <ActivityIndicator
    //         size="large"
    //         color="#777"
    //         style={{ paddingTop: 300 }}
    //       />
         
    //     </>
    //   );
    // }
    return (
      <>
         <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "rgba(0,0,0,0.75)"
        }}>
          <View style={styles.modalView}>
            
    <LottieView
          style={{
         
            height: 250,
           
          }}
        source={require('../../assets/loader.json')}

        autoPlay
        loop
      />
          </View>
        </View>
      </Modal>
    </View>
        <KeyboardAvoidingView
       
        behavior='padding'
     keyboardVerticalOffset={
      Platform.select({
        ios: () => 280,
        android: () =>-20
      })()
      
    }
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
                //backgroundColor: '#5f43b2',
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
                    <Pressable 
                    onPress={()=>Linking.openURL('mailto:info@borsa.world')}
                    >
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 5,
                        marginBottom: 7,
                      }}
                    >
                      info@borsa.world
                    </Text>
                    </Pressable>
                  </View>
  
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Entypo name="phone" size={17} color="white" />
                    <Pressable 
                    onPress={()=>Linking.openURL('tel:+1(310) 351-5957')}
                    >
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 5,
                      }}
                    >
                      +1(310) 351-5957
                    </Text>
                    </Pressable>
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
                
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                    label="Name"
                    error={!fullName && true}
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    mode="outlined"
                    style={{
                      marginBottom: 13,
                      borderRadius: 5,
                      // paddingVertical: 5
                    }}
                    //error={userPasswordError}
                    outlineStyle={{
                      backgroundColor: "#fff",
                      borderWidth: 0.4,
                    }}
                    placeholderTextColor= "#eee"
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                  label="Email"
                  value={email}
                  error={!email && true}
                  onChangeText={text => setEmail(text)}
                  mode="outlined"
                  style={{
                    marginBottom: 13,
                    // paddingVertical: 5
                  }}
                  //error={userPasswordError}
                  outlineStyle={{
                    backgroundColor: "#fff",
                    borderWidth: 0.4,
                  }}
                  placeholderTextColor= "#eee"
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    label="Feedback"
                    value={message}
                    error={!message && true}
                    onChangeText={text => setMessage(text)}
                    mode="outlined"
                    style={{
                      marginBottom: 13,
                      height: 160,
                      // paddingVertical: 5
                    }}
                    //error={userPasswordError}
                    outlineStyle={{
                      backgroundColor: "#fff",
                      borderWidth: 0.4,
                    }}
                    placeholderTextColor= "#eee"
                    multiline={true}
                  />
                
              </TouchableWithoutFeedback>
                <Pressable
                  style={{
                    //backgroundColor: "#13b955",
                    width: "50%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderWidth: 2,
                    borderColor: '#5f43b2',
                    borderStyle: 'solid',
                  }}
                  onPress={() => {
                    setModalVisible(true)
                    // setLoading(true);
                    HandleSubmit();
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      color: '#5f43b2',
                      fontSize: 17,
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
      </KeyboardAvoidingView>
   
      </>
    );
  };
  
  export default ContactScreen;
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      // backgroundColor: transparent
    },
    modalView: {
      margin: 20,
      // backgroundColor: 'white',
      // borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });