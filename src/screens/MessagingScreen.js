import { TouchableOpacity, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image, Platform, Keyboard, ScrollView, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons, FontAwesome} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import ScrollableFeed from '../components/Chats/ScrollableFeed.js/ScrollableFeed';
import io from 'socket.io-client'
import { ChatState } from '../context/ChatProvider';
import { fetchChat } from '../features/chat/chatSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
// import {Camera} from "expo-camera"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from "expo-media-library"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { API_BASE_URL, API_BASE_URL_Socket } from '../utils/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { MMKV } from 'react-native-mmkv'
import { Feather } from '@expo/vector-icons';
import moment from 'moment'



// export const storage = new MMKV()

const MessagingScreen = () => {

  const [newerMessages, setNewerMessages] = useState([])
 
  const { user } = useSelector((state) => state.auth)
  const [newmessage, setNewMessage] = useState(null);
  const route = useRoute()
  const dispatch = useDispatch()
  const {chatId} = route.params;
  const {userSelected} = route.params;
  const [messages, setMessages] = useState([])

  var socket = useRef(null)
  var selectedChatCompare = null;
  var chatRouteCompare = null
  const [socketConnected, setsocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const scrollViewRef = useRef();
  const myRef = createRef()

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
 
  
  const [hasPermissions, sethasPermissions] = useState(null)
  const [hasMediaLibPermissions, setMediaLibPermissions] = useState()
  const [image, setImage] = useState(null)
  const [getPics, setgetPics] = useState([])
  const [cameraOnOff, setcameraOnOff] = useState(true)
  const [cameratest, setcameratest] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [pushnotification, setpushNotification] = useState(false);
 
  const notificationListener = useRef();
  const responseListener = useRef();
  const {messageHeader, setmessageHeader} = ChatState()
  const publicFolder = "http://192.168.100.2:5000/images/"
  const [latestMess, setlatestMess] = useState()
 
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
// console.log(`loading is ` + loading)
    
    selectedChatCompare = selectedChat
    
  
  }, [selectedChat])
  useEffect(() =>{
    chatRouteCompare = chatRoute
    // console.log("======----=-=-", chatRouteCompare)
  
  }, [])

 
  useEffect(() => {
    // console.log("messages legnth" +  messages.length)
    // locallyStoredMessages(messages)
    socket.current.on("message recieved", (newMessageReceived) => {
<<<<<<< HEAD
      // console.log("messages legnth" +  messages.length)
      
      // var newMessage = 
      // setMessages([...messages, data])
      // setMessages([...messages, newMessageReceived])
      testNewMessages(newMessageReceived)
      // setMessages([...messages, newMessageReceived])
      // return () =>   socket.current.disconnect()
      // console.log('messaging screen ')
      // console.log('123')
=======
      setMessages([...messages, newMessageReceived])
      return () => socket.current.off("message recieved");
      //return () =>   socket.current.disconnect()
     //console.log('messaging screen ')
      //console.log('message recieved')
>>>>>>> 9570d9b8458d39a32e6b3d7c7b5d82992adb7f63
      //  setreceivedMessage(true)
     

         
     
    })


  }, [])
