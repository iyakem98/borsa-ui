import { View, Button, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Platform, SafeAreaView , Dimensions} from "react-native"
import profile from '../../../assets/data/profile.json'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { API_BASE_URL } from "../../utils/config";
import { getUserDetails, logout } from '../../features/auth/authSlice';
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const data = [
  { id: '0', imageSource: require('../../../assets/images/avatars/blank-avatar.png') },
  { id: '1', imageSource: require('../../../assets/images/avatars/bottts1.png') },
  { id: '2', imageSource: require('../../../assets/images/avatars/bottts2.png') },
  { id: '3', imageSource: require('../../../assets/images/avatars/bottts3.png') },
  { id: '4', imageSource: require('../../../assets/images/avatars/bottts4.png') },
  { id: '5', imageSource: require('../../../assets/images/avatars/bottts5.png') },
  { id: '6', imageSource: require('../../../assets/images/avatars/bottts6.png') },
  { id: '7', imageSource: require('../../../assets/images/avatars/bottts7.png') },
  { id: '8', imageSource: require('../../../assets/images/avatars/bottts8.png') },
  { id: '9', imageSource: require('../../../assets/images/avatars/bottts9.png') },
  { id: '10', imageSource: require('../../../assets/images/avatars/bottts10.png') },
  { id: '11', imageSource: require('../../../assets/images/avatars/bottts11.png') },
  { id: '12', imageSource: require('../../../assets/images/avatars/bottts12.png') },
  { id: '13', imageSource: require('../../../assets/images/avatars/bottts13.png') },
  { id: '14', imageSource: require('../../../assets/images/avatars/bottts14.png') },
  { id: '15', imageSource: require('../../../assets/images/avatars/bottts15.png') },
  { id: '16', imageSource: require('../../../assets/images/avatars/bottts16.png') },
  { id: '17', imageSource: require('../../../assets/images/avatars/bottts17.png') },
  { id: '18', imageSource: require('../../../assets/images/avatars/bottts18.png') },
  { id: '19', imageSource: require('../../../assets/images/avatars/bottts19.png') },
  { id: '20', imageSource: require('../../../assets/images/avatars/bottts20.png') },
  // Add more images as needed
];

const screenWidth = Dimensions.get('window').width;

