import { Ionicons } from '@expo/vector-icons'

import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
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
    // console.log(latestMessage)
  useEffect(() =>{
    // console.log(messages)
    // console.log(messageSentOrReceived)
    // console.log(sentMessage)
    // console.log(receivedMessage)
  }, [])
  // console.log(NewwMessage)
  const updateMessStatus = async(messId) => {
    // console.log(messId)
    try{
      
      const   config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        
       };
  
      const {data} = await axios.put(`http://192.168.100.2:5000/api/message/marked`,{
       
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
      paddingBottom: 1
      }}>
        {/* {console.log('message displayed')} */}
       
         {/* <View style = {[styles.container2, {
          backgroundColor:  `${
            "#593196" 
        }`,
          alignSelf:  `${
           "flex-end"
        }`,
        marginTop:  3, 
      }]}>                                                                                                                                                                                                                              
        <Text>{latestMessage}</Text>
        </View> */}
        
        
    {messages && messages.map((m, i) => {

      // console.log(m.receiver.route)
      if(m.receiver.route == "Messaging"){
        updateMessStatus(m._id)
      }
      console.log(m.marked)
      // console.log(m.content)
      // console.log(latestMessage)
      if(m.content == latestMessage){
        setNewwMessage(false)
      }
      // else{
      //   return <View style = {[styles.container2, {
      //     backgroundColor:  `${
      //       "#593196" 
      //   }`,
      //     alignSelf:  `${
      //      "flex-end"
      //   }`,
      //   marginTop:  3, 
      // }]}>                                                                                                                                                                                                                              
      //   <Text>{latestMessage}</Text>
      //   </View>
      // }
      // console.log('message displayed')
      // console.log(m.image)
      // <Text>{m.sender._id}</Text>
      // if(m.receiver.route == "Messaging"){
      //   updateMessStatus(m._id)
      // }
    // console.log(m.receiver.route)
    const formatted_date = moment(m.createdAt).format("LT")
    // return <Text>{m.content}</Text>
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
         {/* <Image key={m._id} style={{color: `${
                m.sender._id === user._id ? "white" : "black"
            }`, flex: 1, height: 200, width: 200, resizeMode:'cover'}} source={{uri: `http://192.168.100.2:5000/images/${m.image}` }} /> */}
        
        {/* {
           sentMessage &&  m.sender._id === user._id &&
         
        //  <Ionicons name="checkmark-outline" size={20} color="white" />
        <Text>Sent</Text>
        
        
        
         
         
         
          // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
        } */}
    
        {/* write conditional rendering for isgetsender opposite  */}
      
        </View>
        :<View style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#593196" : "#E8E8E8"
      }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-end" : "flex-start"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>
           <Text key={m._id} style={{
          /*backgroundColor: `${
              m.sender._id === user._id ? "#593196" : "#E8E8E8"
          }`,
          alignSelf: `${
            m.sender._id === user._id ? "flex-end" : "flex-start"
        }`, 
        */
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          
         /* borderRadius : 20,
          padding: 5,
          maxWidth: "75%",
          //marginLeft: isSameSenderMargin(messages, m , i, user._id),
          marginLeft: 5, */
          
      }}>
      {m.content}
       </Text>
          
        
       {/* {
        sentMessage &&   <Ionicons name="checkmark-outline" size={20} color="white" />
      }  */}
      {/* {
        m.sender._id == user._id ?  
       (
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      <Text>Sent</Text>
       )
       :
       (
        // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
        <Text>Received</Text>
       )
      } */}
      {/* {
          m.sender._id === user._id && m.receiver.route === "Messaging" && m.receiver != null && 
          // m.sender._id === user._id && 
       
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      // <Text>Sent</Text>
      <Ionicons name="checkmark-done-sharp" size={20} color="white" />
      
      
      
       
       
       
        // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
      } */}
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
    
      <Text>{formatted_date}</Text>
      {/* {
        receivedMessage && m.sender._id === user._id &&
        <Text>recieve</Text>
      } */}
      {/* {
       m.sender._id != user._id && receivedMessage ?
       setlocalrec(true): null 
      } */}
      {/* {
        localrec && user._id && <Text>rec</Text>
      } */}
      {/* {
          receivedMessage ?
        
       
          <Text>Received</Text>
          
        
        :
        
          null
        
        
      } */}
      {/* {
        messageSentOrReceived &&  m.sender._id == user._id &&
        <Text>Received</Text>
      } */}
      {/* write conditional rendering for isgetsender opposite  */}
    
      </View>} 
      </>
     
      
       
})}
 {NewwMessage && <View style = {[styles.container, {
        backgroundColor:   "#593196",
        alignSelf:  "flex-end" ,
      marginTop: 3, 
    }]}>
           <Text style={{
          /*backgroundColor: `${
              m.sender._id === user._id ? "#593196" : "#E8E8E8"
          }`,
          alignSelf: `${
            m.sender._id === user._id ? "flex-end" : "flex-start"
        }`, 
        */
          color: "white"
          
         /* borderRadius : 20,
          padding: 5,
          maxWidth: "75%",
          //marginLeft: isSameSenderMargin(messages, m , i, user._id),
          marginLeft: 5, */
          
      }}>
      {latestMessage}
       </Text>
          
        
       {/* {
        sentMessage &&   <Ionicons name="checkmark-outline" size={20} color="white" />
      }  */}
      {/* {
        m.sender._id == user._id ?  
       (
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      <Text>Sent</Text>
       )
       :
       (
        // <Ionicons name="checkmark-done-sharp" size={20} color="white" />
        <Text>Received</Text>
       )
      } */}
      
      
      {/* <Ionicons name="checkmark-done-sharp" size={20} color="white" /> */}
      <Ionicons name="timer-outline" size={20} color="white" />
      
      
      
       
       
       
        
      
      <Text>{now.format('LT')}</Text>
      {/* {
        receivedMessage && m.sender._id === user._id &&
        <Text>recieve</Text>
      } */}
      {/* {
       m.sender._id != user._id && receivedMessage ?
       setlocalrec(true): null 
      } */}
      {/* {
        localrec && user._id && <Text>rec</Text>
      } */}
      {/* {
          receivedMessage ?
        
       
          <Text>Received</Text>
          
        
        :
        
          null
        
        
      } */}
      {/* {
        messageSentOrReceived &&  m.sender._id == user._id &&
        <Text>Received</Text>
      } */}
      {/* write conditional rendering for isgetsender opposite  */}
    
      </View>
        }

   </ScrollView>
  // <View>
  //   {messages && messages.map(m => (
  //     <View                                                                                                                                                                         ke                                                                                   y={m._id}>
  //       <Text>
  //         {m.content}
  //       </Text>
  //     </View>                                            
  //   ))}                                         
  // </View>
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