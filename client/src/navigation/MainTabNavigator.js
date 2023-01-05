import {View, Text, Pressable, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatsScreen from '../screens/ChatScreen';
import ConnectScreen from "../screens/ConnectScreen"
import TravelerScreen from '../screens/TravelerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { Entypo, AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'; 
import LoginScreen from '../screens/LoginScreen';
import { Badge, Icon, withBadge } from '@rneui/themed';
import RegisterScreen from '../screens/RegisterScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { getSenderFull } from '../ChatConfig/ChatLogics';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
   
    const [storedNotifications, setstoredNotifications] = useState([])
    const [notifChat, setnotifChat] = useState()
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    const { user } = useSelector((state) => state.auth)
    useEffect(() =>{
        getNotif()
        // console.log(notificationstored)
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
        console.log(parsedChat)
        // console.log(storedNotifications)
        // return JSON.parse(notif);
      }
      const BadgedIcon = withBadge(storedNotifications.length)(Icon);
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

        <Tab.Screen name="Chats" component={ChatsScreen} options={{
           tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={size} color={color} />
            
        ),
        headerRight: () => (
            <>
            <Pressable style={styles.notificationBell} onPress={() => showMenu()}>
                 <BadgedIcon type="ionicon" name="notifications-sharp" />
                 <Menu
                        visible={visible}
                       
                        onRequestClose={hideMenu}
                    >
                        {/* {storedNotifications && storedNotifications.map(notif => (
                            <MenuItem key={notif._id} onPress={hideMenu}>
                                new message from {getSenderFull(user, notifChat.users).firstName}
                            </MenuItem>
                        ))} */}
                        <MenuItem onPress={hideMenu}>
                                new message from {getSenderFull(user, notifChat.users).firstName}
                            </MenuItem>
                        
                      
                    </Menu>
    
            </Pressable>
            </>
           
        )
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