const testNewMessages = async(newMessageReceived) => {
  // var storedMessages = await AsyncStorage.getItem('messages')
  // console.log('stored messages' + JSON.parse(storedMessages))
  // setMessages(storedMessages)
  // setMessages(...messages, newMessageReceived)
  // const config = {
  //   headers: {
  //       Authorization: `Bearer ${user.token}`

  //   }
  // }
  // const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`,
  //   config)
    // setMessages(data)
    // setMessages(...messages, newMessageReceived)
    const config = {
      headers: {
          Authorization: `Bearer ${user.token}`
  
      }
    }
    const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`,
      config)
      setMessages(data, newMessageReceived)
      // setMessages(data, newMessageReceived)
      // console.log('fetched data' + data)
}
const locallyStoredMessages = async(messages) => {
  // await AsyncStorage.removeItem('messages')
  // await AsyncStorage.setItem("messages", messages)
  // var mess = await AsyncStorage.getItem('messages')
  // console.log('stored messages locally' + JSON.parse(mess))
 
    // setMessages(data)
    // setMessages(...messages, newMessageReceived)
}
 





  const sendMessage = async() => {
   
    console.log("new message" + newmessage)
   
    
    var storeNewMessage = newmessage
    
      setlatestMess(newmessage)
      setactiveToday(true)
       setNewwMessage(true)
       setNewMessage('')
      console.log('timeout')
    
    
    
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        }
    }
    
    
      const {data} = await axios.post(`${API_BASE_URL}message/`, {
        content : newmessage,
        chatId: chattId,
        image: "",
        // receiver: route.params.userSelected._id
        receiver: route.params.userSelected._id
  
      },
      config)
    
 
    console.log("message sent successfully")

   
    
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
   
    }
    catch(error){
      console.log(error)
       let msgs =  await AsyncStorage.getItem(`me&${chattId}`)
       if(msgs){
          setMessages(JSON.parse(msgs))
          setloading(false)
       }else{
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
 return  <View style = {{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  alignContent: 'center',
  backgroundColor: 'white',
  paddingBottom: 100,
  height: '100%'
 }}>
  {/*<Feather name="loader" size={40} style={{
    marginRight: 20,
  }} color="black" /> */}
  <ActivityIndicator size="large" color="#000" style = {{marginRight: 0}} />
    
  </View>
}




 

return ( <>



 
    


 




  <View>
     
     </View>
     
     {!loading &&  
   
   <KeyboardAvoidingView 
   behavior='padding'
   keyboardVerticalOffset={
   Platform.select({
      ios: () => -400,
      android: () => -400
   })()
  
 }
 style={styles.bg}
 >
     <View>
     
     <ScrollableFeed messages={messages} latestMessage={latestMess} scrollref={scrollViewRef} />
     </View>
     </KeyboardAvoidingView>}
   
   
    
    {!loading && 
     <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
       keyboardVerticalOffset={
         Platform.select({
            ios: () => 76,
            android: () => 110
         })()
        
       }
       //style={styles.TextSendingcontainer}
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
       placeholder='type your message...'/>
     <Pressable style = {{
       backgroundColor: '#13b955',
       padding: 8,
       borderRadius: 50,
 
     }}
       onPress={() => {
         console.log("new message" + newmessage)
         if(newmessage == null || newmessage == undefined || newmessage == ""){
           console.log('undefined')
         }
         else{
           sendMessage()
           // setcheckContent(true)
           scrollViewRef.current.scrollToEnd()
         }
         // sendMessage()
           // setcheckContent(true)
         //   scrollViewRef.current.scrollToEnd()
       
         
         
       }}>
     {/*<MaterialIcons  name='send' size={24} color = "#17141f" style={{paddingTop: 5, paddingRight: 3}} /> */}
     <FontAwesome name="send" size={18} color="#fff" style={{paddingTop: 5, paddingRight: 3}} />
     </Pressable>
 
     </SafeAreaView>
 
  
  </KeyboardAvoidingView>
  }
 
 
 
 
 </>  
     
   
   
    
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
  loader1: {
   
  },
  text2: {
    color: "green",
    
    marginTop: "150%",
    
    marginLeft: 165,
    // borderColor: "red",
    // borderWidth: 10,
    justifyContent: "center",
    width: "40%"


 },
 input: {
  flex: 1,
  backgroundColor: "white",
  padding: 5,
  paddingHorizontal: 10,
  marginHorizontal: 10,
  borderRadius: 50,
  borderColor: "lightgray",
  borderWidth: StyleSheet.hairlineWidth,
},
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
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginRight:6,
    borderRadius: 10,
    width: "90%",
    height: 45,
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 3,
    // marginTop: -30,
    //borderColor: "lightgray",
    //borderWidth: StyleSheet.hairlineWidth,
},
camera: {
   marginTop: 0,
   fontSize: 20
},
text :{
  marginTop: 20
},
container2: {
  // flex:1,
  // marginTop: 200,
  // marginLeft: 180,
  // backgroundColor: "black"
},
container3: {
  // flex:1,
  // marginTop: 200,
  // marginLeft: 180,
  // backgroundColor: "black"
},
camera: {   
  // flex: 1,
 height: "100%"
},
preview: {
  alignSelf: 'stretch',
  flex: 1
}

  
});