import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getSender, getSenderFull } from '../ChatConfig/ChatLogics'
import ChatListItem from '../components/Chats/ChatListItem'
import { ChatState } from '../context/ChatProvider'
import {  fetchChat } from '../features/chat/chatSlice'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Test = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    // const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    // const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    // const {messages} = useSelector((state) => state.mess)
    const [users, setUsers] = useState([]);
    const ENDPOINT = "http://192.168.100.2:5000"
    var  socket = io(ENDPOINT)
    const chatArr = []
    const usrArr = []
    var deletechat = null
    const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
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
    const [socketConnected, setsocketConnected] = useState(false)
    const [userss, setUserss] = useState({})

    
    useEffect(()=> {
      
      // socket.on('usersResponse', (data) => setUsers(data));
      // console.log(users)
    }, [])
    useEffect(()=> {
      socket.emit('chat_users', {userID : user._id, chatData: chatArr, usrData: usrArr})
      
      // socket.on('usersResponse', (data) => setUsers(data));
      // console.log(chatArr)
    }, [])
    useEffect(()=> {
      socket.on('activatedUser', (data) => setUserss(data))
      console.log(userss)
      
      // socket.on('usersResponse', (data) => setUsers(data));
      // console.log(chatArr)
    }, [])
    // const getUserChat = async() => {
    //   try{
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }
    //   // const res = await  axios.get('http://192.168.100.2:5002/api/chat/', config);
    //   const {data} = await  axios.get('http://192.168.100.2:5000/api/chat/', config);
    //   console.log(data) 
    //   setChats(data)
    //   // return res.data
    // }
    // catch(error){
    //   console.log("stupid error")
    // }
    // }
   
    useEffect(() => {
      
        // if (isError) {
        //   console.log(message)
        // }
        // if(trId)
        // console.log(dispatch(accessChat({trId}, user.token)))
      
       
      // setChats(dispatch(fetchChat()))
      // console.log(dispatch(fetchChat()))
      // getUserChat(user.token)
      // getUserChat(user.token)
      
      // getUserChat()
      // console.log(chats)
      
      dispatch(fetchChat())
      
      // console.log(chattts)
     
      // console.log(user)
     

      // console.log(user.token)
     

        // setSelectedChat('')
        
        
    
        // return () => {
        //   dispatch(reset())
        // }
      },[])
      const deleteChatt = async () => {
        const user1 = await  AsyncStorage.getItem("user")
        const user = JSON.parse(user1)
        try{
          const res = await axios.get('http://192.168.100.2:5000/api/chat/clean')
          console.log(res)
        }
        catch(err){
          console.log(err)
        }
      
        // try{
        // //   const config = {
        // //     headers: {
        // //       'Content-Type': 'application/json',
        // //       'Authorization': `Bearer ${user.token}`
        // //   },      
        // // }      
        //     // headers: {
        //     //   Authorization: `Bearer ${user.token}`,
        //     // },
            
          
        //   console.log(chatID)
        //   // console.log('fetchin in chatService')
        //   // const response = await axios.get(API_URL, config)
          
        //   // const response =  await axios.get("http://localhost:5000/api/chat/remove", chatID, config)
        //   // await axios.delete('http://192.168.100.2:5000/api/chat/remove', chatID, config)
        //   // await axios.get('http://192.168.100.2:5000/api/chat/clean')
        //   console.log("chat deleted")
        //   // console.log(response)
        // }
        // catch(err){
        //   console.log(err)
        // }
          
         
        
       
        }
      useEffect(() => {
        // dispatch(deleteChat(deletechat))
        // console.log(deletechat)
        // deleteChatt()
      },[])
      
   
  return (
   <View style={styles.con}>
     {/* {chattts && <FlatList
                data = {chattts} 
                key ={chattts._id}
                renderItem = {({item}) => <ChatListItem chat = {item} 
            />}
            />} */}
            {/* <Text>testing users lists</Text> */}
            <Text>List of active users(id) in each chat </Text>
            {chattts && chattts.length > 0 ? chattts.map(chat => {
                if(chat != null){
                  chatArr.push(chat)
                  if(chat.latestMessage != null ){
                    return <Text> chat is not deleted </Text>
                  }
                  else{
                    
                    // deletechat =  chat._id
                    return <Text> chat is  deleted </Text>
                    // dispatch(deleteChat(chat._id))
                    
                  }
                  
                }
              
               
               
              //  if(chat.latestMessage !== null ){
              //     return <Text> chat is not deleted </Text>
              //   }
              //   else{
              //     return <Text> chat is deleted </Text>
              //   }
              // return <View>
              //   {chat && chat.latestMessage ?( <Text>{chat.latestMessage.content} + {chat._id}</Text> ): ( <Text>chat deleted </Text> ) }
              //   </View>
              
            
                // else{
                //   // dispatch(deleteChat(chat._id))
                //   return  <Text> chat is deleted </Text>
                // }
            //  return  <View>
            //  <View>
            
            //  </View>
            //   </View>
            
                // return <View> 
                  
                //   {chat.latestMessage &&  <Text>{chat.latestMessage.content}</Text>}
                // </View>
                
        //    socket.on('chat_users', (chat._id, user._id))
        //   return <Text>{chat._id}</Text>
        //   { user && chat && socket.emit('chat_users', {userID : user._id, chatData: chat._id})
        //   // socket.on('activatedUser', (data) => setUserss(data))
        // }
       
          // console.log(userss)
          // if(chat._id === userss.chatID){
          //   return <Text>the chat with id = {userss.chatID} this means that the user with the id {userss.userID} is online
          //   place online badge
          //   </Text>
          // }
          // else{
          //   return <Text>rest of the chat with id = {chat._id} are without active users and place offline badge</Text>
          // }
          
          //  return <Text>{userss.userID}</Text>
          }) : <Text>no available chats</Text>}
            {/* { user && users.map((u) => (
              
              u.data._id === user._id ? <></> : <View>
              <Text>{u.data.firstName + " " + u.data.lastName}</Text>
            </View>
               
          ))} */}
      {/* {chats && chats.map((chat) => (
      <Text style={styles.Tex}>{chat._id}</Text>
     )) } 
      <Text style={styles.Tex}>{test.chatName}</Text> */}
           
   </View>
  )
}

export default Test

const styles = StyleSheet.create({
    con: {
     
    
       
        marginTop: 200,
        borderRadius: 15,
       
      
  },
  Tex: {
    fontSize: 20,
    textAlign: 'center',
    color: '#black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 200,
},
  
  })