import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
import { FontAwesome5 } from '@expo/vector-icons';


const ScrollableFeed = ({messages, latestMessage}) => {
  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth)
  const {
    sentMessage, setsentMessage, 
    receivedMessage, setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived,
    NewwMessage, setNewwMessage
        } = ChatState()
        const [localrec, setlocalrec] = useState(false)
    
  useEffect(() =>{
    // console.log(messages)
    // console.log(messageSentOrReceived)
    console.log(sentMessage)
    // console.log(receivedMessage)
  }, [])
  const updateMessStatus = async(messId) => {
    // console.log(messId)
    try{
      
      const   config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        
       };
  
      // const {data} = await axios.put(`http://192.168.100.2:5000/api/message/marked`,{
       
      //   messId: messId,
      //   markedStatus: true

        
      // }, config)
      const {data} = await axios.put(BASE_URL + 'message/marked',{
       
        messId: messId,
        markedStatus: true

        
      }, config)
      // console.log(data)
      // console.log(data.lastSeen)
      // setlastseendateandtime(moment(data.lastSeen).format("dddd, MMMM Do YYYY") + " " + moment(data.lastSeen).format("LT"))
  
    }
    catch(err){
      console.log(err)
    }
  }
  const publicFolder = "http://192.168.100.2:5000/images/"
  const now = moment()
  return (
   <ScrollView
    ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    style = {{
      backgroundColor: "#fff", 
      height: "80%",
      paddingBottom: 1,
      }}>
    {messages && messages.map((m, i) => {
       // console.log(m.receiver.route)
      // if(m.receiver.route == "Messaging"){
      //   updateMessStatus(m._id)
      // }
      console.log(m.marked)
      // console.log(m.content)
      // console.log(latestMessage)
      if(m.content == latestMessage){
        setNewwMessage(false)
      }
      // console.log(m.image)
      // <Text>{m.sender._id}</Text>
    // console.log(m.createdAt)
    const formatted_date = moment(m.createdAt).format("LT")
      return <>
        {m.content == "" ? 
        <View style = {[styles.container2, {
          backgroundColor:  `${
            m.sender._id === user._id ? "#593196" : "#E8E8E8"
        }`,
          alignSelf:  `${
            m.sender._id === user._id ? "flex-end" : "flex-start"
        }`,
        marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
      }]}>
          
        <ImageBackground  source={{uri: `http://192.168.100.2:5000/images/${m.image}` }} resizeMode= 'cover' style={{color: `${
                m.sender._id === user._id ? "white" : "black"
            }`, flex: 1, height: 200,}}>
                {
            m.sender._id === user._id &&
         
        //  <Ionicons name="checkmark-outline" size={20} color="white" />
        // <Text style={{color: "red", marginTop:170}}>Sent</Text>
        
        <Ionicons name="checkmark-done-sharp" size={40} style={{color: "purple", marginTop:160}} />
        
         
         
         
          // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
        }
          
         
        
        
        {/* <Ionicons name="checkmark-done-sharp" size={40} style={{color: "purple", marginTop:160}} /> */}
        
               </ImageBackground>
       
        </View>
        
        :

        
        <View style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#E8E8E8" : "#593196" 
      }`,
      color:  `${
        m.sender._id === user._id ? "white" : "black" 
    }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-start" : "flex-end"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>
           <Text key={m._id} style={{
        
          color: `${
              m.sender._id == user._id ? "black" : "white"
          }`,
      
      }}>
      {m.content}
       </Text>
          
       {
          m.sender._id === user._id  && m.receiver != null &&
          // m.sender._id === user._id && 
       
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      // <Text>Sent</Text>
      <Ionicons name="checkmark-outline" size={20} color="white" />
      
      
      
       
       
       
        // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
      }
      {
          m.sender._id === user._id  && m.receiver != null && m.marked == "true" &&  
          // m.sender._id === user._id && 
       
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      // <Text>Sent</Text>
      <Ionicons name="checkmark-done-sharp" size={20} color="white" />
      
      
      
       
       
       
        // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
      }
      <Text style={{color:`${ m.sender._id == user._id ? "black" : "white"}`}}>{formatted_date}
      {/* &nbsp;&nbsp; */}
      {/* <Ionicons name="checkmark-done" size={14} color="white" /> */}
      {/* <Ionicons name="checkmark-outline" size={14} color="white" /> */}
      {/* <Ionicons name="checkmark-outline" size={14} color="white" style={{opacity:.5}}/> */}
      </Text>
   </View>
   } 
   {NewwMessage && <View style = {[styles.container, {
        backgroundColor:   "#593196",
        alignSelf:  "flex-end" ,
      marginTop: 3, 
    }]}>
           <Text style={{
          
          color: "white"    
      }}>
      {latestMessage}
       </Text>
      <Ionicons name="timer-outline" size={20} color="white" />
      <Text>{now.format('LT')}</Text>
      
    
      </View>
        }
      </>
     
      
       
})}
   </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      //backgroundColor: "#E8E8E8",
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 10,
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
})
export default ScrollableFeed