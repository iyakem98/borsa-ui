import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
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
    // console.log(receivedMessage)
  }, [])
  const publicFolder = "http://192.168.100.2:5000/images/"
  return (
   <ScrollView
    ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    style = {{
      backgroundColor: "#fff", 
      height: "80%",
      paddingBottom: 1
      }}>
    {messages && messages.map((m, i) => {
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
      {
          m.sender._id === user._id && m.receiver.route === "Messaging" && m.receiver != null && 
          // m.sender._id === user._id && 
       
      //  <Ionicons name="checkmark-outline" size={20} color="white" />
      <Text>Sent</Text>
      
      
      
       
       
       
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
   </ScrollView>
  // <View>
  //   {messages && messages.map(m => (
  //     <View key={m._id}>
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