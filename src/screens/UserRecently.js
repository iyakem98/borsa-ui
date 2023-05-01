import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AppState, Pressable, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { singleChat } from '../features/chat/chatSlice'
import { useNavigation } from '@react-navigation/native'

function UserRecently({userData}) {
  const navigation = useNavigation()
  // console.log(userData)
  const [selectedUserData, setselectedUserData] = useState([])
  const { user } = useSelector((state) => state.auth)
  const userId = userData._id
  // const [status, setStatus] = useState(data.status)
  // const formatted_date = data.lastSeen
  // const [userName, setUsername] = useState(userData.firstName)
  const [firstName, setFirstName] = useState(userData.firstName)
  // const [lastSeen, setlastSeen] = useState(moment(formatted_date).format("MMMM Do LT"))
  // const [status, setStatus] = useState(data.status)


    const singleChat = async (data) => {
      const chatId = data
        // console.log(data)
        // console.log('in single chat service')
        const user1 = await  AsyncStorage.getItem("user")
        const user = JSON.parse(user1)
        // // console.log(user)
      
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
          try{
            const {data} = await axios.get(`http://192.168.100.2:5000/api/chat/single/${chatId}`, config)
          //  console.log(data)
          setselectedUserData(data)
          // for(var i = 0; i < selectedUserData.users.length ; i++){
          //   if(user != null)
          //   if(selectedUserData.users[i]._id != user._id){
          //     console.log(`found selected users with id = ${selectedUserData.users[i]._id} and status =  ${selectedUserData.users[i].status}` )
          //   }
          // }
          // console.log(selectedUserData.users[0]._id)
            // return data
          }
          catch(err){
            console.log(err)
          }
        //   // console.log('fetchin in chatService')
        //   // const response = await axios.get(API_URL, config)
         
        //   // return data
        
       
        }
        const displaySelectedUserDetails =() => {
          if(selectedUserData != null){
         if(user != null){
          for(var i = 0; i < selectedUserData.users.length ; i++){
          
            if(selectedUserData.users[i]._id != user._id){
              const formatted_date =moment( selectedUserData.users[i].lastSeen).format("MMMM Do LT")
            
             return <Text>{selectedUserData.users[i].status} was last seen at {formatted_date}</Text>
            }
          }
         }
          }
          // return <Text>jbtujbugbreu</Text>
        }
        
   
   
    
    // console.log(data)
  return (
    <View>
        {/* <Pressable onPress={() => singleChat(data)}>
    <Text>prss herr to get updated chat info</Text>
        </Pressable> */}
        {/* {singleChat()} */}
           {/* {displaySelectedUserDetails()} */}
           <Text style = {{
          fontSize: 18
        }}>{firstName}</Text>
        {/* <Text>{lastSeen}</Text> */}
       {/* { status === "online" ?  <Text>Online</Text> : null}
       { status === "away" ?  <Text>last seen at {lastSeen} </Text>  : null} */}
        {/* <Text>last seen at {lastSeen} </Text> */}
        
    </View>
  )
}

export default UserRecently