const AccountScreen = () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [def, setDef] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/800px-Male_Avatar.jpg?20201202061211")
  const [image, setImage] = useState(def);
  const [userName, setUserName] = useState(user.userName)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [city, setCity] = useState(user.city)
  const [address, setAddress] = useState(user.address)
  const [suggestions, setSuggestions] = useState(false)
  const [myUser, setMyUser] = useState(user)
  const [isEditing, setIsEditing] = useState(false)
  const [placeResult, setPlaceResult] = useState([])
  const [userPreview, setUserPriview] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)
  const [isImperial, setIsImperial] = useState(user.isImperial)

  const [isTraveler, setIsTraveler] = useState(user.isTraveler)
  const [isBuyer, setIsBuyer] = useState(user.isBuyer)


  {/*const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }; */}

  // const user = {
  //   firstName : "walid"
  // }




  const ENDPOINT = "http://192.168.100.2:5000"
  // var socket = io(ENDPOINT)
  var socket = io(API_BASE_URL)


  const handleLogout = () => {
    // {user && socket.emit("userLogout", {userID: user._id}) }
    // dispatch(logout())
    // navigate.navigate("Home")
    // console.log("userrrrrrrrrr", user)
   
//   socket.disconnect()
    
    // alert(" Logout  Successful");

  }

  const handleUpdate = async () => {
    setIsEditing(!isEditing)

    let userData = {
      //id: user._id,
      "firstName": firstName,
      "lastName": lastName,
      "userName": userName,
      "email": email,
      "isTraveler": true,
      "isBuyer": true,
      "address": address,
      "hideTravelerCard": false,
      "hideBuyerCard": false,
      "isImperial": isImperial,
    }

    axios.put(`${API_BASE_URL}users/profile/?id=${user._id}`, userData,
      { headers: {
        'Content-Type': 'application/json',
    }}).then((data) => {
      alert('profile updated')
      // handleLogout()
      dispatch(getUserDetails(user._id))
      navigation.navigate('More')
    }).catch((err) => {dea
      alert("try again pls.")
      console.log("errorr", err)
    }); 
  }

  const findPlaces = (newText) => {
    axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${newText}&apiKey=8cb194b9c3384d909b48ba0c3adf1ab0`)
        .then((data) => {
          setAddress(newText)
          let newSet = []
          if(data.data.features.length<6){
            for (let i=0; i<data.data.features.length; i++){
              let opt = `${data.data.features[0].properties.city}, ${data.data.features[0].properties.country}`

              if(newSet.indexOf(opt)==-1){
                newSet.push(opt)
              }
               
            }
            setPlaceResult(newSet)
          }else{
            for (let i=0; i<6; i++){
              newSet.push(
               `${data.data.features[0].properties.city}, ${data.data.features[0].properties.country}`
              )
           }
           setPlaceResult(newSet)
          }

         console.log(data.data.features[0].properties.city)
         //setPlaceResult(data.data)
         })
        .catch((err) => {
          console.log("error", err)
         
        });
  }

  const handleUserAddress = (data) => {  
    let Country = ""
    let City = ""

    if(place.address_components){
      for(let i=0; i<place.address_components.length; i++){
        let types = place.address_components[i].types
        if(types.indexOf("country") != -1 && Country==""){
          Country = place.address_components[i].long_name
        }

        if(types.indexOf("locality") != -1 && City==""){
          City = place.address_components[i].long_name
        }
      }
    }
    setAddress(`${City}, ${Country}`)
  }

  useEffect(() => { 
    if(user==null){
      navigation.navigate("Home")
    } 
    console.log("user id issssssss:", user._id)
  }, [user])

  const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };


  return (
    <View style={{flex: 1,
      backgroundColor: 'white'
    }}>
        <KeyboardAwareScrollView style={{

        }}>
    <View style = {{
        //paddingTop: 20,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
        alignItems: 'center'
    }}>

      {/* <KeyboardAwareScrollView> */}

      <LinearGradient  colors={['#593196', "#fff"]} style = {{
                        width: '100%',
                        paddingTop: 80,
            }}>
              <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>

              <Pressable onPress={()=>navigation.navigate('More')}
                style = {{
                  //backgroundColor: '#593196',
                  flexDirection: 'row',
                  //paddingVertical: 2,
                  paddingHorizontal: 4,
                  width: "25%",
                  //marginVertical: 10,
                  marginLeft: 10,
                  borderRadius: 20,
                  alignItems: 'center',
              }}>
            <Feather name="chevron-left" size={34} color="#fff" />
              {/*<Text style={{fontSize:29, marginTop:-3, marginLeft:3, color: 'black'}}>&larr;</Text> */}
              <Text style={{fontSize:18, color: '#fff'}}>
                Back
              </Text>

            
          </Pressable>

          <Text style = {{
            position: 'absolute',
            left: "40%",
            right: "38%",
            fontSize: 18,
            color: 'white',
            fontFamily: 'Poppins_600SemiBold',
          }}>
            Account
          </Text>

              </View>
           
           <View style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginTop:0,
        }}>
          

          <Image source={getImageSourceById(user.profilePic)} style={{ 
            width: 150,
            height: 150,
            marginTop:0,
            // borderRadius: "100%",
            borderRadius: 100,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }} />

          <TouchableOpacity onPress={() => navigation.navigate('ProfilePicker')}
            style = {{
              flexDirection: 'row',
              borderStyle: 'solid',
              //borderWidth: 2,
              borderRadius: 20,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 6,
            }}>
               <View style = {{
              padding: 5,
              borderStyle: 'solid',
              marginRight: 6,
              //borderWidth: 1,
              borderRadius: 50,
              backgroundColor: "#13b955",
            }}>
            <Entypo name="edit" size={18} color="#fff"/>
            </View>
            <Text style = {{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
            }}>
              Change avatar
            </Text>
           
          </TouchableOpacity>

        {/*<Entypo name="edit" size={24} color="red" onPress={()=>{
          if(isEditing){
            pickImage()
          }
        }} 
        style={{
          padding:2,
          backgroundColor:"#593196",
          color:"#fff",
          marginLeft:90,
          marginTop:-30,
          zIndex:100
        }}
        /> */}



        <Text style={styles.fullname}>
          {firstName + ' ' + lastName} 
        </Text>
        </View>
      </LinearGradient>

       

        <View style={{marginTop:10, width: '100%', alignItems: 'center'}}>
        {
          !isEditing &&

          <TouchableOpacity style={{
            position:"relative",
            top:5,
            left:10,
            backgroundColor: '#593196',
            color:"white",
            //width: 100,
            height: 40,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> setIsEditing(!isEditing)}
          >
           <Text style={{color:'#fff',
            fontFamily: "Poppins_400Regular"}}> Open Account Editor</Text>
          </TouchableOpacity>
        }

      {
          isEditing &&
        <View style={{//display:"flex",
         flexDirection:"row"}}>
          <TouchableOpacity style={{
            position:"relative",
            top:5,
            left:10,
            border: '1px solid #593196',
            color:"black",
            width: 150,
            height: 40,
            borderRadius: 0,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> {
            setIsEditing(!isEditing)
            setUserName(myUser.userName)
            setFirstName(myUser.firstName)
            setLastName(myUser.lastName)
            setEmail(myUser.email)
            setCity(myUser.city)
            setAddress(myUser.address)
            setIsBuyer(myUser.isBuyer)
            setIsTraveler(myUser.isTraveler)
            setIsImperial(myUser.isImperial)
            setSelectedTab(0)
            //setImage(def)
          }}
          >
             <Text style = {{fontFamily: "Poppins_400Regular"}}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            position:"relative",
            top:5,
            left:15,
            backgroundColor: '#593196',
            color:"white",
            width: 150,
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> {
           handleUpdate()
          }}
          >
            <Text style={{color:'#fff', fontFamily: "Poppins_400Regular"}}>Save Changes</Text>
          </TouchableOpacity>
          </View>
        }
        </View>

        <View style={{marginTop:25}}>
          <Text style = {{
            fontSize: 15,
            fontFamily: "Poppins_400Regular",
          }}>
            First Name
          </Text>
        <TextInput style = {{
          color: `${
            isEditing ? "#000" : "gray"
          }`,
          marginVertical: 0,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           marginBottom: 15,
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  0,
           paddingVertical: 5,
           borderColor: isEditing? '#000' : 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
          borderRadius: 0,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={firstName}
               onChangeText={newText=>{
                setFirstName(newText)
               }}
               editable={isEditing}
              //onChangeText = {this.handlePassword}
              />
        </View>

        <View style={{marginTop:5}}>
        <Text style = {{
            fontSize: 15,
            fontFamily: "Poppins_400Regular",
          }}>
            Last Name
          </Text>
        <TextInput style = {{
          color: `${
            isEditing ? "#000" : "gray"
          }`,
          marginVertical: 0,
          marginBottom: 15,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  0,
           paddingVertical: 5,
           borderColor: isEditing? '#000' : 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
          borderRadius: 0,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               placeholder = "Last Name"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={lastName}
               onChangeText={newText=>{
                setLastName(newText)
               }}
               editable={isEditing}
              //onChangeText = {this.handlePassword}
              />
        </View>

        <View style={{marginTop:5}}>
          <Text style = {{
            fontSize: 15,
            fontFamily: "Poppins_400Regular",
          }}>
            Email
          </Text>
        <TextInput style = {{
          color: `${
            isEditing ? "#000" : "gray"
          }`,
          marginVertical: 0,
             marginBottom: 5,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  0,
           paddingVertical: 5,
           borderColor: isEditing? '#000' : 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
          borderRadius: 0,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={email}
               onChangeText={newText=>{
                setEmail(newText)
               }}
               editable={isEditing}
              //onChangeText = {this.handlePassword}
              />
        </View>
        <View style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 15
          }}>
          {/*   {loadingBuyer &&  
                    <View style={{
                      //height: 20000,
                      backgroundColor: 'yellow'
                  }}>
                    <ActivityIndicator size="large" color="#777" />
                  </View>
                  } */}
                 
            <View style={{
              flexDirection: "row",
              //alignItems: 'center',
              justifyContent: "space-between",
              width: screenWidth - 80,
              marginTop: 15,
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              borderRadius: 10,
              paddingVertical: 4,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
              <Pressable disabled = {isEditing? false : true}
                style={{
                    backgroundColor: selectedTab === 1 || (!user.isImperial && selectedTab == 0) ? "#593196" : "#fff",
                    borderRadius: 5,
                    width: "49%",
                    paddingVertical: 7,
                    alignItems: "center",
                    justifyContent: 'center',
                }} onPress={()=>{
                    setSelectedTab(1)
                    setIsImperial(false)
                }}>
                  <Text style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      color: selectedTab === 1 || (!user.isImperial && selectedTab == 0) ? "#fff" : "#000",
                  }}>Metric</Text>
              </Pressable>
              <Pressable disabled = {isEditing? false : true}
                style={{
                    backgroundColor: selectedTab === 2 || (user.isImperial && selectedTab == 0) ? "#593196" : "#fff",
                    borderRadius: 5,
                    width: "49%",
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignItems: "center"
                }} onPress={()=>{
                  setSelectedTab(2)
                  setIsImperial(true)
                }}>
                  <Text style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      color: selectedTab === 2 || (user.isImperial && selectedTab == 0) ? "#fff" : "#000",
                  }}>Imperial</Text>
              </Pressable>
            </View>
          </View>

    
{/* </KeyboardAwareScrollView>     */}
    </View>
    </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderRadius: 30,
    //borderStyle: 'solid',
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginVertical: 5,
    //borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#E8E8E8',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.00,

    elevation: 1, 
  },
  fullname: {
    fontSize:30,
    //letterSpacing: 3,
    // fontWeight:700,
    marginTop:20,
    marginBottom: 20,
    opacity:0.7
  },

  username: {
    fontSize:20,
    letterSpacing: 3,
    // fontWeight:500,
    marginTop:-20,
    marginBottom: 10,
    opacity:0.7
  },

  divider: {
    width:"100%",
    height:0.2,
    backgroundColor:"#593196",
    opacity: 0.5
  },

  label: {
    fontSize: 15,
    opacity: 0.8,
    textAlign:"left"
  }

})

export default AccountScreen