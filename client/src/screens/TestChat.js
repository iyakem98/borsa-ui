import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {View, Text,FlatList, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView, AppState} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ChatState } from '../context/ChatProvider'
import { fetchChat, reset } from '../features/chat/chatSlice'
import { getSender, getSenderFull } from '../ChatConfig/ChatLogics'
import Test from './Test'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import moment from 'moment'
import { allMessages } from '../features/message/messageSlice'
import {Avatar,  Badge, Icon, withBadge } from '@rneui/themed';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client'
import { useRoute } from '@react-navigation/native'
import moment from 'moment/moment'

function TestChat() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
    // const { onlineStatus } = useSelector((state) => state.auth)
    const [onlineStatus, setonlineStatus] = useState(false)
    const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
    const {triggerChange, settriggerChange} = ChatState();
    const {messages} = useSelector((state) => state.mess)
    const {
            selectedChat, setSelectedChat, 
            chats, setChats, 
            chatSelected, setchatSelected, 
            fetchAgain, setfetchAgain, 
            notification, setNotification,
            receivedMessage, setreceivedMessage,
            sentMessage, setsentMessage,
            messageSentOrReceived, setmessageSentOrReceived,
            // onlineStatus, setonlineStatus
            } = ChatState();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    // const [socketConnected, setsocketConnected] = useState(false)
    const ENDPOINT = "http://192.168.100.2:5000"
    var socket1 = useRef(null)
    var formatted_date = null
    var socket = io(ENDPOINT)
    const chatArr = []
    const chatArr2 = []
    
    const route = useRoute()
    
    const [users, setUsers] = useState({})
    const [socketConnected, setsocketConnected] = useState(false)
    const [storedNotifications, setstoredNotifications] = useState([])
    const [notifChat, setnotifChat] = useState()
    const openMenu = () => setVisible(true);
    
    const closeMenu = () => setVisible(false);

    const [messageOnce, setmessageOnce] = useState(false)
    useEffect(() =>{

        fetchChat()
        
      
    }, [fetchChat])
    const fetchChat = async () => {
      var cancelToken;

        const user1 = await  AsyncStorage.getItem("user")
        const user = JSON.parse(user1)
        // console.log(user)
      
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
          if(typeof cancelToken != typeof  undefined){
            cancelToken.cancel("Cancelling the prev req")
          }
          cancelToken = axios.CancelToken.source()
          
        //   console.log('fetchin in chatService')
          // const response = await axios.get(API_URL, config)
          const {data} = await axios.get('http://192.168.100.2:5000/api/chat/', config, {
            cancelToken: cancelToken.token
          })
          console.log(data)
        //   return data
        
       
        }
        // setTimeout(fetchChat, 1000)
  return (
    <View>
        <Text>test chat section </Text>
    </View>
  )
}

export default TestChat