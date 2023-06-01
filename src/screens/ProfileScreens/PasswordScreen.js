import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { API_BASE_URL } from "../../utils/config";
import { getUserDetails, logout } from '../../features/auth/authSlice';
import axios from 'axios';

const PasswordScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handlePwdChange = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPasswordError('whaap')
        }

        else {
            let userData = {
                //id: user._id,
                "oldPassword": currentPassword,
                "newPassword": newPassword,
              }
          
           // /api/users/change-password

           axios.put(`${API_BASE_URL}users/change-password/?id=${user._id}`, userData,
            { headers: {
                'Content-Type': 'application/json',
            }}).then((data) => {
                alert('password changed')
                // handleLogout()
                //dispatch(getUserDetails(user._id))
                navigation.navigate('More')
                }).catch((err) => {
                    if(err?.response?.data?.message === "Incorrect old password") {
                        setPasswordError("Incorrect old password")
                      } else if(err?.response?.data?.message === "Password must be 6-20 characters long") {
                        setPasswordError("Password must be 6-20 characters long")
                      } else if(err?.response?.data?.message === "New password cannot be the same as old password") {
                        setPasswordError("New password cannot be the same as old password")
                      } else {
                        setPasswordError("Something went wrong")
                      }
            }); 
        }
    }
  return (
    <View style = {{
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingHorizontal: 10,
    }}>
        <View style = {{
            width: "100%",
            //alignItems: 'center',
            marginBottom: 20,
        }}>
            <Text style = {{
                fontSize: 20,
                fontFamily: "Poppins_600SemiBold",
            }}>
                Change Password
            </Text>
        </View>
        <View style={{marginTop:5}}>
          <Text style = {{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
          }}>
            Enter your old password
          </Text>
        <TextInput style = {{
          color:
             "gray" 
        ,
          marginVertical: 0,
             marginBottom: 5,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  5,
           paddingVertical: 5,
           borderColor: 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
          //borderRadius: 5,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               //placeholder = "Password"
               //placeholderTextColor = "black"
               autoCapitalize = "none"
               secureTextEntry={true}
               value={currentPassword}
               onChangeText={newText=>{
                setCurrentPassword(newText)
               }}
              //onChangeText = {this.handlePassword}
              />
        </View>

        <View style={{marginTop:20}}>
          <Text style = {{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
            //marginBottom: 10,
          }}>
            Enter new password
          </Text>
        <TextInput style = {{
          color:
             "gray" 
        ,
          marginVertical: 0,
          width: '95%',
             marginBottom: 5,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  5,
           paddingVertical: 5,
           borderColor: 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
          //borderRadius: 5,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               //placeholder = "Password"
               //placeholderTextColor = "black"
               autoCapitalize = "none"
               secureTextEntry={true}
               value={newPassword}
               onChangeText={newText=>{
                setNewPassword(newText)
               }}
              //onChangeText = {this.handlePassword}
              />
        </View>

        <View style={{marginTop:10}}>
          <Text style = {{
            fontSize: 18,
            fontFamily: "Poppins_400Regular",
            //marginBottom: 10,
          }}>
            Confirm new password
          </Text>
        <TextInput style = {{
          color:
             "gray" 
        ,
          marginVertical: 0,
             marginBottom: 5,
           fontSize: 20,
           fontFamily: "Poppins_400Regular",
           //height: 50,
           borderRadius:0,
           width:300,
          //  marginLeft:"10vw",
          //  marginRight:"10vw",
          paddingHorizontal:  5,
           paddingVertical: 5,
           borderColor: 'gray',
           //borderWidth: isEditing? StyleSheet.hairlineWidth : 0,
           borderBottomWidth: 0.6,
           //borderRadius: 5,
          //  opacity:`${isEditing? 1 : 0.5}`
          opacity: 1
        }}
               underlineColorAndroid = "transparent"
               //placeholder = "Password"
               //placeholderTextColor = "black"
               autoCapitalize = "none"
               value={confirmNewPassword}
               secureTextEntry={true}
               onChangeText={newText=>{
                setConfirmNewPassword(newText)
               }}
              //onChangeText = {this.handlePassword}
              />
        </View>
        {passwordError ? (
          <Text style={{
            marginTop: 10,
            textAlign: "center",
            color: "red",
            fontFamily: "Poppins_400Regular",
            fontSize: 13
          }}>
            {passwordError}
          </Text>
        ) : (null)}
        <View style = {{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
        }}>
            <TouchableOpacity
                style = {{
                    backgroundColor: '#eee',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 5,
                    marginHorizontal: 3
                }}>
                <Text style = {{
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                    //color: 'white',
                }}>
                    Cancel
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePwdChange}
                style = {{
                    backgroundColor: '#593196',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 5,
                    marginHorizontal: 5,
                }}>
                <Text style = {{
                    fontSize: 16,
                    color: 'white',
                    fontFamily: "Poppins_400Regular",
                }}>
                    Confirm
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PasswordScreen