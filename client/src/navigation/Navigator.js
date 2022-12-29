import { View, Text, StyleSheet } from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import MessagingScreen from "../screens/MessagingScreen"
import ChatScreen from "../screens/ChatScreen"
import MainTabNavigator from "./MainTabNavigator"
import ProfileScreen from "../screens/ProfileScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import Logout from "../screens/Logout"
import Test from "../screens/Test"
import ConnectScreen from "../screens/ConnectScreen";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
   
    <Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
    <Stack.Screen name="Chats" component={ChatScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
    title: route.params.userSelected
  })} />
    <Stack.Screen name="Connections" component={ConnectScreen} />
    <Stack.Screen name="Test" component={Test} />
    
    <Stack.Screen name="Logout" component={Logout} />
    {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Navigator