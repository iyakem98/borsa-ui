import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {View, Text,FlatList, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView, AppState} from 'react-native'
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
import { API_BASE_URL } from '../utils/config'

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
      checkContent, setcheckContent
      // onlineStatus, setonlineStatus
      } = ChatState();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [Today, setToday] = useState(false);
    const [Yesterday, setYesterday] = useState(false);
    const [otherDs, setotherDs] = useState(false);
    var otherDates = null
    var yesterdaytest = null
    var todaytest = null
    const ENDPOINT = "http://192.168.100.2:5000"
    // var socket = useRef(null)
    var formatted_date = null
    var socket = io(ENDPOINT)
    const chatArr = []
    const chatArr2 = []
    const API_URL = `${API_BASE_URL}chat/`
    const route = useRoute()
    
    const [users, setUsers] = useState({})
    const [socketConnected, setsocketConnected] = useState(false)
    const [storedNotifications, setstoredNotifications] = useState([])
    const [notifChat, setnotifChat] = useState()
    const openMenu = () => setVisible(true);
    
    const closeMenu = () => setVisible(false);

    const [messageOnce, setmessageOnce] = useState(false)
   
    var formatted_other_date = null
    // var doubleJeopardy = null
    useEffect(() => {
     
   
      
      
       
        if(chatSelected== true){
          dispatch(fetchChat())
          setchatSelected(false)
          
        }
        
        else{
         return
          }  
       
      
        
 
        
      })
useEffect(() =>{

    dispatch(fetchChat())
    
  
}, [fetchAgain])
useEffect(() =>{

    console.log(route.name)
    
  
}, [])
useEffect(() =>{

    dispatch(fetchChat())
    
    
  
}, [user])
useEffect(() => {
  navigation.addListener('focus', () => dispatch(fetchChat()))
  
  }, [])






useEffect(()=> {
  
 {user && socket.emit('chat_users', {userID : user._id, chatData: chatArr}) }
  
}, [])
useEffect(()=> {
  socket.on('activatedUser', (data) => setUsers(data))
  setonlineStatus(users.onlineStatus)
 
}, [])
// useEffect(() => {
//   console.log(user)
  
//   }, [])
// useEffect(() => {
//   if(todaytest == true){
//     setToday(true)
//     setotherDs(false)
//     setYesterday(false)
//   }
//   else{
//     setToday(false)
//   }
  
//   if(yesterdaytest == true){
//     setYesterday(true)
//     setotherDs(false)
//     setToday(false)
//   }
//   else{
//     setYesterday(false)
//   }
//   if(otherDates == true){
//     setotherDs(true)
//     setToday(false)
//     setYesterday(false)
//   }
//   else{
//     setotherDs(false)
//   }
  
//   },[Today, Yesterday, otherDs])
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

  const getNotif = async() =>{
    // console.log('get notif function')
        const notif  = await AsyncStorage.getItem('notification')
        const notifChat =  await AsyncStorage.getItem('notifChat')
        const parsedNotif = JSON.parse(notif)
        const parsedChat = JSON.parse(notifChat)
       
        
        setstoredNotifications(parsedNotif)
        setnotifChat(parsedChat)
     
      } 
      const UpdateUserRoute = async () => {
    
        try{
          console.log(route.name)
          const userId = user._id
          console.log(userId)
          const   config = {
              
            headers: {
             
              Authorization: `Bearer ${user.token}`
            },
           
           };
      
          const {data} = await axios.put(`http://192.168.100.2:5000/api/users/route`,{
            userId: user._id,
            route: route.name
            
          }, config)
          console.log('user route updated')
       
      
        }
        catch(err){
          console.log(err)
        }
        
       }
      const delChat = async (chatID) => {
        console.log('delete')
        console.log(chatID)
    
        try{
         console.log('deleting chat')
         const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
       await axios.delete(`${API_URL}/${chatID}`, config)
       console.log('chat deleted')
      
        }
        catch(err){
          console.log(err)
        }
        
       }
