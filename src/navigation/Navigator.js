import { View, Text, StyleSheet, AppState , Button} from "react-native"
import {NavigationContainer, useRoute} from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack"
import MessagingScreen from "../screens/MessagingScreen"
import ChatScreen from "../screens/ChatScreen"
import LoginScreen from "../screens/AuthScreens/LoginScreen"
import ForgotPassword from "../screens/AuthScreens/ForgotPassword"
import OnBoarding from "../screens/AuthScreens/OnBoarding"
// import LoginWithGoogle from "../screens/AuthScreens/LoginWithGoogle"
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
import ConnectScreen from "../screens/ConnectScreen/ConnectScreen"
import { useDispatch, useSelector } from "react-redux"
import Test from "../screens/Test"
import Test2 from "../screens/Test2"
import TestImg from "../screens/TestImg"
import { ChatState } from "../context/ChatProvider"
import RecentlyTest from "../screens/RecentlyTest"
import UserRecently from "../screens/UserRecently"
import { useRef, useState } from "react"
import { useEffect } from "react"
import UserTest from "../screens/UserTest"
import PushScreen from "../screens/PushScreen"
import { login } from "../features/auth/authSlice"
import PostIndex from "../screens/AddPost/index"
import FromTo from "../screens/AddPost/FromTo"
import Description from "../screens/AddPost/Description"
import PostAdditional from "../screens/AddPost/PostAdditional"
import VerifyUser from "../screens/AuthScreens/VerifyUser"
import ResetPassword from "../screens/AuthScreens/ResetPassword"
import Chattest from "../screens/chattest"
import SearchScreen from "../screens/SearchScreen"
import SearchBar from "../components/Chats/ChatListItem/SearchBar"
import { fetchChat } from "../features/chat/chatSlice"
import ProfileScreen from "../screens/ProfileScreens/Profile"
import WelcomeAddPost from "../screens/ProfileScreens/WelcomeAddPost"
import WelcomeProPic from "../screens/ProfileScreens/WelcomeProPic"
import ProfilePicker from "../screens/ProfilePicker"
import PasswordScreen from "../screens/ProfileScreens/PasswordScreen"
import TermsConditions from "../screens/AuthScreens/TermsConditions"
import WelcomeImperial from "../screens/ProfileScreens/WelcomeImperial"
import AddPost from "../screens/AddPost/index"
import Saved from "../screens/Saved"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Stack = createStackNavigator();
const Navigator = ({showOnBoarding}) => {
  const dispatch = useDispatch();
  // const appState = useRef(AppState.currentState);
  const { user } = useSelector((state) => state.auth)
  const {messageHeader, setmessageHeader} = ChatState()
  const {chattts, selllectedChat,  isLoading, isError, message} = useSelector((state) => state.chat)
  const [isWelcomeFirst, setIsWelcomeFirst] = useState(false);
  // useEffect(() =>{

  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     // console.log(nextAppState)
  //     // if (
  //     //   appState.current.match(/inactive|background/) &&
  //     //   nextAppState === 'active'
  //     // ) {
  //     //   console.log('App has come to the foreground!');
  //     // }
  //   //   if(appState.current.match(/background/) &&
  //   //   nextAppState === 'background'){
  //   //     console.log('display that the user is away')
  //   //   }
    
  //   // if(nextAppState === 'background'){
  //   //   dispatch(fetchChat())
  //   // }
  //   // if(nextAppState === 'active'){
  //   //   dispatch(fetchChat())
  //   // }
  //   // else if(nextAppState === 'active'){
  //   //   console.log('return user to online status')
  //   // }
  //   // console.log(user)
  //   //   appState.current = nextAppState;
  //   //   setAppStateVisible(appState.current);
  //   //   console.log('AppState', appState.current);
  //   });
    
  
  //   return () => {
  //     subscription.remove();
  //   };
      
    
  // }, [])
  useEffect(() =>{

    dispatch(fetchChat())
    // console.log(chattts[1])
    // console.log("===", user)
  
  }, [user])

  const handleWelcomeStack = async() => {
    try {
      const res = await AsyncStorage.getItem('@finished_welcome_screen');
      if(res) {
        setIsWelcomeFirst(true)
      }
    } catch(e) {

    }
  }

  useEffect(()=>{
    console.log("==========")
    if(isWelcomeFirst) {
      handleWelcomeStack();
    }
  }, [])

  return (
   <NavigationContainer>
   {user !== null || user != undefined  ? (
    // <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
    
    <Stack.Navigator>
      {/* <Stack.Screen name="Saved" component={Saved} options={{headerShown: false, headerTintColor: '#593196'}} /> */}
      {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, headerTintColor: '#593196'}}/> */}
      {user?.isFirstTime && <Stack.Screen name="Welcome" component={WelcomeProPic} options={{headerShown: false, headerTintColor: '#593196'}} />}
      <Stack.Screen name="Main" component={MainTabNavigator} options={{headerShown: false, headerTintColor: '#593196'}} />
      {!user?.isFirstTime ? <Stack.Screen name="Welcome" component={WelcomeProPic} options={{headerShown: false, headerTintColor: '#593196'}} /> : null}
      {/*<Stack.Screen name="Chats" component={ChatScreen} /> */}
      {/* <Stack.Screen name="Chats" component={Chattest} options={{headerShown: true}} /> */}
      <Stack.Screen name="Search" component={SearchScreen}  options={({ route }) => ({
          
          // title: <SearchBar chats={chattts}/>,
          // title: <SearchBar/>,
        
          headerShown: false
        })}/>
        {/* <Stack.Screen name="Welcome Pic" component={WelcomeProPic} options={{headerShown: false}} /> */}
        <Stack.Screen name="WelcomeImperial" component={WelcomeImperial} options={{headerShown: false}} />
        {/* {!isWelcomeFirst ? ( */}
          <Stack.Screen name="WelcomePost" component={WelcomeAddPost} options={{headerShown: false}} />
        {/* ) : null} */}
        <Stack.Screen name="ProfilePicker" component={ProfilePicker} options={{headerShown: false}} />
      <Stack.Screen name="Connect" component={ConnectScreen} />
      <Stack.Screen name="User Details" component={OtherProfile} />
      <Stack.Screen name="New Post" component={PostIndex} />
      <Stack.Screen name="FromTo" component={FromTo} options={{headerShown: false}} />
      <Stack.Screen name="PostDescription" component={Description} options={{headerShown: false}} />
      <Stack.Screen name="PostAdditional" component={PostAdditional} options={{headerShown: false}} />
      { messageHeader ? (
        <Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
          // title: route.params.userSelected,
          title: <UserRecently  userData={route.params.userSelected}/>,
          // title: <UserRecently data={route.params.chatId} user={route.params.userSelected}/>,
          headerShown: false
        })}/>
      ) : (<Stack.Screen name="Messaging" component={MessagingScreen}  options={({ route }) => ({
          // title: route.params.userSelected,
          title: <UserRecently  userData={route.params.userSelected}/>,
          //  title: <UserRecently data={route.params.chatId} userData={route.params.userSelected}/>,
          headerShown: false
        })}/>
      )}
      <Stack.Screen name="Account" component={AccountScreen} options={{headerTintColor: '#000', headerShown: false}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTintColor: '#000'}}/>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Security" component={SecurityScreen}/>
      <Stack.Screen name="Password" component={PasswordScreen}/>
      <Stack.Screen name="Contact Us" component={ContactScreen} 
        options = {{
          headerStyle: {
            // backgroundColor: '#593196',
           // backgroundColor: '#a991d4',
          },
          
          // headerTintColor: "#fff"
        }}/>
      {/* <Stack.Screen name = "My Cards" component={MyCards} options={{headerShown: false}}/>
      */}
    <Stack.Screen
        name="My Cards"
        component={MyCards}
        options={{
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerMode: null,
         headerShown: false
        }}
      />
      <Stack.Screen name = "Edit UserName" component={EditUserName} />
      <Stack.Screen name = "Edit Name" component={EditName} />
      <Stack.Screen name = "Edit Email" component={EditEmail} />
      <Stack.Screen name = "Edit Location" component={EditLocation} />
      <Stack.Screen name = "Edit MyTraveler" component={EditMyTravelerScreen} />
      <Stack.Screen name = "Edit MyBuyer" component={EditMyBuyerScreen} />
      <Stack.Screen name = "Edit Buyer Details" component={EditBuyerDetails} />
      <Stack.Screen name = "Edit Traveler Details" component={EditTravelerDetails} />
      <Stack.Screen name = "Edit Space Available" component={EditSpace} />
      {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/> */}
    </Stack.Navigator>
   ): (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
      {showOnBoarding ? (
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/>
      ) : (null)}
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerTintColor: '#593196'}} /> */}
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, headerTintColor: '#593196'}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
      <Stack.Screen name="VerifyUser" component={VerifyUser} options={{headerShown: false}}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, headerTintColor: '#593196'}}/>
      <Stack.Screen name="Terms & Conditions" component={TermsConditions} options={{}}/>
    </Stack.Navigator>
   )}     
   </NavigationContainer>
  )
}
{/* <Stack.Screen name="LoginWithGoogle" component={LoginWithGoogle} options={{headerShown: false, headerTintColor: '#593196'}}/> */}
export default Navigator

 // <NavigationContainer>
  // <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: '#f9f8fc'}}}>
  {/* <Stack.Screen name="Chats" component={RecentlyTest} /> */}
   {/* <Stack.Screen name="Chats" component={PushScreen} /> */}
    {/* <Stack.Screen name="Chats" component={Test2} /> */}
    {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerTintColor: '#593196'}} /> */}
    {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, headerTintColor: '#593196'}}/> */} 
 {/* <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, headerTintColor: '#593196'}}/> */}
 {/* <Stack.Screen name="Chats" component={ChatScreen} /> */}
 {/* <Stack.Screen name="User Details" component={OtherProfile} /> */}
 {/* <Stack.Screen name="Account" component={AccountScreen} options={{headerTintColor: '#000'}}/> */}
 {/* <Stack.Screen name="Settings" component={SettingsScreen}/> */}
 {/* <Stack.Screen name="Contact Us" component={ContactScreen} 
        options = {{
          headerStyle: {
            backgroundColor: '#593196',
           // backgroundColor: '#a991d4',
          },
          
          headerTintColor: "#fff"
        }}/> */}
   {/* <Stack.Screen name = "My Cards" component={MyCards} /> */}
   {/* <Stack.Screen name = "Edit UserName" component={EditUserName} /> */}
   {/* <Stack.Screen name = "Edit Name" component={EditName} /> */}
   {/* <Stack.Screen name = "Edit Email" component={EditEmail} /> */}
   {/* <Stack.Screen name = "Edit Location" component={EditLocation} /> */}
    {/* <Stack.Screen name = "Edit MyTraveler" component={EditMyTravelerScreen} /> */}
  {/* <Stack.Screen name = "Edit MyBuyer" component={EditMyBuyerScreen} /> */}
     {/* <Stack.Screen name = "Edit Buyer Details" component={EditBuyerDetails} /> */}
     {/* <Stack.Screen name = "Edit Traveler Details" component={EditTravelerDetails} /> */}
     {/* <Stack.Screen name = "Connect" component={ConnectScreen} /> */}
 
 

//   </Stack.Navigator>
// </NavigationContainer>