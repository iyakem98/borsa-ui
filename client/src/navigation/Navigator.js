import { View, Text, StyleSheet } from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MessagingScreen from "../screens/MessagingScreen"
import ChatScreen from "../screens/ChatScreen"
import MainTabNavigator from "./MainTabNavigator"
import ProfileScreen from "../screens/ProfileScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
    <Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
    <Stack.Screen name="Chats" component={ChatScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    
    {/* <Stack.Screen name="Chat" component={MessagingScreen} /> */}
    {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Navigator