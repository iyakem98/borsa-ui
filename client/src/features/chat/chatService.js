import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = 'http://172.20.10.2:5003/api/chat/'
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
  const user1 = await  AsyncStorage.getItem("user")
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

const chatService = {
    accessChat,
    fetchChat,
    tryChat
}
export default chatService