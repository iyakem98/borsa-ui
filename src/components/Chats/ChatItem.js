import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchChat } from '../../features/chat/chatSlice';
import axios from 'axios';

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
  const [notifLength, setNotifLength] = useState(0)
  const [isMarked, setIsMarked] = useState(chat.latestMessage?.marked)

  useEffect(()=>{
    if(storedNotifications) {
      setNewMessage()
      storedNotifications.map((notif) => {
      //  console.log('bbnn',notif)
      if(notif == undefined){
        console.log('notif undefined')
      } else {
        if(notif.chat._id == chat._id){
          setNotifLength(prev => prev + 1)
          setNewMessage(notif?.content)
        }
      }})
    }
  }, [storedNotifications])

  useEffect(() =>{
    // console.log("-=======", chat.latestMessage)
    setNewMessage()
    dispatch(fetchChat())
  }, [notifLength])

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
        setIsMarked(true)
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
      </View>
      <View style = {styles.content}>
        <View style = {styles.row}>
          <Text style = {styles.name}>
            {user != null ? getSenderFull(user, chat.users)?.firstName : null}
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
                {newMessage ? newMessage : chat.latestMessage.content}
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
        {notifLength > 0 || !isMarked ? (
          <View style={styles.notif}>
            {/* <Text style={styles.notifTxt}>{notifLength}</Text> */}
          </View>
        ) : null}
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
    backgroundColor: '#fff'
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