import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {View, Text,FlatList, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView, AppState, Platform} from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux'
import ChatListItem from '../components/Chats/ChatListItem'
// import ChatListHeader from '../components/Chats/ChatListItem/ChatListHeader'
import { ChatState } from '../context/ChatProvider'
import { fetchChat, reset } from '../features/chat/chatSlice'
import { getSender, getSenderFull } from '../ChatConfig/ChatLogics'
import Test from './Test'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import moment from 'moment'
import { allMessages } from '../features/message/messageSlice'
import {Avatar,  Badge, Icon, withBadge } from '@rneui/themed';
// import { Badge } from '@rneui/themed';
import dayjs from 'dayjs'
import ChatListHeader from '../components/Chats/ChatListItem/ChatListHeader'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client'
import { useRoute } from '@react-navigation/native'
import moment from 'moment/moment'
import { Octicons } from '@expo/vector-icons';
import { API_BASE_URL, API_BASE_URL_Socket } from '../utils/config'
import ChatItem from '../components/Chats/ChatItem'

const ChatScreen = () => {
   
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
    // const { onlineStatus } = useSelector((state) => state.auth)
    const [onlineStatus, setonlineStatus] = useState(false)
    const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
    const {triggerChange, settriggerChange, loading,  setloading} = ChatState();
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
      chattId, setchattId,
      checkContent, setcheckContent,
      TtriggerChange, setTtriggerChange,
      YtriggerChange, setYtriggerChange,
      OtriggerChange, setOtriggerChange,
      // onlineStatus, setonlineStatus
      } = ChatState();
      // console.log(" yesterday trigger" + YtriggerChange)
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [Today, setToday] = useState(false);
    const [Yesterday, setYesterday] = useState(false);
    const [otherDs, setotherDs] = useState(false);
    var otherDates = null
    var yesterdaytest = null
    var todaytest = null
    const ENDPOINT = "http://192.168.100.2:5000"
    var socket = useRef(null)
    var formatted_date = null
    // var chat1= []
    // var chat2= []
    // var chat3= []
    var chatArrAll= []
    // var socket = io(API_BASE_URL_Socket)
    // const chatArr = []
    // const chatArr2 = []
    const TodaysChats = []
    const YesterdaysChats = []
    const OtherChats = []
    const API_URL = `${API_BASE_URL}chat/`
    const route = useRoute()
    
    const [users, setUsers] = useState({})
    const [socketConnected, setsocketConnected] = useState(false)
    const [NotifFlag, setNotifFlag] = useState(false)
    // var storedNotifications = []
    const [storedNotifications, setstoredNotifications] = useState([])
    const [notifChat, setnotifChat] = useState()
    const openMenu = () => setVisible(true);
    
    const closeMenu = () => setVisible(false);
      const socketURL = API_URL + '5000'
    const [messageOnce, setmessageOnce] = useState(false)
   
    var formatted_other_date = null
    // console.log('connected socket')
    // console.log(socketConnected)
    // var doubleJeopardy = null
    // console.log(socketURL)
    useLayoutEffect(() => {
      // console.log("before" + socket.current)
      socket.current = io(API_BASE_URL_Socket)
      socket.current.emit("setup", user);
      socket.current.on("connected", () => setsocketConnected(true) )
      // console.log("socket connected" + socketConnected)
    //  console.log('socket connection')
    //  console.log(socket.current)
     
     
      
    },[])
    // useEffect(() => {
    //   const eventListener = (data) => {
    //     console.log('data ja')
    //    console.log(data.content)
    // };
    
    // socket.current.on("message recieved", eventListener);
    // // return () => socket.current.off("message recieved", eventListener);
    // // return () =>  socket.current.off('message recieved', eventListener)
    // return () =>   socket.current.disconnect()
  
    // // socket.current.off("message recieved", eventListener);
    //   // socket.current.on("message recieved", (newMessageReceived) => {
    //   //   console.log('chat screen ')
       
    //   //   // storeNotif(newMessageReceived)
       
    //   //   socket.current.off("message recieved");
  
           
       
    //   // })
  
  
    // },[socket])
    useEffect(() => {
      socket.current.on("message recieved", (newMessageReceived) => {
        // console.log(newMessageReceived)
        storeNotif(newMessageReceived)
      });
    },[])
   
    
    // useEffect(() => {
    
    // storeNotif()
  
  
    // }, [])
    // useEffect(() => {
    
    //   if(storedNotifications.length > 0){
    //     setNotifFlag(true)
    //   }
    //   else{
    //     setNotifFlag(false)
    //   }
  
  
    // }, [NotifFlag])
