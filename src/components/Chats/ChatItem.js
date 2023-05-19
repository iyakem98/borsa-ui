import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchChat } from '../../features/chat/chatSlice';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_BASE_URL_Socket } from '../../utils/config';

const ChatItem = ({
  storedNotifications,
  setchattId,
  setloading,
  chat,
  user,
  getSenderFull,
  formatted_date,
  setSelectedChat,
  popNav,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage]=  useState();
  const [notifLength, setNotifLength] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUserSender, setIsUserSender] = useState(chat.latestMessage?.sender?._id === user?._id ? true : false);
  const [isMarked, setIsMarked] = useState(chat.latestMessage?.marked)
  var socket = useRef(null);

  useLayoutEffect(() => {
    socket.current=io(API_BASE_URL_Socket)
    socket.current.on("active", () => setIsActive(true))
    socket.current.on("inActive", () => setIsActive(false))
    socket.current.on("typing", () => setIsTyping(true))
    socket.current.on("stop typing", () => setIsTyping(false))
  }, [])

  useEffect(()=>{
    if(storedNotifications) {
      setNewMessage()
      storedNotifications.map((notif) => {
      if(notif == undefined){
        console.log('notif undefined')
      } else {
        if(notif.chat._id == chat._id){
          setNotifLength(prev => prev + 1)
          setNewMessage(notif?.content)
          setIsUserSender(false)
        }
      }})
    }
  }, [storedNotifications])

  useEffect(() =>{
    setNewMessage()
    dispatch(fetchChat())
  }, [notifLength])

  useEffect(()=>{
    console.log("--000=--", isUserSender, !isMarked)
  } ,[isUserSender, !isMarked])

  const handleMarked = async() => {
    // try {
    //   const res = await axios.put('http://143.198.168.244/api/message/marked', {}, {})
    //   console.log(";;;;", res.data)
    // } catch(e) {
    //   console.log("ERROR WHILE MARKING: ", e)
    // }
  }

  useEffect(()=>{
    handleMarked()
  }, [])

  return (
    <Pressable 
      key={chat._id} 
      onPress={() => {
        if(!isUserSender) {
          setIsMarked(true)
        }
        setNotifLength(0)
        setloading(true)
        setchattId(chat._id)
        // chatArr2.push(chat)
        setSelectedChat(chat)
        navigation.navigate('Messaging', {
          userSelected: user != null ? getSenderFull(user, chat.users) : null 
        })
      }} style={styles.container}
    >
      <View>
        <Image
          source={{uri: user != null ? getSenderFull(user, chat.users)?.profilePic : null}}  
          style = {styles.image}
        />
        {isActive ? (
          <View style={{
            backgroundColor: 'green',
            height: 10,
            width: 10,
            borderRadius: 10,
            position: "absolute",
            bottom: 14,
            right: 14
          }} />
        ) : null}
      </View>
      <View style = {styles.content}>
        <View style = {styles.row}>
          <Text style = {styles.name}>
            {user != null ? (
              getSenderFull(user, chat.users)?.firstName + " " + getSenderFull(user, chat.users)?.lastName
            ) : null}
          </Text> 
          <Text style = {styles.subTitle}>
            {formatted_date}
          </Text>
        </View>
        {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ? (
          <View style = {{
            flexDirection: 'row'
          }}>
            <View>
              <Text  numberOfLines={2} style = {styles.subTitle}>
                {isTyping ? "Typing..." : newMessage ? newMessage : chat.latestMessage.content}
              </Text>
              {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
            </View>
          </View>
        ) : (
          <Text>File Uploaded</Text>
        )}
          {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 ? <View style={styles.notif}>
            <Text style={styles.notifClr}>{storedNotifications.length}</Text>
          </View> : <Text></Text> }  */}
        {isUserSender && !isMarked ? (
          <View style={styles.notifCheckmark}>
            <Ionicons name="checkmark-outline" size={24} color="black" />
          </View>
        ) : isUserSender && isMarked ? (
          <View style={styles.notifCheckmark}>
            <Ionicons name="checkmark-done-outline" size={24} color="black" />
          </View>
        ) : notifLength > 0 || (!isUserSender && !isMarked) ? (
          <View style={styles.notif} />
        ) : (null)}
        {/* <Text>notifffehih</Text> */}
          {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 
          &&  <View  style={styles.notif}><Text>notif</Text></View>
          }  */}
      </View>
    </Pressable>
  )
}

export default ChatItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  content: {
    flex: 1,
  },
  notif: {
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    right: 10,
    bottom: 20,
    backgroundColor: "#514590",
    width: 19,
    height: 19,
    borderRadius: 15
  },
  notifTxt: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 10
  },
  notifClr: {
    color: 'red',
    // paddingTop: 10
  },
  notifCheckmark: {
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    right: 10,
    bottom: 20,
    width: 19,
    height: 19,
    borderRadius: 15
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
})