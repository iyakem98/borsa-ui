import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

const PasswordScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
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
               value={oldPassword}
               onChangeText={newText=>{
                setOldPassword(newText)
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
        <View style = {{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
        }}>
            <TouchableOpacity style = {{
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
            <TouchableOpacity style = {{
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