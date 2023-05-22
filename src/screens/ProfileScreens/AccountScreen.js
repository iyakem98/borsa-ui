import { View, Button, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Platform, SafeAreaView } from "react-native"
import profile from '../../../assets/data/profile.json'
import { AntDesign, Entypo } from '@expo/vector-icons';
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
      "profilePic": image,
      "hideTravelerCard": false,
      "hideBuyerCard": false
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


  return (
    <SafeAreaView style={{flex: 1,
      backgroundColor: 'white'
    }}>
        <ScrollView style={{

        }}>
    <View style = {{
        paddingTop: 20,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
        alignItems: 'center'
    }}>

      {/* <KeyboardAwareScrollView> */}

       
        <View style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginTop:0,
        }}>
          

<Image source={{ uri: image }} style={{ 
  width: 150,
  height: 150,
  marginTop:0,
  // borderRadius: "100%",
  borderRadius: 100,
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
 }} />

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
          {/* {firstName+' '+lastName} */}
          {firstName + ' ' + lastName} 
        </Text>

       {/* <Text style={styles.username}>
          @{userName}
</Text> */}

        <View style={styles.divider}>
              
        </View>

       

        </View>

        <View style={{marginTop:0, alignItems: 'center'}}>
        {
          !isEditing &&

          <TouchableOpacity style={{
            position:"relative",
            top:5,
            left:10,
            backgroundColor: '#593196',
            color:"white",
            //width: 100,
            //height: 40,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> setIsEditing(!isEditing)}
          >
           <Text style={{color:'#fff'}}> Click here to start Editing</Text>
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
            setImage(def)
          }}
          >
             <Text>Cancel</Text>
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
            <Text style={{color:'#fff'}}>Save Changes</Text>
          </TouchableOpacity>
          </View>
        }

       {/* <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10%",
          //  marginRight:"10%",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={userName}
               onChangeText={newText=>{
                setUserName(newText)
               }}
               editable={isEditing}
              //onChangeText = {this.handlePassword}
              /> */}
        </View>

        <View style={{marginTop:15}}>
          <Text>
            First Name
          </Text>
        <TextInput style = {{
          color: `${isEditing ? "#000" : "gray"}`,
           marginVertical: 15,
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
           paddingHorizontal: 5,
           paddingVertical:10,
           borderColor: 'black',
           borderWidth: isEditing? 0 : StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
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
        <Text>
            Last Name
          </Text>
        <TextInput style = {{
          color: `${
            isEditing? "#000" : "gray"
          }`,
           marginVertical: 15,
           //height: 50,
           //borderRadius:10,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal: 5,
          paddingVertical:10,
           borderColor: 'black',
           borderWidth: isEditing? 0 : StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          //  opacity:`${isEditing? 1 : 0.5}`,
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
          <Text>
            Email
          </Text>
        <TextInput style = {{
          color: `${
            isEditing ? "#000" : "gray"
          }`,
           marginVertical: 15,
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
           paddingHorizontal: 5,
           paddingVertical:10,
           borderColor: 'black',
           borderWidth: isEditing? 0 : StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
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

       {/* <View style={{width:300, marginTop:10}}>
        <GooglePlacesAutocomplete
                        placeholder='Enter your address'
                        onPress={(data) => {
                            handleUserAddress(data)
                            console.log(data);
                        }}
                        query={{
                            key: 'AIzaSyBEQjAi9JOrXgaekQKY6oeSYb8C_5rAudU',
                            language: 'en',
                            types: '(cities)'
                        }}
                        styles={{
                          textInputContainer: {
                            // backgroundColor: 'grey',
                          },
                          textInput: {
                            height: 50,
                            border:"1px solid black",
                            width:300,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderRadius:10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />
        </View>
                      */}

        {/* <View style={{marginTop:10}}>
        <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:10,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               placeholder = "Address"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               value={address}
               onChangeText={
                newText=>
                {
                setAddress(newText)
                if(newText.length>0){
                  setSuggestions(true)
                  findPlaces(newText)
                }
                }
              }
               editable={isEditing}
              //onChangeText = {this.handlePassword}
              />
        </View>

        {
          suggestions &&
          <View
          style={{
            // display:"flex",
            margin: 15,
            marginTop:-20,
           height: 50,
           backgroundColor:"white",
           borderRadius:10,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
           padding:5,
          //  opacity:`${isEditing? 1 : 0.5}`,
          opacity: 1,
           height:"auto",
            shadowOffset: { width: 10, height: 10 },
            shadowColor: 'white',
            shadowOpacity: 1.0,
            justifyContent:"center",
            alignContent:"center",
            alignItems:"center"
          }}
        >
           {
           placeResult.length>0 &&  placeResult.map((place, i) => (
            <>
            <Text
            style={{
              marginBottom:5,
              backgroundColor:""
            }} 
            key={i}
            onPress={()=>
            {
              setAddress(place)
              setSuggestions(false)
            }
              }>
                {place}
              </Text>
            </>
           ))
          }
          
        </View>
        } */}
     

        {/* <View style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
        <View style={{display:"flex", flexDirection:"row"}}>
        <CheckBox
           value={isBuyer}
           onValueChange={()=>{
            if(isEditing){
              setIsBuyer(!isBuyer)
            }
            
           }}
          style={{opacity:`${isEditing? 1 : .5}`}}
        />
        <Text style={{marginLeft:20}}>Buyer</Text>
        </View>
        
        <View style={{display:"flex", flexDirection:"row"}}>
        <CheckBox
           value={isTraveler}
           onValueChange={()=>{
            if(isEditing){
              setIsTraveler(!isTraveler)
            }
            
           }}
           style={{marginLeft:20,  opacity:`${isEditing? 1 : .5}`}}
        />
        <Text style={{marginLeft:20}}>Traveler</Text>
        </View>
        </View> */}
       
        
       
     

      {/* <View style = {{
        alignItems: 'center'
      }}>
        
        <Text style = {{
          fontSize: 25,
          marginTop: 10
        }}>
          {user.firstName + ' ' + user.lastName}
        </Text>
        <Text style = {{
          color:'gray',
        }}>
          {user.userName}
        </Text>
      </View>

      <View style = {{
        width: '90%',
        paddingTop: 40,
      }}>
        
        <Pressable onPress={() => navigation.navigate('Edit UserName')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            username
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.userName}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        
        <Pressable onPress={() => navigation.navigate('Edit Name')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Name
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.firstName + ' ' + user.lastName} 
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit Email')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Email
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.email}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit Location')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Location
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
               {user.city + ', ' + user.country}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>

        <Pressable onPress={() => navigation.navigate('Edit MyBuyer')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Buyer
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              Yes 
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit MyTraveler')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Traveler
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            {user.isTraveler? (
                <Text style = {{
                  color: "gray",
                  marginRight: 10,
                  fontSize: 16,
                }}>
                  Yes 
                </Text>
            ): (
              <Text style = {{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
              }}>
                Yes 
              </Text>
            )}
            
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>        
      </View> */}

    
{/* </KeyboardAwareScrollView>     */}
    </View>
    </ScrollView>
    </SafeAreaView>
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
    marginBottom: 30,
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