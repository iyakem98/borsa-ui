import { ActivityIndicator, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import ScrollableFeed from '../components/Chats/ScrollableFeed.js/ScrollableFeed';
import io from 'socket.io-client'
import { ChatState } from '../context/ChatProvider';
import { fetchChat } from '../features/chat/chatSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
import {Camera} from "expo-camera"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from "expo-media-library"

const MessagingScreen = () => {
 
  const { user } = useSelector((state) => state.auth)
  const [newmessage, setNewMessage] = useState();
  const route = useRoute()
  const dispatch = useDispatch()
  const {chatId} = route.params;
  const {userSelected} = route.params;
  const [messages, setMessages] = useState([])
  const ENDPOINT = "http://192.168.100.2:5000"
  var socket = useRef(null)
  var selectedChatCompare = null;
  var chatRouteCompare = null
  const [socketConnected, setsocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { 
    selectedChat, 
    setSelectedChat,
    fetchAgain,
     setfetchAgain,  
     chats, 
     setChats, 
     notification, 
     setNotification, 
     sentMessage, 
     setsentMessage, 
     receivedMessage, 
    setreceivedMessage,
    messageSentOrReceived, setmessageSentOrReceived,
    chatRoute, setchatRoute
    } = ChatState(); 
  // const [mesages, setMesages] = useState()
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  
  const [hasPermissions, sethasPermissions] = useState(null)
  const [hasMediaLibPermissions, setMediaLibPermissions] = useState()
  const [image, setImage] = useState(null)
  const [getPics, setgetPics] = useState([])
  const [cameraOnOff, setcameraOnOff] = useState(true)
  const [cameratest, setcameratest] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const {messageHeader, setmessageHeader} = ChatState()
  const publicFolder = "http://192.168.100.2:5000/images/"
  // console.log(messageHeader)
  console.log(image)
  const cameraRef = useRef()
  useLayoutEffect(() => {
  
    // fetchMessage()
    socket.current = io(ENDPOINT)
    socket.current.emit("setup", user);
    // socket.emit("findChat", chatId)
    socket.current.on("connected", () => setsocketConnected(true) )
   
    socket.current.on("typing", () => setIsTyping(true))
    socket.current.on("stop typing", () => setIsTyping(false))
   
    
  }, [])
  useEffect(() =>{
    fetchMessage()
    selectedChatCompare = selectedChat
    // console.log(notification)
   
  
    // console.log(fetchAgain)
  
  }, [selectedChat])
  useEffect(() =>{
    chatRouteCompare = chatRoute
    console.log(chatRouteCompare)
  
  }, [])

  // console.log(notification)
  // useEffect(() => {
  //   // console.log(chatId)
  //   // console.log(socket.current)
  //   // console.log(selectedChat._id)
  //   // setNotification([100]);
  //   //     setNotification((state) => {
  //   //           console.log(state)
  //   //           return state
  //   //         })
  //   socket.current.on("message recieved", (newMessageReceived) => {
  //    console.log(newMessageReceived.chat)
  //     if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
  //       console.log(newMessageReceived.chat)
        
  //       if (!notification.includes(newMessageReceived)) {
  //         setNotification([ newMessageReceived]);
  //         console.log(notification)
  //         setNotification((state) => {
  //           console.log(state)
  //           return state
  //         })
  //         setfetchAgain(!fetchAgain)
  //         setfetchAgain((state) => {
  //           console.log(state)
  //           return state
  //         })
          
          
  //       }
          
  //       }
      
  //     // else{
  //     //   setMessages([...messages, newMessageReceived])
  //     // }
      
  //   })
   
  // })
  useEffect(() => {
    socket.current.on("message recieved", (newMessageReceived) => {
    //  console.log(newMessageReceived.chat._id)
     if((!selectedChatCompare)  ||  selectedChatCompare._id !== newMessageReceived.chat._id || (chatRouteCompare)  ){
    
    if (!notification.includes({newMessageReceived})) {
        // console.log(newMessageReceived.chat)
                setNotification([...notification,  newMessageReceived]);
                // console.log(notification)
                setNotification((state) => {
                  // console.log(state)
                  return state
                })
                // console.log(notification)
                storeNotifcation(notification, {chatUsers: newMessageReceived.chat.users, chatId: newMessageReceived.chat._id })
                // storeNotifcation(notification)
               
                
                setfetchAgain(!fetchAgain)
                setfetchAgain((state) => {
                  // console.log(state)
                  return state
                })
                // console.log(fetchAgain)
     }

    }
    else{
      setMessages([...messages, newMessageReceived])
      // setreceivedMessage(true)
    }   
         
     })

  })
  // search how to run an async func in react 
 useEffect(() => {
  testCamera();
 }, [])
 useEffect(() => {
 null
  // setImage(null)
 }, [refresh])
 
 const testCamera = async () =>{
  const mediaPermissions = await MediaLibrary.requestPermissionsAsync()
  const cameraStatus = await Camera.requestCameraPermissionsAsync()
  sethasPermissions(cameraStatus.status === 'granted')
  setMediaLibPermissions(mediaPermissions.status === 'granted')
 }
 let takePic = async () => {
let options = {
quality: 1,
base64: true,
exif: false
};

let newPhoto = await cameraRef.current.takePictureAsync(options);
console.log(newPhoto.uri)
setImage(newPhoto);
};
  const storeNotifcation = async(notification, chat) => {
    try{
          await AsyncStorage.removeItem("notification")
          await AsyncStorage.removeItem("chat")
      // console.log(notification)
          await  AsyncStorage.setItem("notification", JSON.stringify(notification))
        //  await AsyncStorage.getItem('notification')
          await  AsyncStorage.setItem("notifChat", JSON.stringify(chat))
          // const getChatnotif = await AsyncStorage.getItem('notifChat')
        // // const chatnotif = await  AsyncStorage.setItem("notifChat", JSON.stringify(chat))

        // console.log(JSON.parse(getChatnotif))
        // // console.log(AsyncStorage.getItem(JSON.parse(chatnotif)))
    }
    catch(err){
      console.log("cannot store notificaiton/chat")
    }
      
   
  }
  
//     useLayoutEffect(() =>{
//       socket.on("message recieved", (newMessageReceived) => {
//         setMessages([...messages, newMessageReceived])
//       })
//     // fetchMessage()
    
//  }, [socket])
const CameraFeature = () => {
  console.log("hi ")
  setcameratest(true)
  // return <Camera
  // >

  // </Camera>
  // return <View style={styles.camera}>
  //         <Text>Goat</Text>
  //     </View>
}
  const sendMessage = async() => {
    try{
    //   const config = {
    //     headers: {
    //         Authorization: `Bearer ${user.token}`

    //     }
    // }
    // let options = {
    //   quality: 1,
    //   base64: false,
    //   // exif: true,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images'
    //    }
    // };
    // const formData = new FormData()
    // let newPhoto = await cameraRef.current.takePictureAsync(options);
    // setImage(newPhoto)
    setNewMessage("")
    
      const config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        // body: JSON.stringify({
        //   imgsource: newPhoto.base64,
        // }),
        // body: formData
       };
     
   
 
    const {data} = await axios.post('http://192.168.100.2:5000/api/message/send2', {
      content : newmessage,
      chatId: chatId,
      image: ""
      
      
    },
    config)
    setImage(null)
    console.log("message sent successfully")
    
  socket.current.emit("new message", data)
  setMessages([...messages, data])
  setmessageSentOrReceived(false)
  setfetchAgain(true)
  setfetchAgain(false)
  
  return data
    
    
   
  
   
    }
    catch(error){
      // console.log('sending message is not possible')
    }
  }
  
  const fetchMessage = async() => {
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        }
    }

   
    const {data} = await axios.get(`http://192.168.100.2:5000/api/message/${chatId}`,
    config)
    
    // console.log(data)
    // console.log(mesages) 
    setMessages(data)
    setMessages((state) => {
      // console.log(state)
      return state
    })
    socket.current.emit("join chat", chatId)
    return data;
   
    }
    catch(error){
      // console.log('fetching message is not possible')
    }

  }
  const saveImg = async () => {
    let options = {
      quality: 1,
      base64: false,
      // exif: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
       }
    };
    const formData = new FormData()
   const testData ={
    content: "",
    chatId: chatId
   }
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImage(newPhoto)
    let filename = newPhoto.uri.split('/').pop();
    // console.log(filename)
    // console.log(newPhoto)
    // // console.log(data:image/jpg + base64newPhoto.base64)
    formData.append('image', {
      name: filename,
      uri: newPhoto.uri ,
      type: 'image/jpg',
    });
    formData.append('content', testData.content);
    formData.append('chatId', testData.chatId);
    // console.log(formData)
    // console.log('end of line here ')
    // formData.append('content', null);
    // formData.append('chatId', chatId);
  
    // console.log(newPhoto.data)
    // const data = await axios.post("http://192.168.100.2:5000/api/images/addImg", newPhoto.uri)
    // setImage(newPhoto);
  //  console.log(formData)
    try{
      
      // const config = {
        
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${user.token}`


      //   },
      //   body: JSON.stringify({
      //     imgsource: newPhoto.base64,
      //   }),
      //   body: formData
      //  };
      const config = {
          
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        },
        // body: JSON.stringify({
        //   imgsource: newPhoto.base64,
        // }),
        // body: formData
       };

    const {data} = await axios.post("http://192.168.100.2:5000/api/message/",formData, config)
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    // setcameratest(false)
    // setmessageHeader(false)
    // setImage(null)
    socket.current.emit("new message", data)
  setMessages([...messages, data])
  setmessageSentOrReceived(false)
  setfetchAgain(true)
  setfetchAgain(false)
    console.log('message + image saved successfully')
    // const data = await axios.get("http://192.168.100.2:5000/api/images/getImg")
    //   console.log(data)
    // console.log('image retrieved successfully')


  }
  
    
  catch (error) {
    console.log(error);
  }

  }
  const getImgs = async() => {
    // console.log("try")
    try{
      const {data} = await  axios.get("http://192.168.100.2:5000/api/images/retrieveImg")
      setgetPics(data)
      // console.log(data)
    }
    catch(err){
      console.log(err.message)
    }
    
  }
  const typingHandler = (e) => {
    setNewMessage(e.target.value)
     
    if(!socketConnected) return

    if(!typing) {
     setTyping(true)
     socket.current.emit('typing', chatId);
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000
    setTimeout(() => {
     var timeNow = new Date().getTime();
     var timeDiff = timeNow - lastTypingTime;

     if(timeDiff >= timerLength && typing) {
         socket.current.emit("stop typing", chatId)
         setTyping(false)
     }
    }, timerLength);
 }

 if (hasPermissions === undefined) {
  return <Text>Requesting permissions...</Text>
} else if (!hasPermissions) {
  return <Text>Permission for camera not granted. Please change this in settings.</Text>
}

if(cameratest){
  // return <Text style={styles.text}>cemera test</Text>
  return <View style={styles.container2}>
  
   
    <Camera
      style={styles.camera}
      ref={cameraRef}
      // autoFocus={null}
      >
           {/* <Pressable  style={styles.text2} onPress={takePic}>
           <Ionicons name="md-camera-reverse-outline" size={24} color="black" />
           </Pressable> */}
           <Pressable onPress={() => {
            setcameratest(false)
            setmessageHeader(false)
            setRefresh(false)
           }}>
           <MaterialCommunityIcons name="close-outline" size={50} color="white"  style={styles.close}/>
           </Pressable>
           <Pressable  style={styles.text2} 
           onPress={()=> {
        setRefresh(true)
         saveImg()
         
         // sendMessage()
          
          // getImgs()
          // setcameraOnOff(false)
          
            } }
           >
          <MaterialCommunityIcons name="camera-iris" size={60} color="white" style={styles.minicamera} />
       </Pressable>
      
      </Camera>
      {/* <View>
      {getPics && getPics.map(img => {
        
        console.log(publicFolder + img.image)
        // return <Text key={img._id}>{img.image}</Text>
        return <Image key={img._id} style={styles.img} source={{uri: `http://192.168.100.2:5000/images/${img.image}` }} />
        
      })}
      </View> */}
     
 
 
