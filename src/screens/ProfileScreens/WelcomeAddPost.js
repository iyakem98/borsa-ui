import { View, Text, StyleSheet, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { getUserDetails } from "../../features/auth/authSlice"
import axios from "axios"
import { API_BASE_URL } from "../../utils/config"
import AsyncStorage from "@react-native-async-storage/async-storage"

const WelcomeAddPost = () => {
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)

    const updateStatusandAddPost = async() => {

        let userData = {
            //id: user._id,
            "isFirstTime": false,
          }
      
         await axios.put(`${API_BASE_URL}users/profile/?id=${user._id}`, userData,
            { headers: {
              'Content-Type': 'application/json',
          }}).then((data) => {
            alert(`All set! Welcome to Borsa ${user.firstName}!`)
            // handleLogout()
            dispatch(getUserDetails(user._id))
           
          }).catch((err) => {
            //alert("try again pls.")
            console.log("errorr", err)
          }); 

        // navigation.navigate('AddPost')
        navigation.navigate('New Post')
    }

    const onlyUpdateStatus = async() => {
        let userData = {
            //id: user._id,
            "isFirstTime": false,
          }
      
          await axios.put(`${API_BASE_URL}users/profile/?id=${user._id}`, userData,
            { headers: {
              'Content-Type': 'application/json',
          }}).then((data) => {
            alert(`All set! Welcome to Borsa ${user.firstName}!`)
            // handleLogout()
            dispatch(getUserDetails(user._id))
          }).catch((err) => {
            //alert("try again pls.")
            console.log("errorr", err)
          });

          await AsyncStorage.setItem('@finished_welcome_screen', "true");

          navigation.navigate('Main')

    }
    return (
      <LinearGradient 
      colors={['#705c9d','#593196']}
      style = {{
          height: "100%",
          //alignItems: 'center',
          paddingTop: 70,
          paddingHorizontal: 10,
          //justifyContent: 'center'
      }}>
        <Pressable onPress={()=>navigation.navigate('Welcome')} style = {{
            marginBottom: 40,
        }}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <View style = {{
        marginBottom: 30,
    }}>
            <Text style = {{
                fontSize: 25,
                color: 'white',
                fontFamily: "Poppins_400Regular"
            }}>
               Unlock Seamless Logistics using Borsa, Where Adventurous Travelers and Shippers Find Their Perfect Match!
            </Text>
        </View>

      <View style = {{
         //paddingHorizontal: 20,
          marginBottom: 20,
      }}> 
          <Text style = {{
              fontSize: 18,
              color: 'white',
              fontFamily: "Poppins_400Regular"
          }}>
              Do you want to set up your traveler and/or shipper post now?
          </Text>
      </View>
  
      <View style = {{
          flexDirection: 'row',
          width: '100%',
          //paddingHorizontal: 30,
      }}>
          <Pressable onPress={updateStatusandAddPost}
          
        style = {{
              backgroundColor: "#13b955",
              borderRadius: 8,
              marginHorizontal: 5,
              paddingHorizontal: 12,
              paddingVertical: 3,
          }}>
  
              <Text style = {{
                  color: 'white',
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 18,
              }}>
                  Yes
              </Text>
  
          </Pressable>
          <Pressable onPress={onlyUpdateStatus}
            style = {{
                borderStyle: 'solid',
                borderWidth: 0.5,
                borderColor: '#fff',
                marginHorizontal: 5,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 8,
            }}>
               <Text style = {{
                  color: 'white',
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 18,
              }}>
                  Skip
              </Text>
  
          </Pressable>
      </View>
  
     
  
      </LinearGradient>
    )
}

export default WelcomeAddPost