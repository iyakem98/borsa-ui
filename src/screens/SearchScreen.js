import React from 'react'
import { Text } from 'react-native'
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
   <>
   <ScrollView>
   {/* <View>
    <Text>search screen</Text>
    <Text>{searchFirstName}</Text>
   </View> */}
      { !searchFirstName &&chattts && chattts.length > 0 && (chattts.map((chat) => {
              var formatted_date = null
              if(chat !== null || chat !== undefined){
             

                
                if(chat.lastestMessage == undefined || chat.lastestMessage == null  ){
                  
                null
                 
                }
                if(chat.latestMessage){
                  // reserved for displaying a single chat box for no messages rather than multiple
                 
                  let msgdate = null
                  msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD")
                  let today = moment()
                  let d = today.diff(msgdate, 'days')
                  if(d==0){
                    var formatted_date = null 
 if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
  
     formatted_date = moment(chat.latestMessage.createdAt).format("LT")
   
 }
                    

                    
                    return <Pressable key={chat._id} onPress={() => 
                      {
                        setloading(true)
                        setchattId(chat._id)
                        // chatArr2.push(chat)
                        setSelectedChat(chat)
                      navigation.navigate('Messaging', {userSelected:
                        
                      user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
                                    {/* Today */}
                                  </Text> 
                                 
                                
                              </View>
                             
                              
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ?
                              <View style = {{
                                flexDirection: 'row'
                              }}>
                                
                                <View>
                                <Text  numberOfLines={2} style = {styles.subTitle}>
                                  {chat.latestMessage.content}
                                </Text>
                                    {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
                                  </View>
                                  
                              </View>
                              
                              
                                 : <Text>File Uploaded</Text> }
                                 {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 ? <View style={styles.notif}>
                                    <Text style={styles.notifClr}>{storedNotifications.length}</Text>
                                  </View> : <Text></Text> }  */}
                                 {/* {storedNotifications  && storedNotifications.map((notif) => {
                               
                             
                                    if(notif == undefined){
                                      console.log('notif undefined')
                                    }
                                    else{
                                      if(notif.chat._id == chat._id){
                                        return <View style={styles.notif}>
                                       
                                       <Octicons name="dot-fill" size={24} color="red" />
                                      </View>
                                      }
                                    }
                                    
                                  
                                  
                                  
                                 })
                                 }  */}
                               {/* <Text>notifffehih</Text> */}
                                 {/* {(storedNotifications != null || storedNotifications != undefined) && storedNotifications.length > 0 
                                  &&  <View  style={styles.notif}><Text>notif</Text></View>
                                 }  */}
                             
                          </View>
                          </Pressable>
                    // }
                    
                    
                  }
                  else if(d == 1){
                    // if(triggerChange == false){
                    return <Pressable key={chat._id} onPress={() => 
                      {
                        setloading(true)
                        setchattId(chat._id)
                        // chat2.push(chat)
                        // chatArr2.push(chat)
                        setSelectedChat(chat)
                      navigation.navigate('Messaging', {userSelected:
                        
                      user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
                                     
                                      
                                  Yesterday
                                  </Text>  
                                
                              </View>
                              {(chat.latestMessage !== null || chat.latestMessage !== undefined ) && chat.latestMessage.content != "" ?
                              <View style = {{
                                flexDirection: 'row'
                              }}>
                                
                                <View>
                                <Text  numberOfLines={2} style = {styles.subTitle}>
                                  {chat.latestMessage.content}
                                </Text>
                                    {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
                                  </View>
                                 
                              </View>
                              
                                 : <Text>File Uploaded</Text> }
                          </View>
                          </Pressable>
                    // }
                    // YesterdaysChats.push(chat)
                    // chat2.push(chat)
                   
                  }
                  else{
                  var formatted_date = null 
 if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
   
     formatted_date = moment(chat.latestMessage.createdAt).format("DD/MM/YY")
  
   
 }
  //  if(triggerChange == false){

 
 return <Pressable key={chat._id} onPress={() => 
   {
     setloading(true)
     setchattId(chat._id)
     setSelectedChat(chat)
   navigation.navigate('Messaging', {userSelected:
     
   user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
           {(chat.latestMessage !== null || chat.latestMessage !== undefined ) && chat.latestMessage.content != "" ?
           <View style = {{
             flexDirection: 'row'
           }}>
             
             <View>
             <Text  numberOfLines={2} style = {styles.subTitle}>
               {chat.latestMessage.content}
             </Text>
                
               </View>
              
           </View>
           
              : <Text>File Uploaded</Text> }
       </View>
       </Pressable>
  //  }
                    // OtherChats.push(chat)
                    // chat3.push(chat)
                    
                  }
                  
                }
                

              
            }

    
                  }))}
      { searchFirstName && chattts && chattts.length > 0 && (chattts.map((chat) => {
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
          //       return <>
                        
          //  <Pressable key={chat._id} onPress={()=> {
           
          //   setSelectedChat(chat)
          //   setchattId(chat._id)
          // setloading(true)
          //       navigation.navigate('Messaging', {chatId: chat._id, userSelected:
            
          //           user != null ? getSenderFull(user, chat.users) : null })}}
          //           style={styles.box}
          //   >
          //       <View>
          //       <Image 
          //         source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
          //         style = {styles.image}
          //      />
          //       </View>
          //       <View style = {styles.content}>
          //               <View style = {styles.row}>
          //                   <Text style = {styles.name}>
          //                       {user != null ? getSenderFull(user, chat.users).firstName : null}
          //                   </Text> 
          //                   <Text style = {styles.subTitle}>
          //                       {/* {dayjs(chat.latestMessage).fromNow(true)} */}
          //                       {formatted_date}
          //                       {/* Yesterday */}
          //                   </Text>   
          //               </View>
          //               {chat.latestMessage && chat.latestMessage.content ?
          //                   <View style = {{
          //                   flexDirection: 'row'
          //                   }}>
          
                            
          //                   {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                            
          //                   <Text  numberOfLines={2} style = {styles.subTitle}>
          //                       {chat.latestMessage.content}
          //                   </Text>
          //                   </View>
                
          //          : "" }    
          
          //       </View>
          
          //   </Pressable>
          
                        
          //           </>   
          return <Pressable key={chat._id} onPress={() => 
            {
              setloading(true)
              setchattId(chat._id)
              setSelectedChat(chat)
            navigation.navigate('Messaging', {userSelected:
              
            user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
                           
                            
                          {formatted_date}
                          {/* Today */}
                        </Text> 
                       
                      
                    </View>
                   
                    
                    {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ?
                    <View style = {{
                      flexDirection: 'row'
                    }}>
                      
                      <View>
                      <Text  numberOfLines={2} style = {styles.subTitle}>
                        {chat.latestMessage.content}
                      </Text>
                         
                        </View>
                        
                    </View>
                    
                    
                       : <Text>File Uploaded</Text> }
                       
                   
                </View>
                </Pressable>        
                          
                        }
                        else if(d == 1){
                        //   return <>
                        
                        //  <Pressable key={chat._id} onPress={()=> {
                        //     // setYtriggerChange(true)
                        //     setSelectedChat(chat)
                        //     setchattId(chat._id)
                        //   setloading(true)
                        //         navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                            
                        //             user != null ? getSenderFull(user, chat.users) : null })}}
                        //             style={styles.box}
                        //     >
                        //         <View>
                        //         <Image 
                        //           source={{uri: user != null ? getSenderFull(user, chat.users).profilePic : null}}  
                        //           style = {styles.image}
                        //        />
                        //         </View>
                        //         <View style = {styles.content}>
                        //                 <View style = {styles.row}>
                        //                     <Text style = {styles.name}>
                        //                         {user != null ? getSenderFull(user, chat.users).firstName : null}
                        //                     </Text> 
                        //                     <Text style = {styles.subTitle}>
                        //                         {/* {dayjs(chat.latestMessage).fromNow(true)} */}
                        //                         {/* {formatted_date} */}
                        //                         Yesterday
                        //                     </Text>   
                        //                 </View>
                        //                 {chat.latestMessage && chat.latestMessage.content ?
                        //                     <View style = {{
                        //                     flexDirection: 'row'
                        //                     }}>
                          
                                            
                        //                     {/* <Ionicons name="checkmark-outline" size={20} color="#593196" /> */}
                                            
                        //                     <Text  numberOfLines={2} style = {styles.subTitle}>
                        //                         {chat.latestMessage.content}
                        //                     </Text>
                        //                     </View>
                                
                        //            : "" }    
                          
                        //         </View>
                          
                        //     </Pressable>
                          
                                        
                        //             </>  
                        return <Pressable key={chat._id} onPress={() => 
                          {
                            setloading(true)
                            setchattId(chat._id)
                            setSelectedChat(chat)
                          navigation.navigate('Messaging', {userSelected:
                            
                          user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
                                         
                                          
                                        {/* {formatted_date} */}
                                        Yesterday
                                      </Text> 
                                     
                                    
                                  </View>
                                 
                                  
                                  {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ?
                                  <View style = {{
                                    flexDirection: 'row'
                                  }}>
                                    
                                    <View>
                                    <Text  numberOfLines={2} style = {styles.subTitle}>
                                      {chat.latestMessage.content}
                                    </Text>
                                       
                                      </View>
                                      
                                  </View>
                                  
                                  
                                     : <Text>File Uploaded</Text> }
                                     
                                 
                              </View>
                              </Pressable>     
                         
                        }
                        else {
                        // var formatted_date = null 
          if(chat.lastestMessage !== undefined || chat.lastestMessage !== null){
          
           formatted_date = moment(chat.latestMessage.createdAt).format("DD/MM/YY")
          }
          
         
          return <Pressable key={chat._id} onPress={() => 
            {
              setloading(true)
              setchattId(chat._id)
              setSelectedChat(chat)
            navigation.navigate('Messaging', {userSelected:
              
            user != null ? getSenderFull(user, chat.users) : null })}}  style={styles.container}>
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
                           
                            
                          {formatted_date}
                        </Text> 
                       
                      
                    </View>
                   
                    
                    {(chat.latestMessage !== null || chat.latestMessage !== undefined )  && chat.latestMessage.content != "" ?
                    <View style = {{
                      flexDirection: 'row'
                    }}>
                      
                      <View>
                      <Text  numberOfLines={2} style = {styles.subTitle}>
                        {chat.latestMessage.content}
                      </Text>
                         
                        </View>
                        
                    </View>
                    
                    
                       : <Text>File Uploaded</Text> }
                       
                   
                </View>
                </Pressable>     

                          
                        }
                        
                      }
                      
          
                    
                  }
          
                
              }
              
           
            }
                

              
            

    
                  }))}
  </ScrollView>
   </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  con: {
   
  
     
      marginTop: 200,
      borderRadius: 15,
     
    
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