</View>
}

// if(image){
//   const savePhoto = () => {
//       MediaLibrary.saveToLibraryAsync(image.uri).then(() => {
//           setImage(undefined);
//         });

//   }
//   return (
//       <SafeAreaView style={styles.container2}>
//         <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + image.base64 }} />
//         {/* <Button title="Share" onPress={sharePic} /> */}
//         {hasMediaLibPermissions ? <Button title="Save" onPress={savePhoto} /> : undefined}
//         <Button title="Discard" onPress={() => setImage(undefined)} />
//       </SafeAreaView>
//     );
//   }
  


 

  return (
   
  //     <GiftedChat
  //   // messages={messages}
  //   // onSend={newMessage => handleSend(newMessage)}
  //   onSend={sendMessage()}
    
  //   user={{ _id: 1 }}
  //   placeholder="Type your message here"
  //   alwaysShowSend
  //   renderSend={renderSend}
  //   scrollToBottom
  //   renderLoading={renderLoading}

  // />
//   <SafeAreaView edges={['top']} style = {styles.container}>
//   <AntDesign name='plus' size = {24} color = "#593196"/>
//   <TextInput 
//       value={newmessage}
//       onChangeText={setNewMessage}
//       style = {styles.input} 
//       placeholder='type your message...'/>
//   <MaterialIcons style = {styles.send} name='send' size={24} color = "#17141f"/>
// </SafeAreaView>
/* <KeyboardAvoidingView 
   style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
   behavior="position"
 > 
//  </KeyboardAvoidingView>*/
<>
    <View>
    <ScrollableFeed messages={messages} />
    </View>
  

   <SafeAreaView   style={{position: 'absolute', left: 0, right: 0, bottom: 0,flexDirection: "row",
   backgroundColor: "#f9f8fc",
   padding: 5,
   paddingHorizontal: 10,}}
   behavior="position"> 
   {/* <AntDesign name='plus' size = {24} color = "#593196"/> */}
    {isTyping ? <View>
    <Text> isloading... </Text>
    </View> : null}
   <TextInput 
      value={newmessage}
      onChangeText={setNewMessage}
      onChange={typingHandler}
      style = {styles.input} 
      placeholder='type your message...'/>
    <Pressable onPress={() => {
      CameraFeature()
      setmessageHeader(true)
      }}>
    <AntDesign name="camera" size={24} color="black" />
    </Pressable>
    <Pressable onPress={() => sendMessage()}>
    <MaterialIcons  name='send' size={24} color = "#17141f"/>
    </Pressable>
  
</SafeAreaView> 

</>  
    
  
  
   
  )
}



export default MessagingScreen

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text2: {
    color: "green",
    
    marginTop: "150%",
    
    marginLeft: 165,
    // borderColor: "red",
    // borderWidth: 10,
    justifyContent: "center",
    width: "40%"


 },
 minicamera: {
  height: 100
 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    marginLeft: 350,
    marginTop: 40
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f8fc",
    padding: 5,
    paddingHorizontal: 10,
},
input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
},
camera: {
   marginTop: 0,
   fontSize: 20
},
text :{
  marginTop: 20
},
container2: {
  // flex:1,
  // marginTop: 200,
  // marginLeft: 180,
  // backgroundColor: "black"
},
container3: {
  // flex:1,
  // marginTop: 200,
  // marginLeft: 180,
  // backgroundColor: "black"
},
camera: {   
  // flex: 1,
 height: "100%"
},
preview: {
  alignSelf: 'stretch',
  flex: 1
}

  
});