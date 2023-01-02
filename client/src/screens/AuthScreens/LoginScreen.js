import {View, Text, ImageBackground, Image, SafeAreaView, TextInput, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../../features/auth/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const navigation = useNavigation()

  const navigate = useNavigation()
  const handleSubmit = async () => {
      if ( email === '' || password === '') {
          alert("All fields are required");
          return;
      }
    
      const userData = {
          email,
          password,
        }
      dispatch(login(userData)) 
    
   

  };
  return (
    <View style = {{
      height: "100%",
      backgroundColor: 'white'
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

        <View style = {{
          alignItems: 'center',
          paddingVertical: 40,
          width: '100%',
          backgroundColor: 'white'
        }}>
              <TextInput placeholder='Enter your email'
                style = {{
                  width: '85%',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: 'solid',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: "lightgray",
                  fontSize: 18,
                  marginBottom: 16,

                }}
                value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address"
                />

              <View style = {{
                width: "85%",
                flexDirection: 'row',
                //justifyContent:'center',
                borderStyle: 'solid',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "lightgray",
                
              }}>
              <TextInput placeholder='Enter password'
                style = {{
                  width: '90%',
                  paddingHorizontal: 6,
                  paddingVertical: 8,
                  
                  fontSize: 18

                }}
                value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" 
                />
                <AntDesign name="eye" size={24} color="lightgray" style = {{
                  marginTop: 7,
                }} />
              </View>
              <TouchableOpacity style = {{
                backgroundColor: '#13b955',
                width: "70%",
                height: "14%",
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
              onPress= {() => handleSubmit()} 
               >
                <Text style = {{
                  color: 'white',
                  fontSize: 20,
                }}>
                  Login
                </Text>
              </TouchableOpacity>
              <Text style = {{
                color: 'gray'
              }}>
                Forgot password?
              </Text>

              <Pressable 
                onPress={() => navigation.navigate('Signup')}
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
                  Create a new account!
                </Text>
              </Pressable>
        </View>
    </View>
  )
}

export default LoginScreen