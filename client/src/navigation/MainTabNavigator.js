import {View, Text, Pressable, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatsScreen from '../screens/ChatScreen';
import ConnectScreen from "../screens/ConnectScreen"
import TravelerScreen from '../screens/TravelerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { Entypo, AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'; 
import LoginScreen from '../../src/screens/AuthScreens/LoginScreen';
import { Badge, Icon, withBadge } from '@rneui/themed';
import RegisterScreen from '../../src/screens/AuthScreens/RegisterScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { getSenderFull } from '../ChatConfig/ChatLogics';
import { useSelector } from 'react-redux';
import Test from '../screens/Test';
import ChatScreen from '../screens/ChatScreen';
import { useNavigation } from '@react-navigation/native';
import Test2 from '../screens/Test2';
import TestImg from '../screens/TestImg';
import RecentlyTest from '../screens/RecentlyTest';
import UserTest from '../screens/UserTest';
import PushScreen from '../screens/PushScreen';
import UserRouteTest from '../screens/UserRouteTest';
import TestChat from '../screens/TestChat';
import TestMess from '../screens/TestMess';
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
   
    const [storedNotifications, setstoredNotifications] = useState([])
    const [notifChat, setnotifChat] = useState()
    const [visible, setVisible] = useState(false);
    const navigate = useNavigation()
    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    const { user } = useSelector((state) => state.auth)
    useEffect(() =>{
       getNotif()
    //    {storedNotifications  && console.log(storedNotifications[0].chatUsers)}
    console.log(storedNotifications)
    //     console.log(notificationstored)
      
      }, [])
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
    <Tab.Navigator initialRouteName='Chats' screenOptions={{tabBarActiveTintColor: '#593196', tabBarStyle: {
        backgroundColor: '#f9f8fc'
    }, headerStyle: {
        backgroundColor: '#f9f8fc',
    },
      
    }}>
        <Tab.Screen name="Connect" component={ConnectScreen} options={{
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="users" size={size} color={color} />
            )
        }} />

        {/* <Tab.Screen name="Login" component={LoginScreen} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="user" size={size} color={color} />
            ),S
            headerShown: false
        }} /> */}
        
        <Tab.Screen name="Chats" component={ChatScreen} options={{
           tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={size} color={color} />
            
        ),
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

        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({color, size}) => (
                <AntDesign name="user" size={size} color={color} />
            ),
            headerShown: false
        }} />
        
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