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



// import chats from '../../assets/data/chats.json'


const ChatScreen = () => {
   
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
    // const renderChats = () => {
    //   // dispatch(reset())
    //   // console.log(chattts)
    //   dispatch(fetchChat())
    //   // console.log(chattts)
    //   // console.log(chattts)
    //  if(chattts.length < 0 || chattts.length == 0){
    //   return <Text>chats are not available currently for the new user</Text>
    //  }
    //  else{
    //   return <Text>chats are available currently for the new user</Text>
    //  }
    // }
    // useEffect(() =>{
    //   getNotif()
    //   // console.log(notificationstored)
    // }, [])
    useLayoutEffect(() => {
  
      // fetchMessage()
      socket1.current = io(ENDPOINT)
      socket1.current.emit("setup", user);
      // socket.emit("findChat", chatId)
      socket1.current.on("connected", () => setsocketConnected(true) )
     
     
     
      
    }, [])
    useEffect(() => {
      
        // if (isError) {
        //   console.log(message)
        // }
        // if(trId)
        // console.log(dispatch(accessChat({trId}, user.token)))
       
        // console.log(user)
        // dispatch(fetchChat())
        if(chatSelected== true){
          dispatch(fetchChat())
          setchatSelected(false)
          
        }
        // renderChats()
        else{
         return
          }  
        // }
        // }
        
        // console.log(chattts)
        // console.log(user)
      //   console.log('test')
      //  console.log(selectedChat)
      
        
 
        
      })
useEffect(() =>{

    dispatch(fetchChat())
    
  
}, [fetchAgain])

useEffect(() =>{

    dispatch(fetchChat())
    
  
}, [user])
useEffect(() => {
  socket1.current.on("message recieved", (newMessageReceived) => {
    console.log(route.name)
    // console.log('mess received')
    
    console.log(newMessageReceived.content)
  //   if(newMessageReceived.receiver.route != "Messaging")
    // testNotif(newMessageReceived)
  //  console.log(newMessageReceived.chat._id)
  //  console.log(newMessageReceived.chat)
  //  if((!selectedChatCompare)  ||  selectedChatCompare._id !== newMessageReceived.chat._id || (chatRouteCompare) ){
  //   // console.log(notisfication)
  //   // console.log('message received')
  // // //  if((newMessageReceived.receiver.route == "Chats")){
  // // //   console.log('notif received')
  // if (!notification.includes({newMessageReceived})) {
  //     // console.log(newMessageReceived.chat)
  //             setNotification([...notification,  newMessageReceived]);
  //             // console.log(notification)
  //             setNotification((state) => {
  //               // console.log(state)
  //               return state
  //             })
  //             // console.log(notification)
  //             storeNotifcation(notification, {chatUsers: newMessageReceived.chat.users, chatId: newMessageReceived.chat._id })
  //             // storeNotifcation(notification)
             
              
  //             setfetchAgain(!fetchAgain)
  //             setfetchAgain((state) => {
  //               // console.log(state)
  //               return state
  //             })
  //             // console.log(fetchAgain)
  //  }

  // console.log('message received')
  //  testNotif(newMessageReceived)
   
  // }
  // if (!notification.includes({newMessageReceived})) {
  //     // console.log(newMessageReceived.chat)
  //             setNotification([...notification,  newMessageReceived]);
  //             // console.log(notification)
  //             setNotification((state) => {
  //               // console.log(state)
  //               return state
  //             })
  //             // console.log(notification)
  //             storeNotifcation(notification, {chatUsers: newMessageReceived.chat.users, chatId: newMessageReceived.chat._id })
  //             // storeNotifcation(notification)
             
              
  //             setfetchAgain(!fetchAgain)
  //             setfetchAgain((state) => {
  //               // console.log(state)
  //               return state
  //             })
  //             // console.log(fetchAgain)
   

  // }
  // else{
  //   console.log('notif not received')
  //   setMessages([...messages, newMessageReceived])
  //   // setreceivedMessage(true)
  // }   

       
   
  })
  

})
// useEffect(() =>{

//   const subscription = AppState.addEventListener('change', nextAppState => {
//     console.log(nextAppState)
//     // if (
//     //   appState.current.match(/inactive|background/) &&
//     //   nextAppState === 'active'
//     // ) {
//     //   console.log('App has come to the foreground!');
//     // }
//   //   if(appState.current.match(/background/) &&
//   //   nextAppState === 'background'){
//   //     console.log('display that the user is away')
//   //   }
  
//   if(nextAppState === 'background'){
//     dispatch(fetchChat())
//   }
//   if(nextAppState === 'active'){
//     dispatch(fetchChat())
//   }
//   // else if(nextAppState === 'active'){
//   //   console.log('return user to online status')
//   // }
//   // console.log(user)
//   //   appState.current = nextAppState;
//   //   setAppStateVisible(appState.current);
//   //   console.log('AppState', appState.current);
//   });
  

//   return () => {
//     subscription.remove();
//   };
    
  
// }, [])
// useEffect(() =>{

//     dispatch(fetchChat())
    
  
// }, [AppState.currentState])
// useEffect(() =>{
//   dispatch(fetchChat())
// }, [selectedChat])

    
// useEffect(() => {
//   // setNotification(JSON.parse(getNotif))

//   console.log(getNotif)
// }, [])    

useEffect(() =>{
  // navigation.addListener('focus', getNotif)
  getNotif()
  // console.log(storedNotifications)
}, [])


// const renderChats = () => {
//   dispatch(fetchChat())
//   setSelectedChat(chattts)
//   console.log(selectedChat)
// }
// const getNotif = async() =>{
//   const notif  = await AsyncStorage.getItem('notification')
//   const notifChat =  await AsyncStorage.getItem('notifChat')
//   const parsedNotif = JSON.parse(notif)
//   const parsedChat = JSON.parse(notifChat)
//   // console.log(getSenderFull(user, parsedChat.users).firstName)
//   // console.log(parsedNotif)
//   // console.log(parsedChat._id)
//   setstoredNotifications(parsedNotif)
//   // console.log(storedNotifications)
//   // return JSON.parse(notif);
// }
useEffect(()=> {
  // console.log(receivedMessage);
 {user && socket.emit('chat_users', {userID : user._id, chatData: chatArr}) }
  
}, [])
useEffect(()=> {
  socket.on('activatedUser', (data) => setUsers(data))
  setonlineStatus(users.onlineStatus)
  // console.log(onlineStatus)
  // add new socket for logged out users

  // socket.on('usersResponse', (data) => setUsers(data));
  // console.log(chatArr)
}, [])
useEffect(() => {
  navigation.addListener('focus', UpdateUserRoute)
  // UpdateUserRoute()
 //  console.log(route.name)
   // setImage(null)
  }, [])
const UpdateUserRoute = async () => {
    
  try{
    console.log(route.name)
    const userId = user._id
    console.log(userId)
    const   config = {
        
      headers: {
       
        Authorization: `Bearer ${user.token}`
      },
      // body: JSON.stringify({
      //   imgsource: newPhoto.base64,
      // }),
      // body: formData
     };

    const {data} = await axios.put(`http://192.168.100.2:5000/api/users/route`,{
      userId: user._id,
      route: route.name
      
    }, config)
    console.log('user route updated')
    // console.log(data.lastSeen)
    // setlastseendateandtime(moment(data.lastSeen).format("dddd, MMMM Do YYYY") + " " + moment(data.lastSeen).format("LT"))

  }
  catch(err){
    console.log(err)
  }
  
 }
  const getNotif = async() =>{
    // console.log('get notif function')
        //   await AsyncStorage.removeItem('notification')
        // await AsyncStorage.removeItem('notifChat')
    
        const notif  = await AsyncStorage.getItem('notification')
        const notifChat =  await AsyncStorage.getItem('notifChat')
        const parsedNotif = JSON.parse(notif)
        const parsedChat = JSON.parse(notifChat)
       
        // // console.log(getSenderFull(user, parsedChat.users).firstName)
        // console.log(parsedNotif)
        // console.log(parsedChat._id)
        setstoredNotifications(parsedNotif)
        setnotifChat(parsedChat)
       // console.log(parsedChat)
        // console.log(storedNotifications)S
        // return JSON.parse(notif);
      } 


    return(
    //   <View>
    //     <Pressable >
    //    <TouchableOpacity onPress={() => {
    //     renderChats()}} style={styles.buttonStyle}>
    //                 <Text style={styles.buttonText}>Submit</Text>
    //             </TouchableOpacity>
    // </Pressable>
    //   </View>
    <>
        
        <ScrollView style = {{
          backgroundColor: '#fff'
        }}>
         
         <ChatListHeader chatArr={chatArr2}/>
        <View>
        {/* <Feather name="bell" size={24} color="black" /> */}
        
          <Text>
          {/* {storedNotifications && storedNotifications.length  ? `new messages of length ${storedNotifications.length}` : "no new messages"} */}
            {/* {storedNotifications.length && `new messages of length ${storedNotifications.length}`} */}
          </Text>
          {/* <Text>

            {!storedNotifications.length  && "no new messages"}
            {storedNotifications.length && `new messages of length ${storedNotifications.length}`}
          </Text> */}
        {/* <Text>{ !getnotif.length && "no new messages"} </Text> 
        <Text>{getnotif.length && ` new messages of length ${notification.length}` } </Text> 
        {notification && notification.map((notif) => (
          <Text onPress={() => {
            setNotification(notification.filter((n) => n !== notif));
          }}  key={notif._id}>
               {
                    
                     `New Message from ${getSender(user, notif.chat.users)}`}
                     
          </Text>
        ))} */}

        
        </View>
        {/* { chattts && chattts.length > 0 ?  (
        <View style={{backgroundColor: "white"}}>
        <FlatList
                data = {chattts} 
                
                renderItem = {({item}) => <ChatListItem chat = {item}  

                keyExtractor={(item) => item.id}
            />
                  
                }
            />
            </View>
            ) : (<View>
              <Text style={styles.text}>No chats available click here to access them </Text>
            </View>)} */}
        { chattts && chattts.length > 0 ? (chattts.map((chat) => {
          // if(messageOnce == false){
          //   dispatch(allMessages(chat._id))
          //   setmessageOnce(true)
          // }
          // 
          // setfetchAgain(true)
          if(chat != null){
            // var formatted_date = null
            // console.log(chat.latestMessage.content)
           
            if(chat.lastestMessage !== null ){
              // console.log(chat.latestMessage)
              // formatted_date = moment(chat.latestMessage.createdAt).format("LT")
              // console.log(formatted_date)
              // console.log('4444s')
            }
          
            
          //   if(chat.lastestMessage){
          //     console.log('455')
          //   // formatted_date = moment(chat.latestMessage.createdAt).format("LT")
          //   // console.log(formatted_date)
          // }
         
          // console.log(formatted_date)
          chatArr.push(chat)
          chatArr2.push(chat)
          setSelectedChat(chat)
         
          // socket.on('updateStatus', () => {
          //   console.log("phase 1")
          // })
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
                 
                  navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                    
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
            if(chat.latestMessage != null && triggerChange){
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
               
                navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                  
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
       

              })): (
          <View>
              <Text style={styles.text}>No chats available click here to access them </Text>
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