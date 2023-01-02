import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const API_URL = 'http://192.168.100.2:5000/api/message/'
const fetchMessages = async(selectedChat, user, setLd, setMessages, socket) =>{
  if (!selectedChat){
    return
}
// try{
  const config = {
    headers: {
       /* "Content-type": "application/json", */
        // Authorization: `Bearer ${user.token}`,
        Authorization: `Bearer ${user.token}`,
    },
    };

    setLd(true)
    console.log('fetching in messageService')
    const { data } = await axios.get(
    `/api/message/${selectedChat._id}`,
    config)
    setMessages(data);
    setLd(false)

   socket.emit('join chat', selectedChat._id)
    // }
  
    // catch (error) {
    //           throw new Error(error)
    //       }
    

}


const sendMess = async(event, newMessage, socket, selectedChat, user, setNewMessage, setMessages,  messages) => {
  event.preventDefault()
  if (newMessage) {
    // try {
      socket.emit('stop typing', selectedChat._id)
      const config = {
      headers: {
         /* "Content-type": "application/json", */
          Authorization: `Bearer ${user.token}`,
      },
      };
      setNewMessage("");
      const { data } = await axios.post(
      "/api/message",
      {
          content: newMessage,
          chatId: selectedChat._id,
      
      },
      config
   );

  socket.emit('new message', data)
  setMessages([...messages, data]);
      
  // } catch (error) {
  //     throw new Error(error)
  // }
  }
}


const sendMessage = async(content, chatId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`

        }
    }

    /*content = content
    chatId = chatId

    console.log(chatId)
    console.log(content) */


    const response = axios.post(API_URL, content, chatId, config)

    console.log(response)
    

    return response.data 
}


const allMessages = async (chatId) => {
  const user1 = await  AsyncStorage.getItem('user')
  const user = JSON.parse(user1)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    
    console.log('fetchin in messageService')
    const response = await axios.get(API_URL + chatId , config)
  
    return response.data
  }

const messageService = {
    sendMessage,
    allMessages,
    fetchMessages,
    sendMess
}


export default messageService