// console.log("today use state==" +Today)
// console.log("today test state==" +todaytest)
// console.log("yesterday use state==" +Yesterday)
// console.log("yesterday test state==" +yesterdaytest)
// console.log("other use state==" +otherDs)
// console.log("other test state==" +otherDates)
       return(
        
        <>
            
            <ScrollView style = {{
              backgroundColor: '#fff',
              paddingTop: 30,
            }}>
             
            {/* <ChatListHeader chatArr={chatArr2}/> */}
          
            { chattts && chattts.length > 0 ? (chattts.map((chat) => {
           
              if(chat !== null || chat !== undefined){
              // console.log(chat)
                if(chat.lastestMessage !== undefined ){
                 
                  formatted_date = moment(chat.latestMessage.createdAt).format("LT")
                 
                }
                
             
              
             
              chatArr2.push(chat)
              setSelectedChat(chat)
              
              if(chat._id === users.chatID && triggerChange)  {
               
                if(chat.latestMessage != null){
                return <Pressable key={chat._id} onPress={() => 
                      {
                        
                        {chat.latestMessage && chat.latestMessage.sender
                          if(chat.latestMessage.sender._id === user._id){
                            console.log("sender")
                            // setreceivedMessage(true)
                            setsentMessage(true)
                           }
                           
                           else if(chat.latestMessage.sender._id !== user._id){
                            console.log("reciever")
                              // setreceivedMessage(true)
                              setsentMessage(false)
                              // setsentMessage((state) => {
                              //   // console.log(state)
                              //   return state
                              // })
                           }
                           else{
                            null              }
                          }
                        {
            
                        }
                       
                      //     setmessageSentOrReceived(true)
                      //     // recieiver logic 
                      // {chat.latestMessage && chat.latestMessage.sender  && chat.latestMessage.sender._id != user._id ?
                        
                      //     setreceivedMessage(true)
                      //     console.log("ffoefoef")
                        
                       
                        
                      //   :  //if i am the sender then do nothing and set message sent to true
                        
                      //     // setreceivedMessage(false)  
                      //     // setsentMessage(true)
                      //     null
                        
                      //    // else set the message recieved to true 
                      // }
                      // {chat.latestMessage && chat.latestMessage.sender && chat.latestMessage.sender._id != user._id ?
                      //   :
                      //   setmessageSentOrReceived(true)
                      // }
                      
                        
                      
                        // setreceivedMessage(true)
                     setchattId(chat._id)
                     setloading(true)
                      navigation.navigate('Messaging', {userSelected:
                        
                      user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
                          <View>
                          <Image 
                              source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                              style = {styles.image}
                           />
                           
                              { onlineStatus &&  <Badge
                              status="success"
                              containerStyle={{ position: 'absolute', top: 50, left: 45 }}
                                  /> }
                           {/* <Text>badge here</Text> */}
                          </View>
                            
                          <View style = {styles.content}>
                              <View style = {styles.row}>
                                  <Text style = {styles.name}>
                                      {user != null ? getSenderFull(user, chat.users).firstName : null}
                                  </Text> 
                                    <Text style = {styles.subTitle}>
                                      {/* {dayjs(chat.latestMessage).fromNow(true)} */}
                                      {formatted_date}
                                  </Text>   
                              </View>
                              
                             {/* { messages && messages.map((mess) => {
                              mess._id == mess.chat.latestMessage ? 
                                (<Text key={mess._id}  numberOfLines={2} style = {styles.subTitle}>
                                {mess.chat.latestMessage}
                                 </Text>
                              }}
                              // <Text numberOfLines={2} style = {styles.subTitle}>
                              
              
                             ))}  */}
                             {/* { messages && messages.map((mess) => {
            
                              if(mess._id == mess.chat.latestMessage){
                                return <Text   numberOfLines={2} style = {styles.subTitle}>
                                latest message : {mess.content}
                                 </Text>
                              
                              }
                              else{
                                return 
                              }
                               
                                
                              
                              // <Text numberOfLines={2} style = {styles.subTitle}>
                              
              
                             })}  */}
                            
                              {chat.latestMessage && chat.latestMessage.content?
                              // <View style = {{
                              //   flexDirection: 'row'
                              // }}>
            
                              
                              //   {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                                
                              //    <Text  numberOfLines={2} style = {styles.subTitle}>
                              //     {chat.latestMessage.content}
                              //   </Text>
                              // </View>
                              <View>
                                  <Text> {chat.latestMessage.content}</Text>
                                  <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text>
                                </View>
                            
                              
                                 : <Text>File Uploaded</Text> }
                               
                            {/* <Text style = {styles.subTitle} >
                              {chat.latestMessage}
                            </Text> */}
                          </View>
                          </Pressable>
                }
              }
              else{
                if(chat.latestMessage == null || chat.latestMessage == undefined){
                  // const  doubleJeopardy = true
                  // var  doubleJeopardy1 = true
                  // if(doubleJeopardy == true && doubleJeopardy1 == true ){
                  //   doubleJeopardy1 == false
                  //   return <View>
                  // <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                  // <Text style={styles.connectTxt} >No chats available click here to access them </Text>
                  // </Pressable>
                    
                  // </View>

                  // }
                  // return <View>
                  //  <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                  //  <Text style={styles.connectTxt} >No chats available click here to access them </Text>
                  //  </Pressable>
                    
                  //  </View>
                  
                  
                }
                
                // console.log(chat.latestMessage.createdAt)
                if(chat.latestMessage != null || chat.latestMessage != undefined){
                  // console.log(chat.latestMessage.content)
                   formatted_other_date = moment(chat.latestMessage.createdAt).format( "YYYY/MM/DD")
                  // console.log(formatted_other_date)
                  let msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
                  let today = moment()
                  let d = today.diff(msgdate, 'days')
                 
                  if(d==0){
                    console.log(d)
                    console.log('pushing today messags')
                    todaytest = true
                    // otherDates = false
                    // yesterdaytest = false
                    // console.log('toadytest' +todaytest)
                    
                  }
                  else if(d==1){
                    console.log(d)
                    console.log('pushing yesterday messags')
                    yesterdaytest = true
                    todaytest = true
                    otherDates = false
                    console.log('yesterdayteeeest' +yesterdaytest)
                    
                  }
                 
                  else{
                    otherDates = true
                   todaytest = false
                   yesterdaytest = false
                   console.log('othertest' +otherDates)
                    
                  }
                }
               
                // var formatted_date2 = null
                // if(chat.lastestMessage){
                //   formatted_date2 = moment(chat.latestMessage.createdAt).format("LT")
                // }
                // console.log(formatted_date2)
                //   if(chat.lastestMessage !== null){
                //     // console.log('455')
                //   formatted_date = moment(chat.latestMessage.createdAt).format("LT")
                //   // console.log(formatted_date)
                // }
                // {chat.lastestMessage && chat.lastestMessage.content && console.log('4444')}
                if(checkContent){
                  null
                }
                // if(!checkContent){
                //   delChat(chat._id)
                //   return   <View>
                //  <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                //   <Text style={styles.connectTxt} >No chats available click here to access them </Text>
                //   </Pressable>
                  
                //   </View>
                // }
                // if((chat.latestMessage == undefined || chat.latestMessage == null)){
                //   if(checkContent){
                //     null
                //   }
                //   else{
                //     delChat(chat._id)
                //   }
                 
                //   // console.log("empty chat")
                 
                //   return   <View>
                //  <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                //  <Text style={styles.connectTxt} >No chats available click here to access them </Text>
                //  </Pressable>
                  
                //  </View>
                //   // if(chat.latestMessage.content == null || chat.latestMessage.content == undefined){
                //   //   return <View>
                //   //     <Text>empty chat still</Text>
                //   //   </View>
                //   // }
                // }
                if(chat.latestMessage != undefined && triggerChange){
                  formatted_other_date = moment(chat.latestMessage.createdAt).format( "YYYY/MM/DD")
                  // console.log(formatted_other_date)
                  let msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
                  let today = moment()
                  let d = today.diff(msgdate, 'days')
                 
                  if(d==0){
                    console.log(d)
                    console.log('pushing today messags')
                    todaytest = true
                    otherDates = false
                    yesterdaytest = false
                    console.log('toadytest' +todaytest)
                    
                  }
                  else if(d==1){
                    console.log(d)
                    console.log('pushing yesterday messags')
                    yesterdaytest = true
                    todaytest = true
                    otherDates = false
                    console.log('yesterdayteeeest' +yesterdaytest)
                    
                  }
                 
                  else{
                    otherDates = true
                   todaytest = false
                   yesterdaytest = false
                   console.log('othertest' +otherDates)
                    
                  }
                  formatted_date = moment(chat.latestMessage.createdAt).format("LT")
                    return <Pressable key={chat._id} onPress={() => 
                    {
                      
                      {chat.latestMessage && chat.latestMessage.sender
                        if(chat.latestMessage.sender._id === user._id){
                          console.log("sender")
                          // setreceivedMessage(true)
                          setsentMessage(true)
                         }
                         
                         else if(chat.latestMessage.sender._id !== user._id){
                          console.log("reciever")
                            // setreceivedMessage(true)
                            setsentMessage(false)
                            // setsentMessage((state) => {
                            //   // console.log(state)
                            //   return state
                            // })
                         }
                         else{
                          null              
                        }
                        }
                      {
          
                      }
                     
                    //     setmessageSentOrReceived(true)
                    //     // recieiver logic 
                    // {chat.latestMessage && chat.latestMessage.sender  && chat.latestMessage.sender._id != user._id ?
                      
                    //     setreceivedMessage(true)
                    //     console.log("ffoefoef")
                      
                     
                      
                    //   :  //if i am the sender then do nothing and set message sent to true
                      
                    //     // setreceivedMessage(false)  
                    //     // setsentMessage(true)
                    //     null
                      
                    //    // else set the message recieved to true 
                    // }
                    // {chat.latestMessage && chat.latestMessage.sender && chat.latestMessage.sender._id != user._id ?
                    //   :
                    //   setmessageSentOrReceived(true)
                    // }
                    
                      
                    
                      // setreceivedMessage(true)
                      setloading(true)
                      setchattId(chat._id)
                    navigation.navigate('Messaging', {userSelected:
                      
                    user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
                        <View>
                        <Image 
                            source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                            style = {styles.image}
                         />
                         
                             {/* { onlineStatus  && <Badge
                            status="success"
                            containerStyle={{ position: 'absolute', top: 50, left: 45 }}
                                />} */}
                         {/* <Text>badge here</Text> */}
                        </View>
                          
                        <View style = {styles.content}>
                            <View style = {styles.row}>
                                <Text style = {styles.name}>
                                    {user != null ? getSenderFull(user, chat.users).firstName : null}
                                </Text> 
                                {Today &&   <Text style = {styles.subTitle}>
                                   
                                    
                                  {formatted_date}
                                </Text>  } 
                                {/* {Yesterday &&   <Text style = {styles.subTitle}>
                                   
                                    
                                  Yesterday
                                </Text>  } 
                                {otherDs &&   <Text style = {styles.subTitle}>
                                   
                                    
                                  {formatted_other_date}
                                </Text>  }  */}
                                {/* <Text>ghgh</Text> */}
                            </View>
                            
                           {/* { messages && messages.map((mess) => {
                            mess._id == mess.chat.latestMessage ? 
                              (<Text key={mess._id}  numberOfLines={2} style = {styles.subTitle}>
                              {mess.chat.latestMessage}
                               </Text>
                            }}
                            // <Text numberOfLines={2} style = {styles.subTitle}>
                            
            
                           ))}  */}
                           {/* { messages && messages.map((mess) => {
          
                            if(mess._id == mess.chat.latestMessage){
                              return <Text   numberOfLines={2} style = {styles.subTitle}>
                              latest message : {mess.content}
                               </Text>
                            
                            }
                            else{
                              return 
                            }
                             
                              
                            
                            // <Text numberOfLines={2} style = {styles.subTitle}>
                            
            
                           })}  */}
                          
                            {chat.latestMessage && chat.latestMessage.content != "" ?
                            <View style = {{
                              flexDirection: 'row'
                            }}>
          
                            
                              {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                              <View>
                              <Text  numberOfLines={2} style = {styles.subTitle}>
                                {chat.latestMessage.content}
                              </Text>
                                  <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text>
                                </View>
                               
                            </View>
                            
                               : <Text>File Uploaded</Text> }
                             
                          {/* <Text style = {styles.subTitle} >
                            {chat.latestMessage}
                          </Text> */}
                        </View>
                        </Pressable>
                }
                
                
              }
            
         
              
            }
          //   else if(chat === undefined){
          //     console.log('chat is undefined')
          //   }
          // //  else if(chat.latestMessage == undefined || chat.latestMessage == null ){
          //   console.log('undefffffffined')
          //   // delChat(chat._id)

          //   // return <Text>undefined chat</Text>
          //  }
    
                  })): (
              <View>
                <Pressable style={styles.connectBtn} onPress={() => navigation.navigate("Connect")}>
                <Text style={styles.connectTxt} >No chats available click here to access them </Text>
                </Pressable>
                  
                </View>
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
  marginTop: 200,
  marginLeft: 50,
  backgroundColor: "lightgreen",
  width: "80%",
  height: 90,
  borderRadius: 20,
  padding: 20
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