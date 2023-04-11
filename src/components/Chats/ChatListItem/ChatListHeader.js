import {View, Text, TextInput, StyleSheet, Pressable, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from '../../../context/ChatProvider';
import { getSenderFull } from '../../../ChatConfig/ChatLogics';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';


const ChatListHeader = ({chatArr}) => {
    // console.log("here is the chat arrray " +chatArr[0]._id)
    const { user } = useSelector((state) => state.auth)
    const {triggerChange, settriggerChange} = ChatState();
    const [triggerChange2, settriggerChange2] = useState(false);
    const navigation = useNavigation()
    
    const [query, setQuery] = useState("")
    useEffect(()=> {
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
            placeholder='search'
            placeholderTextColor="gray" 
            onFocus={()=> {
                settriggerChange(false)
                settriggerChange2(true)

            }}
            onChangeText={(e) => {
                setQuery(e)
                   if(e == ""){
                    settriggerChange(true)
                    settriggerChange2(false)
                   
                   }
                   else{
                    settriggerChange(false)
                    settriggerChange2(true)
                    
                   
                   }         
            }}
            autoCapitalize="none"


            />
            {/* add triggerchange2 event */}
        </View>
        <View>
            {chatArr &&    chatArr.map(chat => {
                if( chat != null &&  chat.latestMessage != null){
                    // if(chat.users && (chat.users[1].firstName.toLowerCase().includes(query) || chat.users[1].lastName.toLowerCase().includes(query) || chat.users[1].userName.toLowerCase().includes(query) || chat.users[0].firstName.toLowerCase().includes(query) ) && chat.latestMessage != null )
                    if(chat.users && chat.users[1].firstName.toLowerCase().includes(query) && chat.latestMessage != null )
                    {
                        return  <View key={chat._id}> 
                
                        {/* {chat.users && (chat.users[1].firstName.toLowerCase().includes(query) || chat.users[1].lastName.toLowerCase().includes(query) || chat.users[1].userName.toLowerCase().includes(query) ) && <Text>{chat.users[1].firstName}</Text> } */}
                        {/* if(chat.users && (chat.users[1].firstName.toLowerCase().includes(query) || chat.users[1].lastName.toLowerCase().includes(query) || chat.users[1].userName.toLowerCase().includes(query) ) && chat.latestMessage != null && 
                            chat.users[0].firstName != user.firstName)
                            {
                                console.log(chat.users[0].firstName )
                            } */}
                        
                        
                        
                        
                       {triggerChange2 && <Pressable key={chat._id} onPress={()=> {
                            navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                        
                                user != null ? getSenderFull(user, chat.users).userName : null })}}
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
                                            {dayjs(chat.latestMessage).fromNow(true)}
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
    
                       
                        
                        
                            {/* {chat.users && } */}
                        </View>
                    } 
                    // else if(chat.users[0].firstName.toLowerCase().includes(query) &&  ){
                    //     {triggerChange2 && <Pressable key={chat._id} onPress={()=> {
                    //         navigation.navigate('Messaging', {chatId: chat._id, userSelected:
                        
                    //             user != null ? getSenderFull(user, chat.users).userName : null })}}
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
                    //                         {dayjs(chat.latestMessage).fromNow(true)}
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
                    
                    //                 }

                    // }
               
                }
                })}
        </View>
    {/* <Ionicons name="filter-sharp" size={24} color="#593196" /> */}
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