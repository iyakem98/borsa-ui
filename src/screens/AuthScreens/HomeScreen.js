import {View, Text, ImageBackground, Image, SafeAreaView, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation()

    useEffect(() => {  
        setInterval(function(){setIsLoading(!isLoading)},4000);
     }, [])

  return (
    <View style = {{
        backgroundColor: '#593196',
        height: "100%",
        alignItems: 'center',
        justifyContent: '',
        paddingTop: 40
    }}>
       
    <View style={{ display:`${isLoading ? "none" : ""}`}}>
       <View style = {{
            alignItems: 'center',
            marginTop:20
       }}>
            <Image 
                source = {require ('../../data/logos/lwhiteclearbg.png')} 
                style = {{
                    width: 110,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 3
                }}
                />
          
            <Text 
                style={{
                    display:"flex", 
                    justifyContent:"center",
                    fontSize:29,
                    color:"#fff",
                    letterSpacing:6,
                    fontWeight:700,
                    }}>BORSA</Text>
       </View>

       <View 
       style={{marginTop:"60%"}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}
            style={{
                backgroundColor: 'white',
                width: '200px',
                height: '47px',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
                letterSpacing:2

            }}>
                Login
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}
            style={{
                backgroundColor: 'green',
                color:"#fff",
                width: '200px',
                height: '47px',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
                letterSpacing:2
            }}>
                Sign Up
            </TouchableOpacity>
       </View>

       <View style={{
        marginTop:20,
        textAlign:"center",
        letterSpacing:4
    }}>
        <Text style={{color:"white", marginBottom:20}}>OR CONTINUE WITH</Text>
            <View style={{
                display:"flex",
                flexDirection:"row"
            }}
            >
                 <TouchableOpacity onPress={() => navigation.navigate('LoginWithGoogle')}
            style={{
                backgroundColor: 'white',
                color:"#fff",
                width: '80px',
                height: '47px',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
                letterSpacing:2
            }}>
                <Image 
                source = {require ('../../../assets/images/google.png')} 
                style = {{
                    width: 24,
                    height: 24,
                   
                }}
                />
            
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('LoginWithFacebook')}
            style={{
                backgroundColor: 'white',
                color:"#fff",
                width: '80px',
                height: '47px',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
                letterSpacing:2,
                marginLeft:30
            }}>
                 <Entypo name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            
           
            </View>
        
    </View>

    </View>

   

    <View style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)",
        display:`${isLoading ? "" : "none"}`
       }}>

        <Image 
                source = {require ('../../data/logos/lwhiteclearbg.png')} 
                style = {{
                    width: 110,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 3,
                   
                }}
                />
                <br></br>
                <Text 
                style={{
                    display:"flex", 
                    justifyContent:"center",
                    fontSize:29,
                    color:"#fff",
                    letterSpacing:6,
                    fontWeight:700,
                    }}>BORSA</Text>
        
        </View> 
    </View>
  )
}

export default HomeScreen