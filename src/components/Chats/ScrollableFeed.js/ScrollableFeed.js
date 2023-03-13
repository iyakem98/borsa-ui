import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
import { FontAwesome5 } from '@expo/vector-icons';


const ScrollableFeed = ({messages}) => {
  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth)
  const {
    sentMessage, setsentMessage, 
    receivedMessage, setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived
        } = ChatState()
        const [localrec, setlocalrec] = useState(false)
    
  useEffect(() =>{
    // console.log(messages)
    // console.log(messageSentOrReceived)
    console.log(sentMessage)
    console.log("platformmm", Platform.OS)
    // console.log(receivedMessage)
  }, [])
  const publicFolder = "http://192.168.100.2:5000/images/"
  return (
    // <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // style={styles.keyboardAvoiding}>
   <ScrollView
    ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    style = {{
      backgroundColor: "#fff", 
      height: "90%",
      paddingBottom: 0,
      }}>
    {messages && messages.map((m, i) => {
      // console.log(m.image)
      // <Text>{m.sender._id}</Text>
    // console.log(m.createdAt)
    const formatted_date = moment(m.createdAt).format("LT")
      return <>
        {m.content == "" ? 
        <View 
        key={i}
        style = {[styles.container2, {
          backgroundColor:  `${
            m.sender._id === user._id ? "#593196" : "#E8E8E8"
        }`,
          alignSelf:  `${
            m.sender._id === user._id ? "flex-end" : "flex-start"
        }`,
        marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
      }]}>
          
        {/* <ImageBackground  source={{uri: `http://192.168.100.2:5000/images/${m.image}` }} resizeMode= 'cover' style={{color: `${
                m.sender._id === user._id ? "white" : "black"
            }`, flex: 1, height: 200,}}>
                {
            m.sender._id === user._id &&
         
        //  <Ionicons name="checkmark-outline" size={20} color="white" />
        // <Text style={{color: "red", marginTop:170}}>Sent</Text>
        
        <Ionicons name="checkmark-done-sharp" size={40} style={{color: "purple", marginTop:160}} />
       
        }
          
        
               </ImageBackground> */}
       
        </View>
        
        :

        
        <View 
        key={i}
        style = {[styles.container, {
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
          
       
      <Text style={{color:`${ m.sender._id == user._id ? "black" : "white"}`}}>{formatted_date}
      &nbsp;&nbsp;
      {/* <Ionicons name="checkmark-done" size={14} color="white" /> */}
      <Ionicons name="checkmark-outline" size={14} color="white" />
      {/* <Ionicons name="checkmark-outline" size={14} color="white" style={{opacity:.5}}/> */}
      </Text>
   </View>
   } 
      </>
     
      
       
})}
   </ScrollView>
  //  </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
      //backgroundColor: "#E8E8E8",
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 5,
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
  },
  keyboardAvoiding: {
    flex: 1,
  }
})
export default ScrollableFeed