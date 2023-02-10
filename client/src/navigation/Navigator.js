import { View, Text, StyleSheet } from "react-native"
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import MessagingScreen from "../screens/MessagingScreen"
import ChatScreen from "../screens/ChatScreen"
import LoginScreen from "../screens/AuthScreens/LoginScreen"
import RegisterScreen from "../screens/AuthScreens/RegisterScreen"
import AccountScreen from '../screens/ProfileScreens/AccountScreen'
import SettingsScreen from '../screens/ProfileScreens/SettingsScreen'
import SecurityScreen from '../screens/ProfileScreens/SecurityScreen'
import ContactScreen from '../screens/ProfileScreens/ContactScreen'
import MyCards from "../screens/ProfileScreens/MyCards"
import EditMyBuyerScreen from "../screens/MyCardsEditScreen/EditMyBuyerScreen"
import EditMyTravelerScreen from "../screens/MyCardsEditScreen/EditMyTravelerScreen"
import EditUserName from "../screens/AccountScreens/EditUserName"
import EditName from "../screens/AccountScreens/EditName"
import EditEmail from "../screens/AccountScreens/EditEmail"
import EditLocation from "../screens/AccountScreens/EditLocation"
import EditBuyerDetails from "../screens/MyCardsEditScreen/EditBuyerDetails"
import EditTravelerDetails from "../screens/MyCardsEditScreen/EditTravelerDetails"
import EditSpace from "../screens/MyCardsEditScreen/EditSpace"
import MainTabNavigator from "./MainTabNavigator"
import HomeScreen from "../screens/AuthScreens/HomeScreen"
import OtherProfile from "../components/Connect/OtherProfile"
import ConnectScreen from "../screens/ConnectScreen"
import { useSelector } from "react-redux"
import Test from "../screens/Test"
import Test2 from "../screens/Test2"
import TestImg from "../screens/TestImg"
import { ChatState } from "../context/ChatProvider"


const Stack = createStackNavigator();
const Navigator = () => {
  const { user } = useSelector((state) => state.auth)
  const {messageHeader, setmessageHeader} = ChatState()
  return (
   <NavigationContainer>
   {user ? (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
    <Stack.Screen name="Main" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
    <Stack.Screen name="Chats" component={ChatScreen} />
    {/* <Stack.Screen name="Chats" component={Test} /> */}
    {/* <Stack.Screen name="Chats" component={Test2} /> */}
    <Stack.Screen name="User Details" component={OtherProfile} />
    { messageHeader ? (<Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
    title: route.params.userSelected,
    headerShown: false
  })}/>) :  (<Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
    title: route.params.userSelected,
    headerShown: true
  })}/>) }
   
   
    <Stack.Screen name="Account" component={AccountScreen} options={{headerTintColor: '#000'}}/>
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    <Stack.Screen name="Security" component={SecurityScreen}/>
    <Stack.Screen name="Contact Us" component={ContactScreen} 
        options = {{
          headerStyle: {
            backgroundColor: '#593196',
           // backgroundColor: '#a991d4',
          },
          
          headerTintColor: "#fff"
        }}/>
         <Stack.Screen name = "My Cards" component={MyCards} />
    <Stack.Screen name = "Edit UserName" component={EditUserName} />
    <Stack.Screen name = "Edit Name" component={EditName} />
    <Stack.Screen name = "Edit Email" component={EditEmail} />
    <Stack.Screen name = "Edit Location" component={EditLocation} />
    <Stack.Screen name = "Edit MyTraveler" component={EditMyTravelerScreen} />
    <Stack.Screen name = "Edit MyBuyer" component={EditMyBuyerScreen} />
    <Stack.Screen name = "Edit Buyer Details" component={EditBuyerDetails} />
    <Stack.Screen name = "Edit Traveler Details" component={EditTravelerDetails} />
    <Stack.Screen name = "Edit Space Available" component={EditSpace} />
    </Stack.Navigator>

   ): (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
     <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerTintColor: '#593196'}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, headerTintColor: '#593196'}}/>
    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, headerTintColor: '#593196'}}/>
    </Stack.Navigator>

   )} 
    
    {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    
    {/* <Stack.Screen name="Chat" component={MessagingScreen} /> */}
    {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    
   </NavigationContainer>
  )
}

export default Navigator