import { TouchableOpacity, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image, Platform, Keyboard, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import ScrollableFeed from '../components/Chats/ScrollableFeed.js/ScrollableFeed';
import io from 'socket.io-client'
import { ChatState } from '../context/ChatProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
import { API_BASE_URL, API_BASE_URL_Socket } from '../utils/config';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const MessagingScreen = ({navigation}) => {
  const { 
    selectedChat, 
    setSelectedChat,
    fetchAgain,
    setfetchAgain,  
    chats, 
    setChats, 
    notification, 
    setNotification, 
    sentMessage, 
    setsentMessage, 
    receivedMessage, 
    setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived,
    chatRoute, setchatRoute,
    NewwMessage,setNewwMessage,
    chatSelected, setchatSelected,
    chattId,setchatId,
    loading,  setloading,
    checkContent, setcheckContent,
    activeToday,setactiveToday,
  } = ChatState();
  const { user } = useSelector((state) => state.auth)
  const [newerMessages, setNewerMessages] = useState([])
  const [newmessage, setNewMessage] = useState(null);
  const route = useRoute()
  const dispatch = useDispatch()
  const {chatId} = route.params;
  const {userSelected} = route.params;
  const [messages, setMessages] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasPermissions, sethasPermissions] = useState(null)
  const [hasMediaLibPermissions, setMediaLibPermissions] = useState()
  const [image, setImage] = useState(null)
  const [getPics, setgetPics] = useState([])
  const [cameraOnOff, setcameraOnOff] = useState(true)
  const [cameratest, setcameratest] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [pushnotification, setpushNotification] = useState(false);
  const [latestMess, setlatestMess] = useState()

  const notificationListener = useRef();
  const responseListener = useRef();
  const {messageHeader, setmessageHeader} = ChatState()
  const publicFolder = "http://192.168.100.2:5000/images/"

  var selectedChatCompare = null;
  var chatRouteCompare = null;

  var socket = useRef(null);
  const scrollViewRef = useRef();
  const myRef = createRef();  
  const cameraRef = useRef()

  useLayoutEffect(() => {
    socket.current =io(API_BASE_URL_Socket)
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setsocketConnected(true) )
    socket.current.on("typing", () => setIsTyping(true))
    socket.current.on("stop typing", () => setIsTyping(false))
  }, [])
  useEffect(()=> {
    fetchMessage()
  }, [chattId])
  useEffect(() =>{
    fetchMessage()
    selectedChatCompare = selectedChat
  }, [selectedChat])
  useEffect(() =>{
    chatRouteCompare = chatRoute
  }, [])

 
  useEffect(() => {
    socket.current.on("message recieved", (newMessageReceived) => {
      testNewMessages(newMessageReceived)
    })
  }, [])
  const testNewMessages = async(newMessageReceived) => {
    const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`, {
      headers: {
          Authorization: `Bearer ${user.token}`

      }
    })
    setMessages(data, newMessageReceived)
  }

  const sendMessage = async() => {
    setlatestMess(newmessage.trim())
    setactiveToday(true)
    setNewwMessage(true)
    setNewMessage('')
    try{
      const {data} = await axios.post(`${API_BASE_URL}message/`, {
        content : newmessage,
        chatId: chattId,
        image: "",
        receiver: route.params.userSelected._id
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      socket.current.emit("new message", data)
      setMessages([...messages, data])
      // await AsyncStorage.removeItem('messages')
      // await AsyncStorage.setItem('messages', JSON.stringify(messages))
      setNewwMessage(false)
      setmessageSentOrReceived(false)
      setfetchAgain(true)
      setfetchAgain(false)
      return data
    }
    catch(error){
      console.log(error)
    }
  }
  
  const fetchMessage = async() => {
    console.log('fetching messages')
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`,
      config)
      // console.log("=======", data)
      // if(data == undefined || data == [] || data == null){
      //   // setloading(false)
      //   setMessages([])
      // }
      let yess = AsyncStorage.setItem(`me&${chattId}`, JSON.stringify(data))
      console.log("stored in local")
      
      setloading(false)

      setMessages(data)
      
      setMessages((state) => {
        return state
      })
      
      socket.current.emit("join chat", chattId)
      return data;
   
    } catch(error){
      console.log(error)
       let msgs =  await AsyncStorage.getItem(`me&${chattId}`)
        if(msgs){
          setMessages(JSON.parse(msgs))
          setloading(false)
        } else {
          setMessages([])
          setloading(false)
        }
      }
    }
  
  const typingHandler = (e) => {
    setNewMessage(e)
     
    if(!socketConnected) return

    if(!typing) {
     setTyping(true)
     socket.current.emit('typing', chattId);
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
     var timeNow = new Date().getTime();
     var timeDiff = timeNow - lastTypingTime;

     if(timeDiff >= timerLength && typing) {
         socket.current.emit("stop typing", chattId)
         setTyping(false)
     }
    }, timerLength);
  }

  if(loading){
    return (
      <View style = {{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        paddingBottom: 100,
        height: '100%'
      }}>
        <ActivityIndicator size="large" color="#000" style = {{marginRight: 0}} />
      </View>
    )
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff",
      height: height
    }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{
        position: "relative",
        flex: 1,
        // backgroundColor: "#eee",
        height: height - 200
      }}>
        <View style={{
          overflow: 'hidden',
          paddingBottom: 5,
          backgroundColor: "transparent"
        }}>
          <View style={{
            height: 70,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center"
            }}>
              <Pressable onPress={()=>navigation.goBack()} style={{marginRight: 10}}>
                <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
              </Pressable>
              <Image
                source={{uri: user?.profilePic}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 8
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontFamily: "Poppins_600SemiBold", fontSize: 16}}>{selectedChat?.users[0]?.firstName[0]._id === user._id ? selectedChat?.users[1]?.firstName : selectedChat?.users[0]?.firstName} {selectedChat?.users[0]?.firstName[0]._id === user._id ? selectedChat?.users[1]?.lastName : selectedChat?.users[0]?.lastName}</Text>
                <Text style={{fontFamily: "Poppins_400Regular", fontSize: 13}}>Active</Text>
              </View>
            </View>
            {/* <Pressable>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </Pressable> */}
          </View>
        </View>
        <ScrollableFeed messages={messages} latestMessage={latestMess} scrollref={scrollViewRef} />
        <View
          style={{
            paddingTop: 5,
            width: '100%',
            overflow: "hidden",
          }}
        >
          <View style={{
            backgroundColor: '#fff',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            height: 60,
            paddingVertical: 5,
            paddingHorizontal: 15
          }}>
            <TextInput 
              value={newmessage}
              onChangeText={(text)=>{
                setNewMessage(text)
              }}
              style = {styles.input} 
              multiline
              placeholder='type your message...'
            />
            <Pressable style={{
              backgroundColor: "#593196",
              height: 50,
              width: 50,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center"
            }} onPress={() => {
              console.log("new message" + newmessage)
              if(newmessage == null || newmessage == undefined || newmessage == ""){
                console.log('undefined')
              } else {
                sendMessage()
                // setcheckContent(true)
                scrollViewRef.current.scrollToEnd()
              }
            }}>
              <FontAwesome name="send-o" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>
        {/* {!loading && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={
              Platform.select({
                ios: () => 76,
                android: () => 110
              })()
            }
          >
            <SafeAreaView edges={["bottom"]} style={styles.TextSendingcontainer}>
              {isTyping ? (
                <View>
                  <Text> isTyping... </Text>
                </View>
              ) : null}
              <TextInput 
                value={newmessage}
                onChangeText={setNewMessage}
                style = {styles.input} 
                multiline
                placeholder='type your message...'
              />
              <Pressable 
                style = {{
                  backgroundColor: '#13b955',
                  padding: 8,
                  borderRadius: 50,
                }}
                onPress={() => {
                  console.log("new message" + newmessage)
                  if(newmessage == null || newmessage == undefined || newmessage == ""){
                    console.log('undefined')
                  } else {
                    sendMessage()
                    // setcheckContent(true)
                    scrollViewRef.current.scrollToEnd()
                  }
                }}
              >
                <FontAwesome name="send" size={18} color="#fff" style={{paddingTop: 5, paddingRight: 3}} />
              </Pressable>
            </SafeAreaView>
          </KeyboardAvoidingView>
        )} */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
 

export default MessagingScreen

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextSendingcontainer: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    backgroundColor:'white',
    padding: 2,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  loader: {
   marginTop: 80,
   marginLeft: 130
  },
  bg: {
    flex: 1,
  },
  text2: {
    color: "green",
    marginTop: "150%",
    marginLeft: 165,
    justifyContent: "center",
    width: "40%"
  },
  // input: {
  //   backgroundColor: "#fff",
  //   paddingVertical: 50,
  //   paddingHorizontal: 10,
  //   width: width - 40,
  //   textAlignVertical: "center",
  //   borderRadius: 8,
  // },
  minicamera: {
    height: 100
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    marginLeft: 350,
    marginTop: 40
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f8fc",
    padding: 5,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingTop: 15,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: "100%",
    width: width - 90
  },
  camera: {
    marginTop: 0,
    fontSize: 20
  },
  text :{
    marginTop: 20
  },
  container2: {
  },
  container3: {
  },
  camera: {
  height: "100%"
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});