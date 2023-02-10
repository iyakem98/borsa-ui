import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
// const API_URL = '/api/users/'
const API_URL = 'http://192.168.100.2:5000/api/users/'
const ENDPOINT = "http://192.168.100.2:5000"
// Register user
const register = async (userData) => {
  const {data} = await axios.post(API_URL, userData)
  try{
    if (data) {
      const user = await AsyncStorage.setItem('user', JSON.stringify(data))
      const user1 = await AsyncStorage.getItem('user')
      console.log(JSON.stringify(user1))
      return data;
    }
  }
  catch(error){
    console.log('cannot register user')
  }
  

  return response.data
}

// Login user
const login = async (userData) => {
  // console.log(userData)
  var socket = io(ENDPOINT)
  try{
    const {data} = await axios.post(API_URL + 'login', userData)
    // console.log(data)
  
    if (data) {
      // localStorage.setItem('user', JSON.stringify(response.data))
      const user = await AsyncStorage.setItem('user', JSON.stringify(data))
      const user1 = await AsyncStorage.getItem('user')
      // console.log(JSON.stringify(user1))
      socket.emit('user_online', { data, socketID : socket.id})
      return data;
      
    }
  }
  
  catch(error){
    console.log("error in logging in")
  }

 
}

// User Details
const getUserDetails = async (userId) => {
  console.log(userId + 'detailservice')
  try{
    const {data} = await axios.get(API_URL + 'profile', {userId})
    
    // console.log(data)
  
    if (data) {

      return data;
       
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
  await AsyncStorage.removeItem('user')

  // await AsyncStorage.clear()
  
}

// //get list of all travelers
const getTravelers = async () => {
  console.log('traveler slice activated')
  const response = await axios.get(API_URL + 'travelers')

  return response.data
}

// //get list of all consumers
const getConsumers = async () => {
  console.log('buyer slice activated')
  const response = await axios.get(API_URL + 'consumers')

  return response.data
}

const authService = {
  register,
  logout,
  login,
  getTravelers,
  getConsumers,
  getUserDetails,
}

export default authService