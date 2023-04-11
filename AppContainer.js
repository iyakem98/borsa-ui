// import { StatusBar } from 'expo-status-bar';
import {AppState, StyleSheet, Text, View } from 'react-native';
import ChatListItem from './src/components/Chats/ChatListItem';
import ChatScreen from './src/screens/ChatScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import Navigator from './src/navigation/Navigator';
import { Provider,  useDispatch,  useSelector } from 'react-redux';
import { store, persistor } from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';  
import ChatProvider, { ChatState } from './src/context/ChatProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { UpdateLastSeenAndStatus } from './src/features/auth/authSlice';
import { fetchChat } from './src/features/chat/chatSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AppContainer({showOnBoarding}) {
  
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const appState = useRef(AppState.currentState);
    const [online, setOnline] = useState("online")
    const [away, setAway] = useState("away")
    // console.log(user)
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // console.log(user)
  const {date, setDate} = ChatState()
  const datte  = moment()

  const getUser = async() => {
    try {
      const user = await  AsyncStorage.getItem('user')
      // console.log(user)
      // const user = JSON.parse(user1)
    } catch (e) {
      console.log("GET ASYNC USER DATA ERROR: ", e)
    }
  }


  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(nextAppState)
      // if (
      //   appState.current.match(/inactive|background/) &&
      //   nextAppState === 'active'
      // ) {
      //   console.log('App has come to the foreground!');
      // }
    //   if(appState.current.match(/background/) &&
    //   nextAppState === 'background'){
    //     console.log('display that the user is away')
    //   }
    
    if(nextAppState === 'background'){
      if(user != null){
        // sendData(away, user._id)
        console.log('12')
      }
      
      
      // UpdateLastSeenAndStatus(away)
      // const userData = {
      //   status: away,
      //   userId: user._id
      // }
      // console.log(userData)
      // dispatch(UpdateLastSeenAndStatus(userData))
    }
    if(nextAppState === 'active'){
      // UpdateLastSeenAndStatus(online)
      if(user != null){
        // sendData(online, user._id)
        console.log(user)
        console.log('12')
      }
      
      // const userData = {
      //   status: online,
      //   userId: user._id
      // }
      // console.log(userData)
      // dispatch(UpdateLastSeenAndStatus(userData))
    }
    // else if(nextAppState === 'active'){
    //   console.log('return user to online status')
    // }
    // console.log(user)
    //   appState.current = nextAppState;
    //   setAppStateVisible(appState.current);
    //   console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const sendData = (online, userId) => {
    // console.log(online)
    // console.log(userId)
    const userData = {
        status: online,
        userId: user._id
      }
      console.log(userData)
          dispatch(UpdateLastSeenAndStatus(userData))
          // dispatch(fetchChat())

  }
  // // const UpdateLastSeenAndStatus = async(status) =>{
  // //   try{

    
  // //   const   config = {
        
  // //     headers: {
       
  // //       Authorization: `Bearer ${user.token}`
  // //     },
  // //     // body: JSON.stringify({
  // //     //   imgsource: newPhoto.base64,
  // //     // }),
  // //     // body: formData
  // //    };
  // //    const now = moment()
  // //    const UpdatedLastSeen = now.format()
  // //    const {data} = await axios.put('http://192.168.100.2:5000/api/users/stat', {
  // //     userId : user._id,
  // //     status: status,
  // //     lastSeen : UpdatedLastSeen
      
      
  // //   },
  // //   config)
  // //   console.log('user status and last seen are updated')
  // // }
  // // catch(error){
  // //   console.log(error)
  // // }
     

  // }
  return (
   
 
  //  <PersistGate loading={null} persistor={persistor}>
   <View style={styles.container}>
     <Navigator showOnBoarding={showOnBoarding} />
     {/* <StatusBar style="auto" /> */}
   </View>
    // </PersistGate>
    


 
 
  )
}

{/* <View>
    <Text>ete</Text>
</View>  */}

export default AppContainer

const styles = StyleSheet.create({
    // "proxy": "http://192.168.100.2:5002/",
    container: {
      flex: 1,
      backgroundColor: '#f9f8fc',
      justifyContent: 'center',
      
    },
  });