import { View, Button, CheckBox, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native"
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
import * as ImagePicker from 'expo-image-picker';


const AccountScreen = () => {

  const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);

  const pickImage = async () => {
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
  };

  const navigate = useNavigation()

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)


  const [userName, setUserName] = useState(user.userName)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [city, setCity] = useState(user.city)
  const [address, setAddress] = useState(user.address)

  const [isTraveler, setIsTraveler] = useState(user.isTraveler)
  const [isBuyer, setIsBuyer] = useState(user.isBuyer)

  const [suggestions, setSuggestions] = useState(false)
 
  const [myUser, setMyUser] = useState(user)
  const [isEditing, setIsEditing] = useState(false)

  const [placeResult, setPlaceResult] = useState([])

  const ENDPOINT = "http://192.168.100.2:5000"
  var socket = io(ENDPOINT)

  const [userPreview, setUserPriview] = useState("")

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

    axios .put(`${API_BASE_URL}users/profile/?id=${user._id}`, userData,
    { headers: {
      'Content-Type': 'application/json',
  }})
        .then((data) => {
         alert('yes')
          handleLogout()
          //dispatch(getUserDetails(user._id))
         })
        .catch((err) => {
          // alert("try again pls.")
        });
  }

  const findPlaces = async (newText) => {
    axios .get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${newText}&apiKey=8cb194b9c3384d909b48ba0c3adf1ab0`)
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

  useEffect(() => { 
    if(user==null){
      navigate.navigate("Home")
    } 
    console.log("user id issssssss:", user._id)
 }, [user])


  return (
    <View style = {{
        paddingTop: 30,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
        alignItems: 'center'
    }}>

        {
          !isEditing &&

          <TouchableOpacity style={{
            position:"absolute",
            top:"1.2em",
            right:"10px",
            backgroundColor: '#593196',
            color:"white",
            width: '100px',
            height: '40px',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> setIsEditing(!isEditing)}
          >
            Edit
          </TouchableOpacity>
        }

      {
          isEditing &&
        <>
          <TouchableOpacity style={{
            position:"absolute",
            top:"1.2em",
            right:"167px",
            border: '1px solid #593196',
            color:"black",
            width: '150px',
            height: '40px',
            borderRadius: 10,
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
            Cancel
          </TouchableOpacity>

          <TouchableOpacity style={{
            position:"absolute",
            top:"1.2em",
            right:"10px",
            backgroundColor: '#593196',
            color:"white",
            width: '150px',
            height: '40px',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing:2
          }}
          onPress={()=> {
           handleUpdate()
          }}
          >
            Save Changes
          </TouchableOpacity>
          </>
        }

        <View style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          marginTop:50
        }}>
          

<Image source={{ uri: image }} style={{ 
  width: 200,
  height: 200,
  borderRadius: "100%",
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
 }} />

<Entypo name="edit" size={24} color="red" onPress={()=>{
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
/>

        {/* <View style = {{
                    borderRadius: "50%",
                    backgroundColor: '#593196',
                    backgroundColor: '#a991d4',
                    paddingHorizontal: 2,
                    paddingVertical: 2,
                    marginRight: 20
                  }}>
                    {/* <Entypo name="pencil" size={24} color="black" /> */}
                  

        <Text style={styles.fullname}>
          {firstName+' '+lastName}
        </Text>

        <Text style={styles.username}>
          @{userName}
        </Text>

        <View style={styles.divider}>
              
        </View>

       

        </View>

        <View style={{marginTop:10}}>
        <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
           opacity:`${isEditing? 1 : .5}`
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
              />
        </View>

        <View style={{marginTop:5}}>
        <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
           opacity:`${isEditing? 1 : .5}`
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
        <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
           opacity:`${isEditing? 1 : .5}`
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

        <View style={{marginTop:10}}>
        <TextInput style = {{
           margin: 5,
           height: 50,
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
           opacity:`${isEditing? 1 : .5}`
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


        <View style={{marginTop:10}}>
        <TextInput style = {{
           margin: 15,
           height: 50,
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           borderColor: 'black',
           borderWidth: 1,
           opacity:`${isEditing? 1 : .5}`
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
            display:"flex",
            margin: 15,
            marginTop:"-20px",
           height: 50,
           backgroundColor:"white",
           borderRadius:10,
           width:"80vw",
           marginLeft:"10vw",
           marginRight:"10vw",
           padding:5,
           opacity:`${isEditing? 1 : .5}`,
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
        }
     

        <View style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
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
        </View>
       
        
       
     

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
    letterSpacing: 3,
    fontWeight:700,
    marginTop:20,
    marginBottom: 30,
    opacity:.7
  },

  username: {
    fontSize:20,
    letterSpacing: 3,
    fontWeight:500,
    marginTop:-20,
    marginBottom: 10,
    opacity:.7
  },

  divider: {
    width:"100vw",
    height:.2,
    backgroundColor:"#593196",
    opacity: .5
  },

  label: {
    fontSize: 15,
    opacity: .8,
    textAlign:"left"
  }

})

export default AccountScreen