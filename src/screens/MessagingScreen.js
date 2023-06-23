import { TouchableOpacity, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image, Platform, Keyboard, ScrollView, ActivityIndicator, Dimensions, FlatList} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ScrollableFeed from '../components/Chats/ScrollableFeed.js/ScrollableFeed';
import io from 'socket.io-client'
import { ChatState } from '../context/ChatProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
import { API_BASE_URL, API_BASE_URL_Socket } from '../utils/config';
import moment from 'moment';
import { isSameUser } from '../ChatConfig/ChatLogics';
import HeaderChat from '../components/Shared/HeaderChat';
import ChatInput from '../components/Chats/ChatInput';
import MessageTemplate from '../components/Message/MessageTemplate';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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
  const [newmessage, setNewMessage] = useState("");
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
  const [pageNum, setPageNum] = useState(1)
  let prevDate = 0
  const [messagesLength, setMessagesLength] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [pushnotification, setpushNotification] = useState(false);
  const [latestMess, setlatestMess] = useState();
  const [isActive, setIsActive] = useState(false);
  const [active, setIsactive] = useState(false);
  const [activeTrigger, setactiveTrigger] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const {messageHeader, setmessageHeader} = ChatState()
  const publicFolder = "http://192.168.100.2:5000/images/"
  // var active = false
  var selectedChatCompare = null;
  var chatRouteCompare = null;

  let todayDateLabel = false;
  let yesterdayDateLabel = false;
  let olderDateLabel = false;
  let dateDiff;
  let todayDate = false;
  let yesterdayDate = false
  let olderDate = false

  var socket = useRef(null);
  const scrollViewRef = useRef();
  const myRef = createRef();  
  const cameraRef = useRef();

  const allowsNotificationsAsync = async() => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }

  const sendPush = async(newMessage) => {
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()
    try {
      if(hasPushNotificationPermissionGranted){
        await Notifications.scheduleNotificationAsync({
           content: {
             title: "New message! 📬",
             body: newMessage?.content,
             data: { data: 'goes here' },
           },
           trigger: { seconds: 2 },
         });
       
       } else {
         const { status } = await Notifications.requestPermissionsAsync();
       }
    } catch (e) {
      console.log("NOTIFICATION Permission: ", e)
    }
  }

  useLayoutEffect(()=>{
    socketCall()
    
  } ,[])
 
  useEffect(()=>{
   
    console.log('check to see if active value', isActive)
    
  }, [active])

  useEffect(()=>{
    setMessagesLength(messages.length)
  }, [messages])

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
      console.log("first", newMessageReceived)
      sendPush(newMessageReceived);
    })
  }, [])

  useEffect(() =>{  
    if(socketConnected){
     
        activeHandler() 
      
     
    }  
  }, [socketConnected, isActive])
 
  // useEffect(() =>{  
  //   // console.log('is active value in mess', isActive)
  //   console.log('is active value in mess', isActive)
     
  //  }, [active])

  const [datesShown, setDatesShown] = useState([])
