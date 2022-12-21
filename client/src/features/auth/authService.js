import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL + 'login', userData)
//   console.log(response)

//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data))
//   }

  return response.data
}

// Logout user
// const logout = () => {
//   localStorage.removeItem('user')
  
// }

// //get list of all travelers
// const getTravelers = async (userData) => {
//   const response = await axios.get(API_URL + 'travelers')

//   return response.data
// }

// //get list of all consumers
// const getConsumers = async (userData) => {
//   const response = await axios.get(API_URL + 'consumers')

//   return response.data
// }

const authService = {
//   register,
//   logout,
  login,
//   getTravelers,
//   getConsumers,
}

export default authService