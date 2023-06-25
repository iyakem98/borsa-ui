import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
import moment from 'moment';
import { API_BASE_URL } from '../../utils/config';

// const API_URL = '/api/users/'
const API_URL = 'http://143.198.168.244/api/'
const ENDPOINT = "http://192.168.100.2:5000"
// Register user
const register = async (userData) => {
  // console.log(userData)
  // const {data} = await axios.post(`${API_URL}users`, userData)
  // const {data} = await axios.post(`${API_BASE_URL}users/`, userData)
   const data1 = await AsyncStorage.setItem('user', JSON.stringify(userData))
   const data = await AsyncStorage.getItem('user')
   return userData
  // try{
  //   if (data) {
  //     const user = await AsyncStorage.setItem('user', JSON.stringify(data))
  //     const user1 = await AsyncStorage.getItem('user')
  //     console.log(JSON.stringify(user1))
  //     return data;
  //   }
  // }
  // catch(error){
  //   console.log('cannot register user')
  // }
  

  // return response.data
}

// Login user
const login = async (userData) => {
  // console.log(userData)
  // var socket = io(ENDPOINT)
  var socket = io(API_BASE_URL)
  return userData
  try{
    
    // const {data} = await axios.post(API_URL + 'users/login', userData)
    // const {data} = await  axios.post(`${API_BASE_URL}users/login`, userData)
  
    // if (data) {
    //   // localStorage.setItem('user', JSON.stringify(response.data))
    //   const user = await AsyncStorage.setItem('user', JSON.stringify(data))
    //   const user1 = await AsyncStorage.getItem('user')
    //   console.log(JSON.stringify(user1))
    //   socket.emit('user_online', { data, socketID : socket.id})
    //   return data;
      
    // }
  }
  
  catch(error){
    console.log("error in logging in")
  }

 
}
const UpdateLastSeenAndStatus = async(userData) =>{
  // console.log(`in updated slice of id ${userData}`)
  const user1 = await  AsyncStorage.getItem("user")
  const user = JSON.parse(user1)
  // console.log(userData.userId)
  try{

  
  const   config = {
      
    headers: {
     
      Authorization: `Bearer ${user.token}`
    },
    // body: JSON.stringify({
    //   imgsource: newPhoto.base64,
    // }),
    // body: formData
   };
   const now = moment()
   const UpdatedLastSeen = now.format()
   await axios.put('http://192.168.100.2:5000/api/users/stat', {
    userId : userData.userId,
    status: userData.status,
    lastSeen : UpdatedLastSeen
    
    
  },
  config)
  console.log('user updated successfully')
  
  await AsyncStorage.removeItem('user')
   const {data} = await axios.get(`http://192.168.100.2:5000/api/users/ret/${userData.userId}`,
  config)
  const testuser = await AsyncStorage.setItem('user', JSON.stringify(data))
    const  testuser1 = await AsyncStorage.getItem('user')
    const  testuser2 = JSON.parse(testuser1)
    return testuser2
 
}
catch(error){
  console.log(error)
}
   

}

// User Details
const getUserDetails = async (userId) => {
  console.log(userId + 'detailservice')
  try{
    let jsonValue = await AsyncStorage.getItem('@user_data');
    let convertedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log("-----==-=-=", convertedValue?.token)

    

    const {data} = await axios.get(`${API_URL}users/${userId}`)
    
    console.log("new user dataaaaaaaaaaa:", data)
    let userData = {...data, token: convertedValue?.token, isFirstTime: false}
  
    if (data && convertedValue) {
      return userData;
    }
    else {
      console.log('error in authservice')
    }
  }
  
  catch(error){
    console.log("error in logging in")
  }
}

// Logout user
const logout = async() => {
  // localStorage.removeItem('user')
  // var socket = io(ENDPOINT)
  // socket.on('disconnect', (test))
  try {
    await AsyncStorage.removeItem('@user_data')
    await AsyncStorage.removeItem("user")
    await AsyncStorage.removeItem("@finished_welcome_screen")
  } catch(e) {
    console.log("first", e)
  }

  // await AsyncStorage.clear()
  
}

// //get list of all travelers
const getTravelers = async () => {
  console.log('traveler slice activated')
  const response = await axios.get(`http://143.198.168.244/api/travels/`, config)
  console.log("my travelerssssssss are:", response.data.data)
  return response.data.data
}

// //get list of all consumers
const getConsumers = async () => {
  console.log('buyer slice activated')
  const response = await axios.get(`http://143.198.168.244/api/buyers/`, config)
  console.log("buyers areeeeeeeeee:", response.data.data)

  return response.data.data
}

const authService = {
  register,
  logout,
  login,
  getTravelers,
  getConsumers,
  getUserDetails,
  UpdateLastSeenAndStatus,
  
}

export default authService