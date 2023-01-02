import {View, Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatsScreen from '../screens/ChatScreen';
import ConnectScreen from "../screens/ConnectScreen"
import TravelerScreen from '../screens/TravelerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { Entypo, AntDesign, MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'; 
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Logout from '../screens/Logout';
import Test from '../screens/Test';
import ConnectScreen from '../screens/ConnectScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
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