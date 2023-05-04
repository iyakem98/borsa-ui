import {View, Text, TextInput, StyleSheet, Pressable, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from '../../../context/ChatProvider';
import { getSenderFull } from '../../../ChatConfig/ChatLogics';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import moment from 'moment';


// const ChatListHeader = ( {YchatArr, TchatArr, OchatArr} ) => {
const ChatListHeader = ( {chatArr} ) => {
    // console.log("todays chats " + TchatArr.length)
    if(chatArr != undefined)
    console.log("All chatsss " + chatArr)
    else{
        console.log(false)
    }
    // if(TchatArr != undefined)
    // console.log("Todays chatsss " + TchatArr)
    // if(OchatArr != undefined)
    // console.log("others chatsss " + OchatArr)
    // else{
    //     console.log(false)
    // }
    // console.log("other chats " + OTchatArr.length)
    // console.log("Testing")
    // console.log("here is the chat arrray " +chatArr[0]._id)
    const { user } = useSelector((state) => state.auth)
    const {triggerChange, settriggerChange,
        selectedChat, setSelectedChat, 
        chattId, setchattId,
        loading,  setloading,
        TtriggerChange, setTtriggerChange,
      YtriggerChange, setYtriggerChange,
      OtriggerChange, setOtriggerChange,
    } = ChatState();

    const [triggerChange2, settriggerChange2] = useState(false);
    const navigation = useNavigation()
    
    const [query, setQuery] = useState("")
    var formatted_date = null
    // console.log('query' + query)
   
    useEffect(()=> {
        // setYtriggerChange(false)
        // console.log(chatArr[0])
        // console.log(chatArr.splice(0, 2))
        // console.log(triggerChange)
    }, [])
    // console.log(triggerChange)
    // console.log(chatArr.filter(user => chatArr.users[1].firstName.includes("a")))
  return (
    <View style = {styles.container}>
    <View style = {styles.input}>
    <Ionicons name="search" size={24} color="gray" />
        <TextInput
            style = {{ paddingHorizontal: 10,
                paddingVertical: 7,
                 width: "100%",
                 fontSize: 17,
                 //color: '#593196'
    }} 
            placeholder='search for users'
            placeholderTextColor="gray" 
            onFocus={()=> {
                settriggerChange(true)
                settriggerChange2(true)

            }}
            onChangeText={(e) => {
                setQuery(e)
                   if(e == ""|| e == undefined ){
                    settriggerChange(false)
                    settriggerChange2(false)
                    // setYtriggerChange(false)
                    // setTtriggerChange(false)
                   
                   }
                   else{
                    settriggerChange(true)
                    settriggerChange2(true)
                    // setYtriggerChange(true)
                    // setTtriggerChange(true)
                    
                   
                   }         
            }}
            autoCapitalize="none"


            />
            
        </View>
        <View>
        {chatArr &&    chatArr.map(chat => {
  
  if( chat != null &&  chat.latestMessage != null){
      formatted_date = moment(chat.latestMessage.createdAt).format("LT")
      
      if(chat?.users && chat?.users[1]?.firstName && (chat?.users[1]?.firstName.toLowerCase().includes(query)) && chat?.latestMessage != null ){
        if(chat !== null || chat !== undefined){
          console.log(chat.lastestMessage)

            // if(chat.lastestMessage !== undefined || chat.lastestMessage !== null  ){
            if(chat.lastestMessage == undefined || chat.lastestMessage == null  ){
              console.log('undefined chat(s)')
            
             
            }
            if(chat.latestMessage){
              // reserved for displaying a single chat box for no messages rather than multiple
              // console.log('chat exists')
              // chatArr2.push(chat)
              // setSelectedChat(chat)
              let msgdate = null
              msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
              let today = moment()
              let d = today.diff(msgdate, 'days')
              if(d==0){
                var formatted_date = null 
if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){

 formatted_date = moment(chat.latestMessage.createdAt).format("LT")

}
      return <>
              
{triggerChange2 && <Pressable key={chat._id} onPress={()=> {
  // setYtriggerChange(true)
  setSelectedChat(chat)
  setchattId(chat._id)
setloading(true)
      navigation.navigate('Messaging', {chatId: chat._id, userSelected:
  
          user != null ? getSenderFull(user, chat.users) : null })}}
          style={styles.box}
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
                  <Text style = {styles.subTitle}>
                      {/* {dayjs(chat.latestMessage).fromNow(true)} */}
                      {formatted_date}
                      {/* Yesterday */}
                  </Text>   
              </View>
              {chat.latestMessage && chat.latestMessage.content ?
                  <View style = {{
                  flexDirection: 'row'
                  }}>

                  
                  {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                  
                  <Text  numberOfLines={2} style = {styles.subTitle}>
                      {chat.latestMessage.content}
                  </Text>
                  </View>
      
         : "" }    

      </View>

  </Pressable>

              }
          </>      
                
              }
              else if(d == 1){
                return <>
              
                {triggerChange2 && <Pressable key={chat._id} onPress={()=> {
                  // setYtriggerChange(true)
                  setSelectedChat(chat)
                  setchattId(chat._id)
                setloading(true)
                      navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                  
                          user != null ? getSenderFull(user, chat.users) : null })}}
                          style={styles.box}
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
                                  <Text style = {styles.subTitle}>
                                      {/* {dayjs(chat.latestMessage).fromNow(true)} */}
                                      {/* {formatted_date} */}
                                      Yesterday
                                  </Text>   
                              </View>
                              {chat.latestMessage && chat.latestMessage.content ?
                                  <View style = {{
                                  flexDirection: 'row'
                                  }}>
                
                                  
                                  {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                                  
                                  <Text  numberOfLines={2} style = {styles.subTitle}>
                                      {chat.latestMessage.content}
                                  </Text>
                                  </View>
                      
                         : "" }    
                
                      </View>
                
                  </Pressable>
                
                              }
                          </>  
               
              }
              else {
              var formatted_date = null 
if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){

 formatted_date = moment(chat.latestMessage.createdAt).format("DD/MM/YY")
}

return <>
              
{triggerChange2 && <Pressable key={chat._id} onPress={()=> {
  // setYtriggerChange(true)
  setSelectedChat(chat)
  setchattId(chat._id)
setloading(true)
      navigation.navigate('Messaging', {chatId: chat._id, userSelected:
  
          user != null ? getSenderFull(user, chat.users) : null })}}
          style={styles.box}
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
                  <Text style = {styles.subTitle}>
                      {/* {dayjs(chat.latestMessage).fromNow(true)} */}
                      {formatted_date}
                      {/* Yesterday */}
                  </Text>   
              </View>
              {chat.latestMessage && chat.latestMessage.content ?
                  <View style = {{
                  flexDirection: 'row'
                  }}>

                  
                  {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                  
                  <Text  numberOfLines={2} style = {styles.subTitle}>
                      {chat.latestMessage.content}
                  </Text>
                  </View>
      
         : "" }    

      </View>

  </Pressable>

              }
          </>      
                
              }
              
            }
            

          
        }

      
    }
    
 
  }
  })}
         
        </View>
            
</View>
  )
}
const styles = StyleSheet.create ({
    box : {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        backgroundColor: '#fff'
    }, 
    container: {
       paddingVertical: 16,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },

    input: {
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: '80%',
        borderRadius: 20,
        paddingLeft: 10,
        alignItems: 'center',
        marginLeft: 40,
        
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
      },

    cheader: {
        fontWeight: 'bold',
        fontSize: 40,

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
 export default ChatListHeader