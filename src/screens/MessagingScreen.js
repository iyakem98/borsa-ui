import { ActivityIndicator, View, StyleSheet, TextInput, KeyboardAvoidingView, Button, Pressable, Text, Image} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { API_BASE_URL } from '../utils/config';
// import { MMKV } from 'react-native-mmkv'



// export const storage = new MMKV()

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


  const myRef = createRef()

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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [pushnotification, setpushNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const {messageHeader, setmessageHeader} = ChatState()
  const publicFolder = "http://192.168.100.2:5000/images/"
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
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
    // socket.current.on("message recieved", (newMessageReceived) => {
    //   // console.log('message received')
    //   // if(newMessageReceived.receiver.route != "Messaging")
    //   // testNotif(newMessageReceived)
    // //  console.log(newMessageReceived.chat._id)
    // //  console.log(newMessageReceived.chat)
    // //  if((!selectedChatCompare)  ||  selectedChatCompare._id !== newMessageReceived.chat._id || (chatRouteCompare)  ){
    // //  if((newMessageReceived.receiver.route == "Chats")){
    // //   console.log('notif received')
    // // if (!notification.includes({newMessageReceived})) {
    // //     // console.log(newMessageReceived.chat)
    // //             setNotification([...notification,  newMessageReceived]);
    // //             // console.log(notification)
    // //             setNotification((state) => {
    // //               // console.log(state)
    // //               return state
    // //             })
    // //             // console.log(notification)
    // //             storeNotifcation(notification, {chatUsers: newMessageReceived.chat.users, chatId: newMessageReceived.chat._id })
    // //             // storeNotifcation(notification)
               
                
    // //             setfetchAgain(!fetchAgain)
    // //             setfetchAgain((state) => {
    // //               // console.log(state)
    // //               return state
    // //             })
    // //             // console.log(fetchAgain)
    // //  }

    // // }
    // // else{
    // //   console.log('notif not received')
    // //   setMessages([...messages, newMessageReceived])
    // //   // setreceivedMessage(true)
    // // }   

         
    //  })

  })
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // search how to run an async func in react 
 useEffect(() => {
  testCamera();
 }, [])
 useEffect(() => {
 null
  // setImage(null)
 }, [refresh])
 useEffect(() => {
 UpdateUserRoute()
//  console.log(route.name)
  // setImage(null)
 }, [])
 useEffect(() => {
//  UpdateUserRoute()
 console.log(route.params.userSelected._id)
 console.log("messagessssssssssssssssss are:", messages)

console.log("messssssssage infooooooo:",
{
content : newmessage,
chatId: chatId,
image: "",
receiver: route.params.userSelected._id
}
)
  // setImage(null)
 }, [])
 async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
const testNotif = async (Newmessage) => {
  
  console.log(Newmessage.sender._id)
  // socket.current.on("message recieved", (newMessageReceived) => {
  //   console.log('notification received')
   
       
  //  })
  var chat = Newmessage.chat;
  // //   console.log( message.receiver._id)
  //   if (!chat.users) return console.log("chat.users not defined");
    

    chat.users.forEach( (tuser) => {
      if (tuser._id == Newmessage.sender._id && Newmessage.receiver ) console.log('notif received')
        // console.log('push notif recieved')
        // await sendPushNotification(expoPushToken);
      ;
      
      
    });
  // console.log(message.receiver.route)
  // await sendPushNotification(expoPushToken);
   
    
  }


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
 const UpdateUserRoute = async () => {
    
    try{
      console.log(route.name)
      const userId = user._id
      console.log(userId)
      const   config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        // body: JSON.stringify({
        //   imgsource: newPhoto.base64,
        // }),
        // body: formData
       };
  
      const {data} = await axios.put(`${API_BASE_URL}users/route`,{
        userId: user._id,
        route: route.name
        
      }, config)
      console.log('user route updated')
      // console.log(data.lastSeen)
      // setlastseendateandtime(moment(data.lastSeen).format("dddd, MMMM Do YYYY") + " " + moment(data.lastSeen).format("LT"))

    }
    catch(err){
      console.log(err)
    }
    
   }

 
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
          console.log('notif stored')
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
    //setNewMessage("")
    
      const config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        // body: JSON.stringify({
        //   imgsource: newPhoto.base64,
        // }),
        // body: formData
       };
     
   
 
    const {data} = await axios.post(`${API_BASE_URL}message`, {
      content : newmessage,
      chatId: chatId,
      image: "",
      receiver: route.params.userSelected._id
    },
    config)
    testNotif(data)
    setImage(null)
    // console.log("message sent successfully")
    setNewMessage("")
   
    
  socket.current.emit("new message", data)
  setMessages([...messages, data])
  setmessageSentOrReceived(false)
  setfetchAgain(true)
  setfetchAgain(false)

  myRef.scrollTo(0, myRef.scrollHeight)
  
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

   
    const {data} = await axios.get(`${API_BASE_URL}message/${chatId}`,
    config)
    
    // console.log(data)
    // console.log(mesages) 
    setMessages(data)

    console.log("messssssssssssssssssssssss:", data)
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
  return <Text style={{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
    Permission for camera not granted. Please change this in settings.</Text>
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
    <View ref={myRef} style={{marginBottom:20, paddingBottom:25}}>
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
      placeholder='Type your message...'
      onKeyPress={(keyPress) => {
        if(keyPress.key=="Enter"){
          sendMessage()
        }
      }}
      />
    <Pressable onPress={() => {
      CameraFeature()
      setmessageHeader(true)
      }}>
    <AntDesign name="camera" size={24} color="black" />
    </Pressable>
    {/* <Pressable onPress={() => sendMessage()}> */}
    <Pressable onPress={() => {
     sendMessage()
      }
    }>
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