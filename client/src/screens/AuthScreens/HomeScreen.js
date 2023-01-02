import {View, Text, ImageBackground, Image, SafeAreaView, StyleSheet, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()
  return (
    <View style = {{
        backgroundColor: '#593196',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 120
    }}>
       <View style = {{
            alignItems: 'center'
       }}>
            <Image 
                source = {require ('../../data/logos/lwhiteclearbg.png')} 
                style = {{
                    width: 110,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 6
                }}
                />
            <Text style = {{
                color: 'white',
                fontSize: 18,
                
            }}>
                Borsa!
            </Text>
       </View>
           
        <View style = {{
            alignItems: 'center',
            width: '100%'
        }}>
        <Pressable onPress={() => navigation.navigate('Login')}
            style = {{
            backgroundColor: 'white',
            width: '70%',
            height: '17%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
        }}>
            <Text style = {{
                color: '#593196',
                fontSize: 20
            }}>
                Login
            </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Register')}
            style = {{
            //backgroundColor: 'white',
            width: '70%',
            height: '17%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Text style = {{
            fontSize: 17,
            color: 'white'
        }}>
            Sign up
        </Text>
        </Pressable>
        </View>
    </View>
  )
}

export default HomeScreen