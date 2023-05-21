import { View, Text, StyleSheet, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"

const Welcome2 = () => {
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)
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
        <View style = {{
            marginBottom: 40,
        }}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
        </View>
        <View style = {{
        marginBottom: 30,
    }}>
            <Text style = {{
                fontSize: 25,
                color: 'white',
                fontFamily: "Poppins_400Regular"
            }}>
                Borsa is a messaging platform that connects travelers with extra luggage space to shippers that want items delivered.
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
          <Pressable onPress={() => navigation.navigate('AddPost')}
          
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
          <Pressable 
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

export default Welcome2