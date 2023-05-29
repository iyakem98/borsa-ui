import { View, Text, StyleSheet, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const WelcomeProPic = () => {
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)
  return (
    <LinearGradient 
    colors={['#705c9d','#593196']}
    style = {{
        height: "100%",
        //alignItems: 'center',
        paddingTop: 150,
        paddingHorizontal: 15,
        //justifyContent: 'center'
    }}>

    <View style = {{
        //paddingRight: "35%",
        marginBottom: 20,
    }}>
        <Text style = {{
            fontSize: 30,
            color: 'white',
            fontFamily: "Poppins_400Regular"
        }}>
            Hello {user?.firstName},
        </Text>
    </View>
    <View style = {{
        marginBottom: 60,
    }}>
        <Text style = {{
            fontSize: 35,
            color: 'white',
            fontFamily: "Poppins_400Regular"
        }}>
            Welcome to Borsa!
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
            Do you want to choose an avatar for your profile picture?
        </Text>
    </View>

    <View style = {{
        flexDirection: 'row',
        width: '100%',
        //paddingHorizontal: 30,
    }}>
        <Pressable style = {{
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
        <Pressable onPress={() => navigation.navigate('WelcomePost')}
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

export default WelcomeProPic