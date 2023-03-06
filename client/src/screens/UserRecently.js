import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AppState, Pressable, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { singleChat } from '../features/chat/chatSlice'

function UserRecently({data, userData}) {
  const navigation = useNavigation()
  // console.log(data)
  const [selectedUserData, setselectedUserData] = useState([])
  const { user } = useSelector((state) => state.auth)
 var lastSeen = userData.lastSeen
  const [userName, setUsername] = useState(userData.userName)
  var now = moment(lastSeen).format("MMMM Do LT")
  const [status, setStatus] = useState()

  console.log(now)

  // if(data){
  //   const formatted_date = data.lastSeen
  //   const [lastSeen, setlastSeen] = useState(moment(formatted_date).format("MMMM Do LT"))
  // }

  
  // useEffect(() => {
  //   singleChat()
  //   // displaySelectedUserDetails()
  //   }, [])
    // useEffect(() => {
    //   navigation.addListener('focus', displaySelectedUserDetails())
    //   // UpdateUserRoute()
    //  //  console.log(route.name)
    //    // setImage(null)
    //   }, [])

    const singleChat = async () => {
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
          if(selectedUserData != null){
            if(user != null){
             for(var i = 0; i < selectedUserData.users.length ; i++){
             
               if(selectedUserData.users[i]._id != user._id){
                 console.log(selectedUserData.users[i])
                 setStatus(selectedUserData.users[i].status)
                 const formatted_date =moment( selectedUserData.users[i].lastSeen).format("MMMM Do LT")
                 setlastSeen(formatted_date)
               
               //  return <Text>{selectedUserData.users[i].status} was last seen at {formatted_date}</Text>
               }
             }
            }
             }
          // displaySelectedUserDetails()
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
              console.log(selectedUserData.users[i])
              setStatus(selectedUserData.users[i].status)
              const formatted_date =moment( selectedUserData.users[i].lastSeen).format("MMMM Do LT")
              setlastSeen(formatted_date)
            
            //  return <Text>{selectedUserData.users[i].status} was last seen at {formatted_date}</Text>
            }
          }
         }
          }
          // return <Text>jbtujbugbreu</Text>
        }
        
   
  //  console.log(status)
    
    // console.log(data)
  return (
    <View>
      
        {/* {singleChat()} */}
           {/* {displaySelectedUserDetails()} */}
        <Text>{userName}</Text>
          {/* <Pressable onPress={() => singleChat()}>
    <Text>press herr to get updated chat info</Text>
        </Pressable> */}
        {/* <Text>{lastSeen}</Text> */}
       {/* { status === "online" ?  <Text>Online</Text> : null}
       { status === "away" ?  <Text>last seen at {lastSeen} </Text>  : null} */}
        {/* <Text>last seen at {lastSeen} </Text> */}
        
    </View>
  )
}

export default UserRecently