const socketCall = () =>{
  socket.current=io(API_BASE_URL_Socket)
  socket.current.emit("setup", user);
  socket.current.on("connected", () => setsocketConnected(true))
  // socket.current.emit("active", chattId)
  // socket.current.emit("seen", chattId)
  socket.current.on("active", () => setIsActive(true))
  socket.current.on("inActive", () => setIsActive(false))
  socket.current.on("typing", () => setIsTyping(true))
  socket.current.on("stop typing", () => setIsTyping(false))
//  console.log('socket current active value', socket.current.active)
  // return () => {
  //   socket.current.emit("inActive", chattId)
  //   socket.current.emit("stop typing", chattId)
  // }
}
  const testNewMessages = async(newMessageReceived) => {
    const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
      }
    })
    setMessages(data?.data, newMessageReceived)
  }

  const sendMessage = async() => {
    setlatestMess(newmessage.trim())
    setactiveToday(true)
    setNewwMessage(true)
    setNewMessage('')
    let now = moment()
    setMessages([{
      content: newmessage,
      createdAt: now,
      isLoading: true,
      _id: 60,
      sender: {
        _id: user._id
      }
    }, ...messages])
    try{
      const {data} = await axios.post(`${API_BASE_URL}message/`, {
        content : newmessage,
        chatId: chattId,
        image: "",
        receiver: route.params.userSelected._id
      }, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
        }
      })
      socket.current.emit("new message", data)
      setMessages([data, ...messages])
      setNewwMessage(false)
      setmessageSentOrReceived(false)
      setfetchAgain(true)
      setfetchAgain(false)
      setNewMessage('')
      return data
    }
    catch(error){
      console.log(error)
    }
    setloading(false)
  }
  
  const fetchMessage = async(pageNum) => {
    setloading(true)
    try{
      let msgs =  await AsyncStorage.getItem(`me&${chattId}`)
      if(msgs){
        setMessages(JSON.parse(msgs))
      } else {
        setMessages([])
      }
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
        }
      }
      console.log("-=-=--=")
      const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`,
      config)
      await AsyncStorage.setItem(`me&${chattId}`, JSON.stringify(data?.data))

      setMessages(data?.data)
      setNewwMessage(false)
      console.log("-=-=")
   
    } catch(error){
      console.log(error)
    }
    setloading(false)
  }
  
  const fetchWithPageMessage = async(pageNum) => {
    setloading(true)
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
        }
      }
      const {data} = await axios.get(`${API_BASE_URL}message/${chattId}?page=${pageNum}`,
      config)

      setMessages((prev)=>[...prev, ...data.data])
      socket.current.emit("join chat", chattId)
    } catch(error){
    }
    setloading(false)
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
  const activeHandler = (e) => {
    console.log('initiating active handler')
    // socket.current.emit("connected");
    // console.log(socket.current.emit('inActive', chattId))
    // console.log('is active value after inactivity', socket.current.active )
    var timerLength = 1000
   
    socket.current.emit('active', chattId)
    // setActiveHandler()
    // console.log('is active value after activity', isActive )
    // console.log('socket current inactive value', socket.current.inActive)
    setTimeout(() => {
      console.log('isactive value in active handler', isActive)
      }, timerLength);
    // console.log('socket current connection value', socket.current.connected)
    // if(socket.current.active){
    //   setIsActive(true)
    // }
    // console.log('socket current active value', socket.current.active)
    // socket.current.emit("active", chattId);
    // setIsactive(true)
    // console.log(isActive)
    // console.log('active value', active)
    // console.log('socket connected value', socketConnected)
    // console.log('is active value', isActive)
    // // if(!socketConnected) return

    // if(!active) {
    //   // console.log('active before', active)
    //   setIsactive(true)
    //   setIsActive(true)
    //   // console.log('active after', active)
    //   socket.current.emit('active', chattId);
   
    
      
    // }
    // if(active) {
    //   // console.log('active before', active)
    //   setIsactive(false)
    //   // console.log('active after', active)
    //   socket.current.emit('active', chattId);
   
    
      
    // }
    
    
  }
  const setActiveHandler = () =>{
    var timerLength = 5000
    setTimeout(() => {
        console.log('isactive value in active handler', isActive)
        }, timerLength);
    // setInterval(() => {
    //     console.log('isactive value in active handler', isActive)
    //     }, timerLength);

  }
  const InactiveHandler = (e) => {
   
   
    if(!socketConnected) return

    if(isActive) {
      
      // setIsActive(false)
      socket.current.emit('inActive', chattId);
   
    
      
    }
    
    
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff",
      height: height
    }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={{
        position: "relative",
        flex: 1,
        height: height - 200
      }}>
        <HeaderChat
          // isActive={isActive}
          // isActive={isActive}
          onGoBack={()=>navigation.pop()}
          isActive={setActiveHandler}
          isActive2={isActive}
          active={active}
          activeHandler={activeHandler}
          user={user}
          selectedChat={selectedChat}
          userSelectedFromConnectCard={userSelected ? userSelected : null}
          isTyping={isTyping}
          loading={loading}
        />
        <FlatList
          data={messages}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          inverted
          maxToRenderPerBatch={2}
          renderItem={(item) => {
            let today = moment();
            let m = item?.item;
            let i = item?.index;
            let d = m?.createdAt ? today.diff(m?.createdAt, 'days') : null;

            let dateVisible = false

            let sameDate = messages.filter(
              (mes) =>
              today.diff(mes?.createdAt, 'days') == d
            );

            if(sameDate.indexOf(m)== sameDate.length-1){
              dateVisible = true
              if(d==0){
                d = "Today"
              }
              else if(d==1){
                d = "Yesterday"
              }
              else if(d>1 && d<=7){
                d = moment(m?.createdAt).format("MMM, DD ddd")
              }
              else if(d>7 && d<365){
                d = moment(m?.createdAt).format("MMM D")
              }
              else{
                d = moment(m?.createdAt).format("MMM D YYYY")
              }
            }

            // console.log("chats are", dateVisible)

            return (
              <>
              
              <MessageTemplate
                m={m}
                user={user}
                i={i}
                todayDateLabel={todayDateLabel}
                yesterdayDateLabel={yesterdayDateLabel}
                olderDateLabel={olderDateLabel}
                todayDate={todayDate}
                yesterdayDate={yesterdayDate}
                olderDate={olderDate}
                prevDate={prevDate}
                // d={d}
              />

              {
                dateVisible &&
              <Text style={{alignSelf:"center", marginTop:4, marginBottom:4}}>{d}</Text>
              }
            </>

            )
          }}
          onEndReached={() => {
            fetchWithPageMessage(pageNum+1)
            setPageNum((prev) => prev+1)
          }}
        />
        <ChatInput
          sendMessage={sendMessage}
          newmessage={newmessage}
          setNewMessage={setNewMessage}
          chattId={chattId}
          socket={socket}
          typing={isTyping}
          typingHandler={typingHandler}
          activeHandler={activeHandler}
        />
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
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
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
  },
  container: {
    //backgroundColor: "#E8E8E8",
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    
    shadowOpacity: 0.10,
    shadowRadius: 1.0,

    elevation: 1,
  },
  container2: {
    //backgroundColor: "#E8E8E8",
    backgroundColor: '#fff',
    marginHorizontal: 10,
    // padding: 10,
    borderRadius: 10,
    // maxWidth: '80%',
    width: "80%",
    // height: 200,

    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    
    shadowOpacity: 0.10,
    shadowRadius: 1.0,

    elevation: 1,
  },
  img : {
    height: 100,
    width: 100,
    marginTop: 10
  },
  time: {
    alignSelf: "flex-end"
  }
});