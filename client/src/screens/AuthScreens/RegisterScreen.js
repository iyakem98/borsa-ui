
import {View, Text, ImageBackground, Image, SafeAreaView, TextInput, StyleSheet, Pressable, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { reset } from '../../features/chat/chatSlice';


const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("")
  const [isTraveler, setIsTraveler] = useState(false);
  const [profilePic, setProfilePic] = useState("xoxoxo");
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(true)
  const [secureText, setSecureText] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigation()
  const Icon = <Pressable onPress={() => {
    setVisibility(!visibility)
    setSecureText(!secureText)
  }}>
                <Entypo name={visibility ? "eye" : "eye-with-line"} size={24} color="black" style = {{
                    marginTop: 7,
                  }} />
              </Pressable>
  const checkValidation = (text) => {
     setPasswordAgain(text)
     if(password !== passwordAgain){
      setPasswordError("passwords do not match ")

     }
     else{
      setPasswordError("")
     }
  }
  const handleSubmit = async () => {
    if (  firstName === '' || lastName === '' || userName === ''  || email === '' || password === '' || country === '' ||  city === '') {
        alert("All fields are required");
        return;
    }
    if(password != passwordAgain){
      // setPasswordError("error in matching passwords")
      alert("passwords do not match")
      return;
    }
    if(password.length < 8){
      // setPasswordError("error in matching passwords")
      alert("your password should be at least greater than eight characters")
      return;
    }
    
    
   
    const userData = {
        firstName,
        lastName,
        email,
        password,
        userName,
        isTraveler,
        profilePic,
        city,
        country

      }
      console.log(userData)
    //   await axios.post("http://192.168.100.2:5002/api/users/", userData);
    dispatch(register(userData)) 
    dispatch(reset()) 
    alert("Sign In Successful");
    navigate.navigate("Chats")

};

  return (
    <View style = {{
        height: "100%",
      }}>
          <View style = {{
            height: '38%',
            backgroundColor: '#593196',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
  
              <Image 
                  source = {require ('../../data/logos/lwhiteclearbg.png')} 
                  style = {{
                      width: 80,
                      height: 130,
                      resizeMode: 'cover',
                      marginBottom: 10
                  }}
                  />  
                <Text style = {{
                  color: 'white',
                  fontSize: 17,
                  
                  
                }}>
                  Borsa
                </Text>
  
          </View>

          <ScrollView style = {{backgroundColor: 'white'}}>
          <View style = {{
            alignItems: 'center',
            paddingVertical: 40,
            width: '100%',
            backgroundColor: 'white'
          }}>
                <View style = {{
                    width: "100%",
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                }}>
                <TextInput placeholder='First Name'
                  style = {{
                    width: '36%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,
  
                  }}
                  value={firstName}
                   onChangeText={text => setFirstName(text)}
                  />

                <TextInput placeholder='Last Name'
                  style = {{
                    width: '36%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,

  
                  }}
                  value={lastName}
                   onChangeText={text => setLastName(text)}
                  />
  
                </View>
                <TextInput placeholder='Enter your username'
                  style = {{
                    width: '85%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 8,
  
                  }}
                  value={userName} 
                  onChangeText={text => setuserName(text)}
                  />
                <TextInput placeholder='Enter your email'
                  style = {{
                    width: '85%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 8,
  
                  }}
                  value={email} 
                  onChangeText={text => setEmail(text)}
                   autoCompleteType="email" keyboardType="email-address"
                  />
  
                <View style = {{
                  width: "85%",
                  flexDirection: 'row',
                  //justifyContent:'center',
                  borderStyle: 'solid',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: "lightgray",
                  marginVertical: 8,
                  
                }}>
                <TextInput placeholder='Enter password'
                  style = {{
                    width: '90%',
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    
                    fontSize: 18
  
                  }}
                  value={password} 
                  onChangeText={text => setPassword(text)} 
                  secureTextEntry={secureText} 
                  />
                  {Icon}
                </View>
                <View 
                    style = {{
                    width: "85%",
                    flexDirection: 'row',
                    //justifyContent:'center',
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    marginVertical: 8,
                  
                }}>
                <TextInput placeholder='Confirm password'
                  style = {{
                    width: '90%',
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    
                    fontSize: 18
  
                  }}
                  value={passwordAgain} 
                 
                  onChangeText={(text) => {
                   
                    setPasswordAgain(text)
                  }} 
                  secureTextEntry={secureText}

                  />
                    {Icon}
                
                </View>
                <TextInput placeholder='Enter your Country'
                  style = {{
                    width: '85%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginVertical: 8,
                  }}
                  value={country} 
                  onChangeText={text => setCountry(text)}
                  />
                <TextInput placeholder='Enter your City'
                  style = {{
                    width: '85%',
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginVertical: 8,
                  }}
                  value={city} 
                  onChangeText={text => setCity(text)}
                  />

                  <TouchableHighlight style = {{
                    backgroundColor: "#f9f8fc",
                    width: "80%",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    
                  }}>
                    <Text style = {{}}>
                        Upload profile pic
                    </Text>
                  </TouchableHighlight>
                  <View>
                  </View>
                  {/* <View>
                    <Text>
                    {passwordError}
                    </Text>
                   
                  </View> */}
                <TouchableOpacity style = {{
                  backgroundColor: '#13b955',
                  width: "70%",
                  height: "9%",
                  marginTop: 40,
                  marginBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
  
                  shadowColor: "000",
                  shadowOffset: {
                      width: 0,
                      height: 3,
                  },
                  shadowOpacity: 0.28,
                  shadowRadius: 3.00,
  
                  elevation: 1,
  
                }} 
                onPress={() => handleSubmit()}>
                  <Text style = {{
                    color: 'white',
                    fontSize: 20,
                  }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <Text style = {{
                  color: 'gray'
                }}>
                  Forgot password?
                </Text>
  
                <Pressable 
                  onPress={() => navigate.navigate('Login')}
                  style = {{
                    marginVertical: 30,
                    borderStyle: 'solid',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: '#593196',
                    paddingHorizontal: 3
                }}>
                  <Text style = {{
                    //color: '#a991d4'
                    color: '#593196',
                    fontSize: 16,
                  }}>
                    Already have an account!
                  </Text>
                </Pressable>
          </View>
          </ScrollView>
  
          
      </View>
  )
}

export default RegisterScreen