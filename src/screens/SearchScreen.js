import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { View } from 'react-native'
import { ChatState } from '../context/ChatProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChat } from '../features/chat/chatSlice';
import moment from 'moment';
import { getSenderFull } from '../ChatConfig/ChatLogics';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Shared/Header';
import SearchBar from '../components/Chats/ChatListItem/SearchBar';
function SearchScreen() {
  const { user } = useSelector((state) => state.auth)
  const {
    searchFirstName, setsearchFirstName,
    selectedChat, setSelectedChat, 
      chats, setChats, 
      chatSelected, setchatSelected, 
      fetchAgain, setfetchAgain, 
      notification, setNotification,
      receivedMessage, setreceivedMessage,
      sentMessage, setsentMessage,
      messageSentOrReceived, setmessageSentOrReceived,
      chattId, setchattId,
      checkContent, setcheckContent,
      TtriggerChange, setTtriggerChange,
      YtriggerChange, setYtriggerChange,
      OtriggerChange, setOtriggerChange,
      loading,  setloading,
} = ChatState();
const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
const dispatch = useDispatch();
const navigation = useNavigation();

useEffect(()=>{
  console.log("-=====---", searchFirstName && chattts && chattts.length > 0)
},[chattts])

// useLayoutEffect(() =>{
//   dispatch(fetchChat())
// }, [])
// useEffect(() =>{
//   dispatch(fetchChat())
// }, [fetchAgain])
// useEffect(() =>{
// //     console.log(route.name)
// // }, [])
// useEffect(() =>{
//   dispatch(fetchChat())

// }, [])
// useEffect(() => {
// navigation.addListener('focus', () => dispatch(fetchChat()))

// }, [])
// console.log('chattts present', chattts)
// console.log('search first name', searchFirstName)

  return (
    <SafeAreaView style={styles.con}>
      <Header backBtn textField textData={searchFirstName} onTextChange={(text)=>{
        setsearchFirstName(text)
      }} />
      {/* <SearchBar /> */}
      <ScrollView  style={styles.users}>
        {/* <View>
          <Text>search screen</Text>
          <Text>{searchFirstName}</Text>
        </View> */}
        { !searchFirstName && (
          <View style={{"alignItems": "center", "marginTop" : 300}}>
            <FontAwesome name="search-minus" size={70} color="black" style={{ "marginBottom" : 20}} />
            <Text>Please Type Word to Find Chat</Text>
          </View>
        )}
        { searchFirstName && chattts && chattts.length > 0 ? (
          chattts.map((chat) => {
            var formatted_date = null
            if( chat != null &&  chat.latestMessage != null){
              formatted_date = moment(chat.latestMessage.createdAt).format("LT")   
              if(chat?.users && chat?.users[1]?.firstName && (chat?.users[1]?.firstName.toLowerCase().includes(searchFirstName)) && chat?.latestMessage != null ){
                if(chat !== null || chat !== undefined){
                  console.log(chat.lastestMessage)
                  if(chat.lastestMessage == undefined || chat.lastestMessage == null  ){
                    // console.log('undefined chat(s)')
                  }
                  if(chat.latestMessage){
                    let msgdate = null
                    msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
                    let today = moment()
                    let d = today.diff(msgdate, 'days')
                    if(d==0){
                      var formatted_date = null 
                      if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
                        formatted_date = moment(chat.latestMessage.createdAt).format("LT")
                      }
                      return (
                        <Pressable key={chat._id} onPress={() => {
                            setloading(true)
                            setchattId(chat._id)
                            setSelectedChat(chat)
                            navigation.navigate('Messaging', {userSelected: user != null ? getSenderFull(user, chat.users) : null })
                          }}
                          style={styles.container}
                        >
                          <View>
                            <Image 
                              source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                              style = {styles.image}
                            />
                          </View>
                          <View style = {styles.content}>
                            <View style = {styles.row}>
                              <Text style = {styles.name}>
                                {user != null ? getSenderFull(user, chat.users).firstName : null}
                              </Text> 
                              <Text style = {styles.subTitle}>{formatted_date}</Text>
                            </View>
                            {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ? (
                              <View style = {{
                                flexDirection: 'row'
                              }}>
                                <View>
                                  <Text  numberOfLines={2} style = {styles.subTitle}>
                                    {chat.latestMessage.content}
                                  </Text>
                                </View>
                              </View>
                            ) : <Text>File Uploaded</Text>}
                          </View>
                        </Pressable>
                      )} else if(d == 1){
                        return (
                          <Pressable key={chat._id} onPress={() => {
                            setloading(true)
                            setchattId(chat._id)
                            setSelectedChat(chat)
                            navigation.navigate('Messaging', {userSelected: user != null ? getSenderFull(user, chat.users) : null })
                          }} 
                          style={styles.container}>
                            <View>
                              <Image 
                                source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                                style = {styles.image}
                              />
                            </View> 
                            <View style = {styles.content}>
                              <View style = {styles.row}>
                                <Text style = {styles.name}>
                                  {user != null ? getSenderFull(user, chat.users).firstName : null}
                                </Text>
                                <Text style = {styles.subTitle}>Yesterday</Text>
                              </View>
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ? (
                                <View style = {{
                                  flexDirection: 'row'
                                }}>
                                  <View>
                                    <Text  numberOfLines={2} style = {styles.subTitle}>
                                      {chat.latestMessage.content}
                                    </Text>
                                  </View>
                                </View>
                              ) : <Text>File Uploaded</Text>}
                            </View>
                          </Pressable>
                        )
                      } else {
                        if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
                          formatted_date = moment(chat.latestMessage.createdAt).format("DD/MM/YY")
                        }
                        return (
                          <Pressable key={chat._id} onPress={() => {
                            setloading(true)
                            setchattId(chat._id)
                            setSelectedChat(chat)
                            navigation.navigate('Messaging', {userSelected: user != null ? getSenderFull(user, chat.users) : null })}} 
                          style={styles.container}>
                            <View>
                              <Image 
                                source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                                style = {styles.image}
                              />
                            </View>
                            <View style = {styles.content}>
                              <View style = {styles.row}>
                                <Text style = {styles.name}>
                                    {user != null ? getSenderFull(user, chat.users).firstName : null}
                                </Text> 
                                <Text style = {styles.subTitle}>{formatted_date}</Text>
                              </View>
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ? (
                                <View style = {{
                                  flexDirection: 'row'
                                }}>
                                  <View>
                                    <Text  numberOfLines={2} style = {styles.subTitle}>
                                      {chat.latestMessage.content}
                                    </Text>
                                  </View>
                                </View>
                              ) : <Text>File Uploaded</Text>}
                        </View>
                      </Pressable>   
                    )
                  }
                }}
              }
            }
          })
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  con: {
    flex:1,
    backgroundColor: "white"
  },
    users: {
      backgroundColor: "white"
  },
  connectBtn: {
    // backgroundColor: "red",
    backgroundColor: '#593196',
    width: "65%",
    height: 43,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: 'center'
  },
  connectTxt: {
    fontSize: 20,
  },
  text: {
    marginTop: 200,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  container: {
    paddingTop: 0,
    marginTop: 0,
    flexDirection: 'row',
    // marginHorizontal: 10,
    // marginVertical: 5,
    height: 70,
    backgroundColor: '#fff'
  },
  notif: {
    alignItems: 'flex-end',
  },
  notifClr: {
    color: 'red',
    // paddingTop: 10
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
  Tex: {
    marginTop: 200
  }
})