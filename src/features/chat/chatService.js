import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/config'

const API_URL = `${API_BASE_URL}chat/`
const accessChat = async(userId) => {
  const user1 = await  AsyncStorage.getItem("user")
  const user = JSON.parse(user1)
  try{
    const config = {
      headers: {
          Authorization: `Bearer ${user.token}`

      }
  }
    const {data} = await axios.post(API_URL, userId, config)

    console.log(data)
    return data
    
    }
    catch(error){
      console.log("cannot create chat")
    }

    // console.log(userId)

    
    

    
}

const tryChat = async(chatData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`

      }
  }
  console.log(chatData)
  const response = axios.post(API_URL + 'try', chatData, config)
  
  console.log(response)
  

  return response.data 
}

const fetchChat = async () => {
  // const user1 = await  AsyncStorage.getItem("user")
  const user1 = await  AsyncStorage.getItem("@user_data")
  const user = JSON.parse(user1)
  

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    
    console.log('fetchin in chatService')
    // const response = await axios.get(API_URL, config)
    const {data} = await axios.get(API_URL, config)
  
    return data
  
 
  }
// const singleChat = async (chatId) => {
//   console.log(chatId)
//   // console.log('in single chat service')
//   const user1 = await  AsyncStorage.getItem("user")
//   const user = JSON.parse(user1)
//   // console.log(user)

//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//     try{
//       const {data} = await axios.get(`http://192.168.100.2:5000/api/chat/single/${chatId}`, config)
//       console.log(data)
//     }
//     catch(err){
//       console.log(err)
//     }
//     // console.log('fetchin in chatService')
//     // const response = await axios.get(API_URL, config)
   
//     // return data
  
 
//   }
// const deleteChat = async (chatID) => {
//   const user1 = await  AsyncStorage.getItem("user")
//   const user = JSON.parse(user1)
 
//   try{
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
      
//     }
//     console.log(chatID)
//     // console.log('fetchin in chatService')
//     // const response = await axios.get(API_URL, config)
    
//     // const response =  await axios.get("http://localhost:5000/api/chat/remove", chatID, config)
//     const response =  await axios.get(API_URL + "remove",config)
    
//     console.log(response)
//   }
//   catch(err){
//     console.log(err)
//   }
    
   
  
 
//   }

const chatService = {
    accessChat,
    fetchChat,
    tryChat,
    // singleChat
   
}
export default chatService