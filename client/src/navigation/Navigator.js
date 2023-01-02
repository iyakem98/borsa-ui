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

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const { user }   = useSelector((state) => state.auth)
const Navigator = () => {
  return (
   <NavigationContainer>
   {/* {user ? (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
   <Stack.Screen name="static" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
    <Stack.Screen name="Chats" component={ChatScreen} />
    <Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
    title: route.params.userSelected
  })} />
    
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

   ) :(
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
       <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerTintColor: '#593196'}} />
        <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />

    </Stack.Navigator>

   )}  */}
   
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
   <Stack.Screen name="static" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
    <Stack.Screen name="Chats" component={ChatScreen} />
    <Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
    title: route.params.userSelected
  })} />
    
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

  
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
       <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerTintColor: '#593196'}} />
        <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />

    </Stack.Navigator>

   
   
    
   
    {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
   
   </NavigationContainer>
  )
}

export default Navigator