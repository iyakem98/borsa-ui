import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = '/api/users/'
const API_URL = 'http://192.168.100.2:5000/api/users/'

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
  try{
    const {data} = await axios.post(API_URL + 'login', userData)
    // console.log(data)
  
    if (data) {
      // localStorage.setItem('user', JSON.stringify(response.data))
      const user = await AsyncStorage.setItem('user', JSON.stringify(data))
      const user1 = await AsyncStorage.getItem('user')
      console.log(JSON.stringify(user1))
      return data;
      
    }
  }
  
  catch(error){
    console.log("error in logging in")
  }

 
}

// Logout user
const logout = async() => {
  // localStorage.removeItem('user')
  await AsyncStorage.removeItem('user')
  // await AsyncStorage.clear()
  
}

// //get list of all travelers
const getTravelers = async () => {
  const response = await axios.get(API_URL + 'travelers')

  return response.data
}

// //get list of all consumers
const getConsumers = async () => {
  const response = await axios.get(API_URL + 'consumers')

  return response.data
}

const authService = {
  register,
  logout,
  login,
  getTravelers,
  getConsumers,
}

export default authService