import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser, getSender } from '../../../ChatConfig/ChatLogics'
import { ChatState } from '../../../context/ChatProvider'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const ScrollableFeed = ({messages, latestMessage, scrollref}) => {
  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth)
  const {
    sentMessage, setsentMessage, 
    receivedMessage, setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived,
    NewwMessage, setNewwMessage,
    activeToday,setactiveToday
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
    try{
      const config = {
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
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if(todaytest == true){
      setToday(true)
    } else {
      setToday(false)
    }
    if(yesterdaytest == true){
      setYesterday(true)
    } else {
      setYesterday(false)
    }
    if(othertest == true){
      setOther(true)
    } else {
      setOther(false)
    }
  }, [])
  
  const OtherFunc = (messages)=>{
    var datesArray = []
    for(var i = 0; i <= messages.length; i++){
      if(messages[i] == undefined || messages[i+1]== undefined){
        break
      } else {
        var formatted_date1 = moment(messages[i].createdAt).format("YYYY-MM-DD")
        var formatted_date2 = moment(messages[i + 1].createdAt).format("YYYY-MM-DD")
        if(formatted_date1 == formatted_date2){
          datesArray.push(formatted_date2)
        } else if(formatted_date1 !== formatted_date2) {
          datesArray.push(formatted_date1)
        }
      }
    }

    for(var i = datesArray.length ; i >= 0; i--){
      if(datesArray[i] === datesArray[i - 1]){
        datesArray.splice(i, 1)
      }
    }
    return (
      <>
        <View>
          {datesArray.map((date)=> {
            return displayotherMs(date, messages)
          })}
        </View>
      </>
    )
  }
  const displayotherMs = (date, messages) => {
    return (
      <>
        <View style={{"alignItems": "center", "marginBottom" : 10}}>
          {/* <Text>{main_formatted_date}</Text> */}
          <Text style = {{
            marginBottom: 10,
            marginTop: 30,
          }}>{date}</Text>
        </View>
        {messages && messages.map((m, i) => {
          var test_date = moment(m.createdAt).format("YYYY-MM-DD")
          const formatted_date = moment(m.createdAt).format("LT")
          if(test_date == date){
            return (
              <>
                <View key={m._id} style = {[styles.container, {
                  backgroundColor: m?.sender?._id === user?._id ? "#593196" : "#E8E8E8",
                  alignSelf: m?.sender?._id === user?._id ? "flex-end" : "flex-start",
                  marginTop: isSameUser(messages, m , i , user?._id)? 5 : 10, 
                  borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                  borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
                }]}>
                  <Text key={m._id} style={{color: m?.sender?._id === user?._id ? "white" : "black"}}>{m.content}</Text>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{
                      color: m.sender?._id === user?._id ? "#fff" : "#404040",
                      fontSize: 12,
                      marginTop: 2,
                    }}>{formatted_date}</Text>
                    {m.sender?._id == user?._id? (
                      <Ionicons name="checkmark-outline" size={17} color="white" />
                    ) : null}
                    {m.sender?._id === user._id  && m.receiver != null && m.marked && (
                      <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
                    )}
                  </View>
                </View>
              </>
            )
          }
        })}
      </>
    )
  }

  // const publicFolder = "http://192.168.100.2:5000/images/"
  const publicFolder = "http://192.168.100.2:5000/images/"
  const now = moment()
  // console.log(todaytest)
  return (
    <ScrollView
      ref={scrollref}
      onContentSizeChange={() =>  scrollref.current.scrollToEnd({animated: false})}
      style = {{
        backgroundColor: "#fff",
        paddingBottom: 30,
      }}>
      {messages && messages ? messages.map((m, i) => {
        let msgdate = moment(m?.createdAt, "YYYY-MM-DD")
        let today = moment()
        let d = today.diff(msgdate, 'days')
        if(d==0){
          // console.log('pushing today messags')
          todaytest = true
          console.log("todaytest")
          Tmessages.push(m)
          setactiveToday(false)

        } else if(d == 1){
          Ymessages.push(m)
          yesterdaytest = true
          console.log("yesterdtest")
        } else {
          Omessages.push(m)
          othertest = true
          console.log("oldddtest")
        }
      }) : null}
      {Omessages && Other && OtherFunc(Omessages)}
      {Omessages && Omessages.map((m, i) => {
        const formatted_date =  moment(m.createdAt).format("LT")
        const formatted_date2 =  moment(m.createdAt).format("YYYY-MM-DD")
      })}
      {Ymessages && Yesterday && (
        <View style={{"alignItems": "center", "marginBottom" : 10}}>
          <Text style = {{
            marginBottom: 10,
            marginTop: 30,
          }}>Yesterday</Text>
        </View>
      )}
      {Ymessages && Ymessages.map((m, i) => {
        const formatted_date =  moment(m.createdAt).format("LT")
          return (
            <>
              <View key={m._id} style = {[styles.container, {
                backgroundColor: m.sender._id === user._id ? "#593196" : "#E8E8E8",
                alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                marginTop: isSameUser(messages, m , i , user._id) ? 5 : 10, 
                borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
              }]}>
                <Text key={m._id} style={{color: m.sender._id === user._id ? "white" : "black"}}>
                  {m.content}
                </Text>
                <View style={{flexDirection:"row"}}>
                  <Text style={{
                    color: m.sender._id === user._id ? "#fff" : "#404040",
                    fontSize: 12,
                    marginTop: 2,
                  }}>{formatted_date}</Text>
                  {m.sender._id === user._id  && m.receiver != null && m.marked ? (
                    <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
                  ) : m.sender._id === user._id  && m.receiver != null && !m.marked ? (
                    <Ionicons name="checkmark-outline" size={17} color="white" />
                  ) : null}
                </View>
              </View>
            </>
          )
        }
      )}
      {Tmessages && Today && !activeToday && (
        <View style={{"alignItems": "center", "marginBottom" : 10}}>
          <Text style = {{
            marginBottom: 10,
            marginTop: 30,
          }} >Today</Text>
        </View>
      )}
      {activeToday && (
        <View style={{"alignItems": "center", "marginBottom" : 10}}>
          <Text >Today</Text>
        </View>
      )}
      {Tmessages && Tmessages.map((m, i) => {
        const formatted_date =  moment(m.createdAt).format("LT")
        
        return (
          <>
            <View key={m._id} style = {[styles.container, {
              backgroundColor: m?.sender?._id === user._id ? "#593196" : "#E8E8E8",
              alignSelf: m?.sender?._id === user._id ? "flex-end" : "flex-start",
              marginTop: isSameUser(messages, m , i , user._id)? 5 : 10, 
              borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
              borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
            }]}>
              <Text key={m._id} style={{
                color: m.sender._id === user._id ? "white" : "black",
              }}>
                {m.content}
              </Text>
              <View style={{flexDirection:"row", marginTop:3}}>
                <Text style={{
                  color: m.sender._id === user._id ? "#fff" : "#404040",
                  fontSize: 12,
                  marginTop: 2
                }}>{formatted_date}</Text>
                {m.sender._id === user._id  && m.receiver != null && m.marked ? (
                  <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
                ) : m.sender._id === user._id  && m.receiver != null && !m.marked ? (
                  <Ionicons name="checkmark-outline" size={17} color="white" />
                ) : null}
              </View>
            </View>
          </>
        )
      })}
      {NewwMessage && (
        <View style = {[styles.container, {
          backgroundColor:   "#593196",
          alignSelf:  "flex-end" ,
          marginTop: 5, 
          borderBottomRightRadius: 0,
        }]}>
          <Text style={{
            color: "white",
            marginBottom: 3, 
          }}>
            {latestMessage}
          </Text>
          <View style={{flexDirection:"row"}}>
            <Text  style={{color:"white", fontSize: 12, marginTop: 2}}>{now.format('LT')}</Text>
            {/* <Ionicons name="checkmark-outline" size={20} color="white" /> */}
       
            {/* <ActivityIndicator size="small" color="#fff" /> */}
            <Ionicons name="checkmark-outline" size={17} color="#fff"/>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#E8E8E8",
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
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