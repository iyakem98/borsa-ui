import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
import moment from 'moment';

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
      // console.log(JSON.stringify(user1))
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
  const response = await axios.get('http://192.168.100.2:5000/api/users/travelers')
  console.log(response.data)
  return response.data
}

// //get list of all consumers
const getConsumers = async () => {
  console.log('buyer slice activated')
  const response = await axios.get('http://192.168.100.2:5000/api/users/consumers')

  return response.data
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