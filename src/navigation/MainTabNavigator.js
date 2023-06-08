import {View, Text, Pressable, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatsScreen from '../screens/ChatScreen';
import ConnectScreen from "../screens/ConnectScreen/ConnectScreen"
import TravelerScreen from '../screens/TravelerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { Entypo, AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import LoginScreen from '../../src/screens/AuthScreens/LoginScreen';
import { Badge, Icon, withBadge } from '@rneui/themed';
import RegisterScreen from '../../src/screens/AuthScreens/RegisterScreen';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { getSenderFull } from '../ChatConfig/ChatLogics';
import { useDispatch, useSelector } from 'react-redux';
import Test from '../screens/Test';
import ChatScreen from '../screens/ChatScreen';
import AddPost from '../screens/AddPost';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Test2 from '../screens/Test2';
import TestImg from '../screens/TestImg';
import RecentlyTest from '../screens/RecentlyTest';
import UserTest from '../screens/UserTest';
import PushScreen from '../screens/PushScreen';
import Saved from '../screens/Saved';
import Search from '../components/Chats/ChatListItem/Search';
import { io } from 'socket.io-client';
import { API_BASE_URL_Socket } from '../utils/config';
import { fetchChat } from '../features/chat/chatSlice';
import WelcomeProPic from '../screens/ProfileScreens/WelcomeProPic';
import ProfilePicker from '../screens/ProfilePicker';
import axios from 'axios';
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [storedNotifications, setstoredNotifications] = useState([]);
    const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat);
    const [notifChat, setnotifChat] = useState();
    const [visible, setVisible] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const navigate = useNavigation();
    const hideMenu = () => setVisible(false);
    const [notifFlag, setNotifFlag] = useState(false);

    const showMenu = () => setVisible(true);
    var socket = useRef(null)
    const { user } = useSelector((state) => state.auth)

    const checkIsMarked = async() => {
        const userId = user?._id
        for (let index = 0; index < chattts.length; index++) {
            const isMarked = chattts[index]?.latestMessage?.marked;
            // console.log("=====", chattts[index]?.latestMessage, userId)

            
            
            if(isMarked === false && userId !== chattts[index]?.latestMessage?.receiver) {
                // console.log(isMarked)
                setNotifFlag(true)
            } else {
                // setNotifFlag(false)
                // setNewMessage(false)
            }

            const res = await axios.get('http://143.198.168.244/api/message/count/new', {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            
            if(res?.data?.count && res?.data?.count > 0) {
                setNotifFlag(true)
            }
        }
    }

    useEffect(() =>{
        dispatch(fetchChat())
    }, [user])

    useEffect(() =>{
        checkIsMarked()
    }, [user, chattts, isFocused])
    
    useEffect(() =>{
       getNotif()
    //    {storedNotifications  && console.log(storedNotifications[0].chatUsers)}
    console.log(storedNotifications)
    //     console.log(notificationstored)
      
      }, [])

      useEffect(() => {
        socket.current = io(API_BASE_URL_Socket)
        socket.current.emit("setup", user);
        socket.current.on("connected", () => {
            // setsocketConnected(true)
        })
        socket.current.on("message recieved", (newMessageReceived) => {
          console.log(newMessageReceived)
        //   storeNotif(newMessageReceived)
            if(newMessageReceived) {
                setNewMessage(true)
            } else {
                setNewMessage(false)
            }
        });
      },[])

      const getNotif = async() =>{
        const notif  = await AsyncStorage.getItem('notification')
        const notifChat =  await AsyncStorage.getItem('notifChat')
        const parsedNotif = JSON.parse(notif)
        const parsedChat = JSON.parse(notifChat)
       
        // console.log(getSenderFull(user, parsedChat.users).firstName)
        // console.log(parsedNotif)
        // console.log(parsedChat._id)
        setstoredNotifications(parsedNotif)
        setnotifChat(parsedChat)
        // console.log(parsedChat)
        // console.log(storedNotifications)
        // return JSON.parse(notif);
      } 
    //   const BadgedIcon = withBadge(storedNotifications.length)(Icon);
  return (
    <Tab.Navigator initialRouteName= {"Chats"} screenOptions={{tabBarActiveTintColor: '#514590', tabBarStyle: {
        backgroundColor: '#fff'
    }, headerStyle: {
        backgroundColor: '#f9f8fc',
    },
      
    }}>
        <Tab.Screen name="Connect" component={ConnectScreen} options={{
            tabBarIcon: ({color, size}) => (
                <SimpleLineIcons name="people" size={size} color={color} />
            ),
            headerShown: false
        }} />

        {/* <Tab.Screen name="Login" component={LoginScreen} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false
        }} /> */}
        
        {/* <Tab.Screen name="Chats" component={ChatScreen} options={{
           tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
            
        ), */}
        <Tab.Screen name="Chats" component={ChatScreen} options={{
           tabBarIcon: ({color, size}) => (
            <View style={{
                position: "relative"
            }}>
                <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
                {/* {newMessage || notifFlag ? (
                    <View style={{
                        backgroundColor: "#514590",
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        position: "absolute",
                        right: -5,
                        top: -5
                    }} />
                ) : null} */}
            </View>
        ),
        headerShown: true,
        headerRight: () => (
          
           <Search/>
          
           
        )
        // headerRight: () => (
        //     <>
        //     <Pressable style={styles.notificationBell} onPress={() => showMenu()}>
        //          <BadgedIcon type="ionicon" name="notifications-sharp" />
        //          <Menu
        //                 visible={visible}
                       
        //                 onRequestClose={hideMenu}
        //             >
        //              {storedNotifications && storedNotifications.map(notif => (
        //                     <MenuItem key={notif._id} onPress={() => {hideMenu()
        //                         setstoredNotifications(storedNotifications.filter((n) => n !== notif))
        //                         // navigate.navigate('Messaging', {chatId: storedNotifications[0]._id, userSelected:
            
        //                         //     user != null ? getSenderFull(user, chat.users).userName : null })
        //                     }
        //                     }>
        //                        {notifChat && user && <Text> new message from {getSenderFull(user, notifChat.users).firstName} </Text>}
        //                     </MenuItem>
        //                 ))} 
        //               {/* <MenuItem onPress={hideMenu}>
        //                         new message from {getSenderFull(user, notifChat.users).firstName}
        //                     </MenuItem> */}
                  
                      
        //             </Menu>
    
        //     </Pressable>
        //     </>
           
        // )
        }} />

        <Tab.Screen name="AddPost" component={AddPost} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="plussquareo" size={size} color={color} />
            ),
            headerShown: false
        }} />
        <Tab.Screen name="Saved" component={Saved} options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="heart-outline" size={size} color={color} />
            ),
            headerShown: false
        }} />

        <Tab.Screen name="More" component={ProfileScreen} options={{
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="dots-horizontal" size={size} color={color} />
            ),
            headerShown: false
        }} />

   {/* <Tab.Screen name="Apple" component={WelcomeProPic} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="apple1" size={24} color="black" />
            ),
            headerShown: false
        }} /> */}

        {/* {user?.isFirstTime && 
            <Tab.Screen name="Welcome" component={WelcomeProPic} options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name="random" size={size} color={color} /> 
                ),
                headerShown: false,
                tabBarStyle: { display: "none" },

            }} />
        } */}

        
        {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false
        }} /> */}
        {/* <Tab.Screen name="Register" component={RegisterScreen} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false
        }} /> */}
    </Tab.Navigator>
  )
}

export default MainTabNavigator

const styles = StyleSheet.create({
    notificationBell: {
     
    
       
        marginRight: 20,
       
       
      
  },
 
  
  })