//     useEffect(() => {
//         if(chatSelected== true){
//           dispatch(fetchChat())
//           setchatSelected(false)
          
//         }
//         else{
//          return
//           }  
//       })
useEffect(() =>{
    dispatch(fetchChat())
}, [fetchAgain])
// useEffect(() =>{
// //     console.log(route.name)
// // }, [])
useEffect(() =>{
    dispatch(fetchChat())

}, [user])
useEffect(() => {
  navigation.addListener('focus', () => dispatch(fetchChat()))
  
  }, [])

useEffect(() => {
  if(todaytest == true){
    setToday(true)
    setotherDs(false)
    setYesterday(false)
  }
  else{
    setToday(false)
  }
  },[Today])

useEffect(() => {
  if(yesterdaytest == true){
    setYesterday(true)
    setotherDs(false)
    setToday(false)
  }
  else{
    setYesterday(false)
  }
  },[Yesterday])
  // useEffect(()=> {

  // }, [storedNotifications])
  // setstoredNotifications([])
 const storeNotif = (newMessageReceived) => {
  // storedNotifications = []
  // storedNotifications.push(123)
  // setNotifFlag(true)
  // console.log("new messages content" + newMessageReceived.content)
//  setstoredNotifications([])
 setstoredNotifications(current => [...current, newMessageReceived]);
//  setstoredNotifications(123);
//  console.log("stored notifff" + storedNotifications)
// setstoredNotifications(null)
//  console.log('stored notif broftr' + storedNotifications.length)
 
// setstoredNotifications([newMessageReceived])
//  storedNotifications.push(123)
//  setstoredNotifications([])
//  console.log('stored notif after' + storedNotifications.length)
 }
