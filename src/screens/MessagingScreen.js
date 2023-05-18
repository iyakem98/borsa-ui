import { TouchableOpacity, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image, Platform, Keyboard, ScrollView, ActivityIndicator, Dimensions, FlatList} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [pushnotification, setpushNotification] = useState(false);
  const [latestMess, setlatestMess] = useState();
  const [isActive, setIsActive] = useState(false);

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

  useEffect(()=>{
    socket.current=io(API_BASE_URL_Socket)
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setsocketConnected(true))
    socket.current.emit("active", chattId)
    socket.current.emit("seen", chattId)
    socket.current.on("typing", () => setIsTyping(true))
    socket.current.on("stop typing", () => setIsTyping(false))
    socket.current.on("active", () => setIsActive(true))
    socket.current.on("inActive", () => setIsActive(false))
    return () => {
      socket.current.emit("inActive", chattId)
      socket.current.emit("stop typing", chattId)
    }
  } ,[])

  useEffect(()=>{}, [])

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
    setMessages(data?.data, newMessageReceived)
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
  }
  
  const fetchMessage = async(pageNum) => {
    console.log('fetching messages')
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`${API_BASE_URL}message/${chattId}`,
      config)
      await AsyncStorage.setItem(`me&${chattId}`, JSON.stringify(data?.data))
      
      setloading(false)

      setMessages(data?.data)
      setNewwMessage(false)
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
  
  const fetchWithPageMessage = async(pageNum) => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`${API_BASE_URL}message/${chattId}?page=${pageNum}`,
      config)

      setMessages((prev)=>[...prev, ...data.data])
      socket.current.emit("join chat", chattId)
      return data;
    } catch(error){
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
          isActive={isActive}
          user={user}
          selectedChat={selectedChat}
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
          renderItem={(item, i) => {
            let m = item?.item;
            const formatted_date =  moment(m.createdAt).format("LT");
            return (
              <View style = {[styles.container, {
                backgroundColor: m.sender._id === user._id ? "#593196" : "#E8E8E8",
                alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                marginTop: isSameUser(messages, m , i , user._id) ? 5 : 10, 
                borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
              }]}>
                <Text key={m._id} style={{color: m.sender._id === user._id ? "white" : "black"}}>
                  {m.content}
                </Text>
                <View style={{flexDirection:"row", marginTop: 2, alignItems: "center"}}>
                  <Text style={{
                    color: m.sender._id === user._id ? "#fff" : "#404040",
                    fontSize: 12,
                  }}>{formatted_date}</Text>
                  {m.sender._id === user._id  && m.receiver != null && m.marked ? (
                    <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
                  ) : m.sender._id === user._id  && m.receiver != null && !m.marked ? (
                    <Ionicons name="checkmark-outline" size={17} color="white" />
                  ) : null}
                </View>
              </View>
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