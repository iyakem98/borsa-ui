import { ActivityIndicator, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text} from 'react-native';

import { useDispatch, useSelector } from "react-redux";

import { useRoute } from '@react-navigation/native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import ScrollableFeed from '../components/Chats/ScrollableFeed.js/ScrollableFeed';
import io from 'socket.io-client'
import { ChatState } from '../context/ChatProvider';
import { fetchChat } from '../features/chat/chatSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagingScreen = () => {
  const { user } = useSelector((state) => state.auth)
  const [newmessage, setNewMessage] = useState();
  const route = useRoute()
  const dispatch = useDispatch()
  const {chatId} = route.params;
  const {userSelected} = route.params;
  const [messages, setMessages] = useState([])
  const ENDPOINT = "http://172.20.10.2:5003"
  var socket = useRef(null)
  var selectedChatCompare = null;
  const [socketConnected, setsocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { selectedChat, setSelectedChat,fetchAgain, setfetchAgain,  chats, setChats, notification, setNotification } = ChatState(); 
  // const [mesages, setMesages] = useState()
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  
  
  useLayoutEffect(() => {
  
    // fetchMessage()
    socket.current = io(ENDPOINT)
    socket.current.emit("setup", user);
    // socket.emit("findChat", chatId)
    socket.current.on("connected", () => setsocketConnected(true) )
   
    socket.current.on("typing", () => setIsTyping(true))
    socket.current.on("stop typing", () => setIsTyping(false))
   
    
  }, [])
  useEffect(() =>{
    fetchMessage()
    selectedChatCompare = selectedChat
    // console.log(notification)
   
  
    // console.log(fetchAgain)
  
  }, [selectedChat])
  // console.log(notification)
  // useEffect(() => {
  //   // console.log(chatId)
  //   // console.log(socket.current)
  //   // console.log(selectedChat._id)
  //   // setNotification([100]);
  //   //     setNotification((state) => {
  //   //           console.log(state)
  //   //           return state
  //   //         })
  //   socket.current.on("message recieved", (newMessageReceived) => {
  //    console.log(newMessageReceived.chat)
  //     if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
  //       console.log(newMessageReceived.chat)
        
  //       if (!notification.includes(newMessageReceived)) {
  //         setNotification([ newMessageReceived]);
  //         console.log(notification)
  //         setNotification((state) => {
  //           console.log(state)
  //           return state
  //         })
  //         setfetchAgain(!fetchAgain)
  //         setfetchAgain((state) => {
  //           console.log(state)
  //           return state
  //         })
          
          
  //       }
          
  //       }
      
  //     // else{
  //     //   setMessages([...messages, newMessageReceived])
  //     // }
      
  //   })
   
  // })
  useEffect(() => {
    socket.current.on("message recieved", (newMessageReceived) => {
    //  console.log(newMessageReceived.chat._id)
     if((!selectedChatCompare) || selectedChatCompare._id !== newMessageReceived.chat._id){
      if (!notification.includes({newMessageReceived})) {
        // console.log(newMessageReceived.chat)
                setNotification([...notification,  newMessageReceived]);
                // console.log(notification)
                setNotification((state) => {
                  // console.log(state)
                  return state
                })
                // console.log(notification)
                storeNotifcation(notification, newMessageReceived.chat)
                // storeNotifcation(notification)
               
                
                setfetchAgain(!fetchAgain)
                setfetchAgain((state) => {
                  // console.log(state)
                  return state
                })
                // console.log(fetchAgain)
     }

    }
    else{
      setMessages([...messages, newMessageReceived])
    }   
         
     })

  })

  const storeNotifcation = async(notification, chat) => {
    try{
          await AsyncStorage.removeItem("notification")
          await AsyncStorage.removeItem("chat")
      // console.log(notification)
          await  AsyncStorage.setItem("notification", JSON.stringify(notification))
        //  await AsyncStorage.getItem('notification')
          await  AsyncStorage.setItem("notifChat", JSON.stringify(chat))
          // const getChatnotif = await AsyncStorage.getItem('notifChat')
        // // const chatnotif = await  AsyncStorage.setItem("notifChat", JSON.stringify(chat))

        // console.log(JSON.parse(getChatnotif))
        // // console.log(AsyncStorage.getItem(JSON.parse(chatnotif)))
    }
    catch(err){
      console.log("cannot store notificaiton/chat")
    }
      
   
  }
  
//     useLayoutEffect(() =>{
//       socket.on("message recieved", (newMessageReceived) => {
//         setMessages([...messages, newMessageReceived])
//       })
//     // fetchMessage()
    
//  }, [socket])

  const sendMessage = async() => {
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        }
    }

    setNewMessage("")
    const {data} = await axios.post('http://172.20.10.2:5003/api/message/', {
      content : newmessage,
      chatId: chatId
    },
    config)
    
    // console.log(data)
    socket.current.emit("new message", data)
    setMessages([...messages, data])
    setfetchAgain(true)
    setfetchAgain(false)
    return data
    }
    catch(error){
      // console.log('sending message is not possible')
    }
  }
  
  const fetchMessage = async() => {
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        }
    }

   
    const {data} = await axios.get(`http://172.20.10.2:5003/api/message/${chatId}`,
    config)
    
    // console.log(data)
    // console.log(mesages) 
    setMessages(data)
    setMessages((state) => {
      // console.log(state)
      return state
    })
    socket.current.emit("join chat", chatId)
    return data;
   
    }
    catch(error){
      // console.log('fetching message is not possible')
    }

  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
     
    if(!socketConnected) return

    if(!typing) {
     setTyping(true)
     socket.current.emit('typing', chatId);
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
     var timeNow = new Date().getTime();
     var timeDiff = timeNow - lastTypingTime;

     if(timeDiff >= timerLength && typing) {
         socket.current.emit("stop typing", chatId)
         setTyping(false)
     }
    }, timerLength);
 }
  


 

  return (
   
  //     <GiftedChat
  //   // messages={messages}
  //   // onSend={newMessage => handleSend(newMessage)}
  //   onSend={sendMessage()}
    
  //   user={{ _id: 1 }}
  //   placeholder="Type your message here"
  //   alwaysShowSend
  //   renderSend={renderSend}
  //   scrollToBottom
  //   renderLoading={renderLoading}

  // />
//   <SafeAreaView edges={['top']} style = {styles.container}>
//   <AntDesign name='plus' size = {24} color = "#593196"/>
//   <TextInput 
//       value={newmessage}
//       onChangeText={setNewMessage}
//       style = {styles.input} 
//       placeholder='type your message...'/>
//   <MaterialIcons style = {styles.send} name='send' size={24} color = "#17141f"/>
// </SafeAreaView>
/* <KeyboardAvoidingView 
   style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
   behavior="position"
 > 
//  </KeyboardAvoidingView>*/
<>
    <View>
    <ScrollableFeed messages={messages} />
    </View>
  

   <SafeAreaView   style={{position: 'absolute', left: 0, right: 0, bottom: 0,flexDirection: "row",
   backgroundColor: "#f9f8fc",
   padding: 5,
   paddingHorizontal: 10,}}
   behavior="position"> 
   {/* <AntDesign name='plus' size = {24} color = "#593196"/> */}
    {isTyping ? <View>
    <Text> isloading... </Text>
    </View> : null}
   <TextInput 
      value={newmessage}
      onChangeText={setNewMessage}
      onChange={typingHandler}
      style = {styles.input} 
      placeholder='type your message...'/>
    <Pressable onPress={() => sendMessage()}>
    <MaterialIcons  name='send' size={24} color = "#17141f"/>
    </Pressable>
  
</SafeAreaView> 

</>  
    
  
  
   
  )
}



export default MessagingScreen

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f8fc",
    padding: 5,
    paddingHorizontal: 10,
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
send: {
   
}
  
});