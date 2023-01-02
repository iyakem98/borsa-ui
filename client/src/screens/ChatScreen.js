import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useLayoutEffect, useState } from 'react'
import {View, Text,FlatList, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView} from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux'
import ChatListItem from '../components/Chats/ChatListItem'
// import ChatListHeader from '../components/Chats/ChatListItem/ChatListHeader'
import { ChatState } from '../context/ChatProvider'
import { fetchChat, reset } from '../features/chat/chatSlice'
import { getSender, getSenderFull } from '../ChatConfig/ChatLogics'
import Test from './Test'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { allMessages } from '../features/message/messageSlice'
import dayjs from 'dayjs'


// import chats from '../../assets/data/chats.json'


const ChatScreen = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
    const {messages} = useSelector((state) => state.mess)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected, fetchAgain, setfetchAgain, notification, setNotification } = ChatState();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [storedNotifications, setstoredNotifications] = useState([])
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
// useEffect(() =>{
//   dispatch(fetchChat())
// }, [selectedChat])

    
useEffect(() => {
  // setNotification(JSON.parse(getNotif))

  console.log(getNotif)
}, [])    

useEffect(() =>{
  getNotif()
  // console.log(notificationstored)
}, [notification])

// const renderChats = () => {
//   dispatch(fetchChat())
//   setSelectedChat(chattts)
//   console.log(selectedChat)
// }
const getNotif = async() =>{
  const notif  = await AsyncStorage.getItem('notification')
  // console.log(JSON.parse(notif))
  setstoredNotifications(JSON.parse(notif))
  console.log(storedNotifications)
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
        <ScrollView >
        <View>
          <Text>
            {/* {getnotif.length} */}
            {!storedNotifications.length  && "no new messages"}
            {storedNotifications.length && `new messages of length ${storedNotifications.length}`}
          </Text>
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
          setSelectedChat(chat)
         

        
      return   <Pressable key={chat._id} onPress={() => 
          {
            
         
          navigation.navigate('Messaging', {chatId: chat._id, userSelected:
            
          user != null ? getSenderFull(user, chat.users).userName : null })}}  style={styles.container}>
              
                <Image 
                  source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                  style = {styles.image}
               />
              <View style = {styles.content}>
                  <View style = {styles.row}>
                      <Text style = {styles.name}>
                          {user != null ? getSenderFull(user, chat.users).firstName : null}
                      </Text> 
                        <Text style = {styles.subTitle}>
                          {dayjs(chat.latestMessage).fromNow(true)}
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
                
                  {chat.latestMessage && chat.latestMessage.content ?
                   <Text  numberOfLines={2} style = {styles.subTitle}>
                      {"latest message:" + chat.latestMessage.content}
                    </Text>
                     : "" }
                   
                {/* <Text style = {styles.subTitle} >
                  {chat.latestMessage}
                </Text> */}
              </View>
              </Pressable>
          
                

              })): (
          <View>
              <Text style={styles.text}>No chats available click here to access them </Text>
            </View>
        )
        
      
        } 
          
       
         
        

          </ScrollView> 
        
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
},
subTitle: {
  color: "gray"
},
Tex: {
  marginTop: 200
}

})