//  console.log("stored notifcations array " + storedNotifications.length)

       return(
        
        <>
            
            <ScrollView style = {{
              backgroundColor: '#fff',
              paddingTop: 10
            }}>
             
             {/* <ChatListHeader chatArr={chatArrAll}/> */}
             {/* <ChatListHeader TchatArr={chat1} YchatArr={chat2} OchatArr={chat3}/> */}
             {/* <ChatListHeader TchatArr={chat1} YchatArr={chat2} OchatArr={chat3} /> */}
          
            { chattts && chattts.length > 0 ? (chattts.map((chat) => {
              let newMessage
              // chatArrAll.push(chat)
              if(chat !== null || chat !== undefined){
              // console.log(chat.lastestMessage)

                // if(chat.lastestMessage !== undefined || chat.lastestMessage !== null  ){
                if(chat.lastestMessage == undefined || chat.lastestMessage == null  ){
                  // console.log('undefined chat(s)')
                null
                 
                }
                if(chat.latestMessage){
                  // reserved for displaying a single chat box for no messages rather than multiple
                  // console.log('chat exists')
                  // chatArr2.push(chat)
                  // setSelectedChat(chat)
                  let msgdate = null
                  msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
                  let today = moment()
                  let d = today.diff(msgdate, 'days')
                  if(d==0){
                    var formatted_date = null 
 if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
  
     formatted_date = moment(chat.latestMessage.createdAt).format("LT")
   
 }
                    // TodaysChats.push(chat)
                    // chat1.push(chat)
                    // if(triggerChange == false){

                    
                    return <Pressable key={chat._id} onPress={() => 
                      {
                        setloading(true)
                        setchattId(chat._id)
                        // chatArr2.push(chat)
                        setSelectedChat(chat)
                      navigation.navigate('Messaging', {userSelected:
                        
                      user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
                          <View>
                          <Image 
                              source={{uri: user != null ? getSenderFull(user, chat.users)?.profilePic : null}}  
                              style = {styles.image}
                           />
                          </View>
                             
                          <View style = {styles.content}>
                              <View style = {styles.row}>
                                  <Text style = {styles.name}>
                                      {user != null ? getSenderFull(user, chat.users)?.firstName : null}
                                  </Text> 
                               <Text style = {styles.subTitle}>
                                     
                                      
                                    {formatted_date}
                                  </Text> 
                                 
                                
                              </View>
                             
                              
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ?
                              <View style = {{
                                flexDirection: 'row'
                              }}>
                                
                                <View>
                                <Text  numberOfLines={2} style = {styles.subTitle}>
                                  {chat.latestMessage.content}
                                </Text>
                                    {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
                                  </View>
                                  
                              </View>
                              
                              
                                 : <Text>File Uploaded</Text> }
                                 {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 ? <View style={styles.notif}>
                                    <Text style={styles.notifClr}>{storedNotifications.length}</Text>
                                  </View> : <Text></Text> }  */}
                                 {storedNotifications  && storedNotifications.map((notif) => {
                               
                              //  console.log('bbnn',notif)
                                    if(notif == undefined){
                                      console.log('notif undefined')
                                    }
                                    else{
                                      if(notif.chat._id == chat._id){
                                        return <View style={styles.notif}>
                                       
                                       <Octicons name="dot-fill" size={24} color="red" />
                                      </View>
                                      }
                                    }
                                    
                                  
                                  
                                  
                                 })
                                 } 
                               {/* <Text>notifffehih</Text> */}
                                 {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 
                                  &&  <View  style={styles.notif}><Text>notif</Text></View>
                                 }  */}
                             
                          </View>
                          </Pressable>
                    // }
                    
                    
                  }
                  else if(d == 1){
                    // if(triggerChange == false){
                    return <Pressable key={chat._id} onPress={() => 
                      {
                        setloading(true)
                        setchattId(chat._id)
                        // chat2.push(chat)
                        // chatArr2.push(chat)
                        setSelectedChat(chat)
                      navigation.navigate('Messaging', {userSelected:
                        
                      user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
                          <View>
                          <Image 
                              source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                              style = {styles.image}
                           />
                          </View>
                            
                          <View style = {styles.content}>
                              <View style = {styles.row}>
                                  <Text style = {styles.name}>
                                      {user != null ? getSenderFull(user, chat.users).firstName : null}
                                  </Text> 
                               <Text style = {styles.subTitle}>
                                     
                                      
                                  Yesterday
                                  </Text>  
                                
                              </View>
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined ) && chat.latestMessage.content != "" ?
                              <View style = {{
                                flexDirection: 'row'
                              }}>
                                
                                <View>
                                <Text  numberOfLines={2} style = {styles.subTitle}>
                                  {chat.latestMessage.content}
                                </Text>
                                    {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
                                  </View>
                                 
                              </View>
                              
                                 : <Text>File Uploaded</Text> }
                          </View>
                          </Pressable>
                    // }
                    // YesterdaysChats.push(chat)
                    // chat2.push(chat)
                   
                  }
                  else{
                  var formatted_date = null 
 if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
   
     formatted_date = moment(chat.latestMessage.createdAt).format("DD/MM/YY")
  
   
 }
  //  if(triggerChange == false){

 
 return <Pressable key={chat._id} onPress={() => 
   {
     setloading(true)
     setchattId(chat._id)
     setSelectedChat(chat)
   navigation.navigate('Messaging', {userSelected:
     
   user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
       <View>
       <Image 
           source={{uri: user != null ? getSenderFull(user, chat.users)?.profilePic : null}}  
           style = {styles.image}
        />
       </View>
         
       <View style = {styles.content}>
           <View style = {styles.row}>
               <Text style = {styles.name}>
                   {user != null ? getSenderFull(user, chat.users)?.firstName : null}
               </Text> 
            <Text style = {styles.subTitle}>
                  
                   
                 {formatted_date}
               </Text>  
             
           </View>
           {(chat.latestMessage !== null || chat.latestMessage !== undefined ) && chat.latestMessage.content != "" ?
           <View style = {{
             flexDirection: 'row'
           }}>
             
             <View>
             <Text  numberOfLines={2} style = {styles.subTitle}>
               {chat.latestMessage.content}
             </Text>
                
               </View>
              
           </View>
           
              : <Text>File Uploaded</Text> }
       </View>
       </Pressable>
  //  }
                    // OtherChats.push(chat)
                    // chat3.push(chat)
                    
                  }
                  
                }
                

              
            }

    
                  })): (
                    <>
                   
                    {Platform.OS == 'android' ?<View style = {{
                      alignItems:'center',
                      justifyContent: 'center',
                      // height: '100%',
                      paddingTop: 30
                    }}>
                      <Image 
                      source = {require ('../../assets/images/pug_glasses.jpeg')} 
                      style = {{
                          width: 260,
                          height: 200,
                          resizeMode: 'cover',
                          marginBottom: 20,
                          background: 'white'
                      }}
                      />
                      <Text style = {{
                        fontSize: 18,
                        marginBottom: 20,
                        marginHorizontal: 10,
                      }}>Security Doggo wants you to start a new chat</Text>
                      
                      <View style={styles.connectBtn} >
                         <Pressable onPress={() => navigation.navigate("Connect")}>
                      <Text style={{
                        fontSize: 18,
                        color: 'white',
                      }} >Click here to start chatting </Text>
                      </Pressable>
                      </View>
                      
                        
                      </View> :  <View style = {{
                      alignItems:'center',
                      justifyContent: 'center',
                      height: '100%',
                      paddingTop: 30
                    }}>
                      <Image 
                      source = {require ('../../assets/images/pug_glasses.jpeg')} 
                      style = {{
                          width: 260,
                          height: 200,
                          resizeMode: 'cover',
                          marginBottom: 20,
                          background: 'white'
                      }}
                      />
                      <Text style = {{
                        fontSize: 18,
                        marginBottom: 20,
                        marginHorizontal: 10,
                      }}>Security Doggo wants you to start a new chat</Text>
                      <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                      <Text style={{
                        fontSize: 18,
                        color: 'white',
                      }} >Click here to start chatting </Text>
                      </Pressable> 
                      </View>}
                      </>
            )
            
                  
            } 
         
              
           
             
            
    
              </ScrollView> 
              </>
            
        )
}

export default ChatScreen

const styles = StyleSheet.create({
  con: {
   
  
     
      marginTop: 200,
      borderRadius: 15,
     
    
},
connectBtn: {
  // backgroundColor: "red",
  backgroundColor: '#593196',
  width: "65%",
  height: 43,
  borderRadius: 10,
  alignItems:'center',
  justifyContent: 'center'
  
},
connectTxt: {
  fontSize: 20,
},

text: {
 
  marginTop: 200,
},
buttonStyle: {
  backgroundColor: "darkmagenta",
  height: 50,
  marginBottom: 20,
  justifyContent: "center",
  marginHorizontal: 15,
  borderRadius: 15,
},
buttonText: {
  fontSize: 20,
  textAlign: 'center',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 'bold'
},
container: {
  flexDirection: 'row',
  marginHorizontal: 10,
  marginVertical: 5,
  height: 70,
  backgroundColor: '#fff'
},
notif: {
  alignItems: 'flex-end',
  
  
  
},
notifClr: {
  color: 'red',
  // paddingTop: 10
  
  
},
image: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginRight: 10
},
content: {
  flex: 1,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: 'lightgray'
},
row: {
  flexDirection: 'row'
},
name: {
  flex: 1,
  fontWeight: 'bold',
  fontSize: 16
},
subTitle: {
  color: "gray",
  marginTop: 2,
  marginLeft: 2,
  fontSize: 15
},
Tex: {
  marginTop: 200
}

})