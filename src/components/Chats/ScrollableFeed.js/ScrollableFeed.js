import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
import { FontAwesome5 } from '@expo/vector-icons';


const ScrollableFeed = ({messages, latestMessage, scrollref}) => {

  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth)
  const {
    sentMessage, setsentMessage, 
    receivedMessage, setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived,
    NewwMessage, setNewwMessage
        } = ChatState()
        const [Today, setToday] = useState(false)
        const [Yesterday, setYesterday] = useState(false)
        const [Other, setOther] = useState(false)
        var todaytest = false
        var yesterdaytest = false
        var othertest = false
        const Tmessages = []
        const Ymessages = []
        const Omessages = []

        const [localrec, setlocalrec] = useState(false)
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
          
        
          }
          catch(err){
            console.log(err)
          }
        }

useEffect(() => {
  console.log(todaytest)
  if(todaytest == true){
    setToday(true)
  }
  else{
    setToday(false)
  }
  if(yesterdaytest == true){
    setYesterday(true)
  }
  else{
    setYesterday(false)
  }
  if(othertest == true){
    setOther(true)
  }
  else{
    setOther(false)
  }
})
  
const OtherFunc = (messages)=>{

  // console.log(messages)
  for(var i = 0; i < messages.length; i++){
    if(messages[i].createdAt == messages[i++].createdAt){
      const formatted_date = moment(messages[i].createdAt).format("dddd, YYYY/MM/DD")
      return <View style={{"alignItems": "center", "marginBottom" : 10}}>
        <Text>{formatted_date}</Text>
      </View>
    }
    else{
      // const formatted_date = moment(messages[i].createdAt).format("dddd,YYYY-MM-DD")
      const formatted_date2 = moment(messages[i++].createdAt).format("dddd, YYYY/MM/DD")
      // return <View style={{"alignItems": "center", "marginBottom" : 10}}>
      //   <Text>{formatted_date2}</Text>
      //   {/* <Text>{formatted_date}</Text> */}
      // </View>
    }
   
  }
  // return <Text>Other</Text>
  }
  // const publicFolder = "http://192.168.100.2:5000/images/"
  const publicFolder = "http://192.168.100.2:5000/images/"
  const now = moment()
  // console.log(todaytest)
  return (
    <ScrollView
    ref={scrollref}
    
    style = {{
      backgroundColor: "#fff", 
      // backgroundColor: "red", 
      height: "100%",
      }}>
        
     {/* {Today == true ?<View>
        <Text>today</Text>
      </View> : null}
     {Yesterday == true ?<View>
        <Text>yesterday</Text>
      </View> : null}
     {Other == true ?<View>
        <Text>other</Text>
      </View> : null} */}
    {messages && messages.map((m, i) => {
      
    let msgdate = moment(m.createdAt, "YYYY-MM-DD")
    let today = moment()
    let d = today.diff(msgdate, 'days')
    console.log(d)
    if(d==0){
      console.log('pushing today messags')
      todaytest = true
      // console.log(todaytest)
      Tmessages.push(m)
    }
    else if(d == 1){
      Ymessages.push(m)
      yesterdaytest = true
    }
    else{
      Omessages.push(m)
      othertest = true
    }
   
     
    
})}
{/* {Omessages && Other &&   <View  style={{"alignItems": "center", "marginBottom" : 10}}>
        <Text>Other</Text>
      </View>} */}
{Omessages && Other && OtherFunc(Omessages)}
    {Omessages && Omessages.map((m, i) => {
       const formatted_date =  moment(m.createdAt).format("LT")
       const formatted_date2 =  moment(m.createdAt).format("YYYY-MM-DD")
       console.log(formatted_date2)
      return <>
      {/* <View>
        <Text>Other</Text>
      </View> */}
      <View key={m._id} style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#593196" : "#E8E8E8"
      }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-end" : "flex-start"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>

       <Text key={m._id} style={{
          
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          
          
      }}>
      {m.content}
       </Text>
          
        
       
    
     <View style={{flexDirection:"row"}}>
       <Text style={{color:`${m.sender._id === user._id ? "white" : "black"}`}}>{formatted_date}</Text>
       {
         
      <Ionicons name="checkmark-outline" size={20} color={m.sender._id === user._id ? "white" : "black"} />
      
      
      
       
       
       
        
      }
      {
          m.sender._id === user._id  && m.receiver != null && m.marked == "true" &&  
       
      <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
      
      
      
       
       
       
      }
      </View>
               </View>
      </>
      
   
   
     
    
})}
{Ymessages && Yesterday &&  <View style={{"alignItems": "center", "marginBottom" : 10}}>
        <Text>Yesterday</Text>
      </View>}
    {Ymessages && Ymessages.map((m, i) => {
       const formatted_date =  moment(m.createdAt).format("LT")
      return <>
      {/* <View>
        <Text>Yesterday</Text>
      </View> */}
      <View key={m._id} style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#593196" : "#E8E8E8"
      }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-end" : "flex-start"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>

       <Text key={m._id} style={{
          
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          
          
      }}>
      {m.content}
       </Text>
          
        
       
    
     <View style={{flexDirection:"row"}}>
       <Text style={{color:"white"}}>{formatted_date}</Text>
       {
         
      <Ionicons name="checkmark-outline" size={20} color="white" />
      
      
      
       
       
       
        
      }
      {
          m.sender._id === user._id  && m.receiver != null && m.marked == "true" &&  
       
      <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
      
      
      
       
       
       
      }
      </View>
               </View>
      </>
      
   
   
     
    
})}
{Tmessages && Today &&   <View style={{"alignItems": "center", "marginBottom" : 10}}>
        <Text >Today</Text>
      </View>}
    {Tmessages && Tmessages.map((m, i) => {
       const formatted_date =  moment(m.createdAt).format("LT")
      return <>
      {/* <View>
        <Text>Today</Text>
      </View> */}
      <View key={m._id} style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#593196" : "#E8E8E8"
      }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-end" : "flex-start"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>

       <Text key={m._id} style={{
          
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          
          
      }}>
      {m.content}
       </Text>
          
        
       
    
     <View style={{flexDirection:"row"}}>
       <Text style={{color:`${m.sender._id === user._id ? "white" : "black"}` }}>{formatted_date}</Text>
       {
         
      <Ionicons name="checkmark-outline" size={20} color={m.sender._id === user._id ? "white" : "black"} />
      
      
      
       
       
       
        
      }
      {
          m.sender._id === user._id  && m.receiver != null && m.marked == "true" &&  
       
      <Ionicons name="checkmark-done" size={20} color={m.sender._id === user._id ? "white" : "black" } style={{marginLeft:10}} />
      
      
      
       
       
       
      }
      </View>
               </View>
      </>
      
   
   
     
    
})}
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
      <View style={{flexDirection:"row"}}>
      <Text  style={{color:"white"}}>{now.format('LT')}</Text>
       <Ionicons name="checkmark-outline" size={20} color="white" />
      </View>
      </View>
        }
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