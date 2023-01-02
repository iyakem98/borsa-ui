import axios from 'axios'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getSender, getSenderFull } from '../ChatConfig/ChatLogics'
import ChatListItem from '../components/Chats/ChatListItem'
import { ChatState } from '../context/ChatProvider'
import { fetchChat } from '../features/chat/chatSlice'
const Test = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const {messages} = useSelector((state) => state.mess)
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
      console.log(chattts)
     
      // console.log(user)
     

      // console.log(user.token)
     

        // setSelectedChat('')
        
        
    
        // return () => {
        //   dispatch(reset())
        // }
      },[])
  return (
   <View style={styles.con}>
     {chattts && <FlatList
                data = {chattts} 
                key ={chattts._id}
                renderItem = {({item}) => <ChatListItem chat = {item} 
            />}
            />}
     {/* {chats && chats.map((chat) => (
      <Text style={styles.Tex}>{chat._id}</Text>
     )) } */}
     {/* <Text style={styles.Tex}>{test.chatName}</Text> */}

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