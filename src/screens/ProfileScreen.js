import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ChatState } from '../context/ChatProvider';
import io from 'socket.io-client'
const ProfileScreen = ({navigation}) => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const ENDPOINT = "http://192.168.100.2:5000"
    var socket = io(ENDPOINT)
    const {onlineStatus, setonlineStatus} = ChatState()
    const handleLogout = () => {
        {user && socket.emit("userLogout", {userID: user._id}) }
        dispatch(logout())
        navigate.navigate("Home")
       
    //   socket.disconnect()
        
        // alert(" Logout  Successful");
  
      }
  return (
    
    <View>
         <View>
        <ImageBackground
                source={{
                uri: "https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296",
                }}
                style= {styles.imagebk}
        >
            <View style = {styles.overlay}>
                <Text style = {{
                    color: 'white',
                    fontSize: 30
                }}> 
                    {user && user.firstName + ' ' + user.lastName} 
                </Text>
                <View style = {{
                    flexDirection: 'row',
                    marginBottom: 20,
                    marginLeft: 10,
                }}>
                    <Text style = {{
                        color: 'white',
                        marginTop: 5,
                        fontSize: 14,
                        marginRight: 5
                    }}>
                        {user && user.address}
                    </Text>
                    <Text style = {{
                        fontSize: 20,
                        marginBottom: 0
                    }}>
                    🇨🇦
                    </Text>
                </View>
                <View style = {{
                    flexDirection: 'row',
                }}>
                    {user && user.isTraveler && 
                        <Pressable style = {{
                            backgroundColor: "#13b955",
                            width: "20%",
                            height: "35%",
                            alignItems:'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            borderRadius: 20,
                            marginRight: 12
                        }}>
                           <Text style = {{
                            color: 'white',
                           }}>
                                Traveler
                           </Text>
                        </Pressable>
                        
                    }
                    

                    <Pressable style = {{
                        backgroundColor: "#593196",
                        width: "20%",
                        height: "35%",
                        alignItems:'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                    }}>
                        <Text style = {{
                            color: 'white'
                        }}>
                            Buyer
                        </Text>
                    </Pressable>
                </View>
            </View>
            

        </ImageBackground>
        <View>
            <ScrollView style = {styles.v2b}>
                <View style = {{
                     paddingVertical: 30,
                     paddingHorizontal: 15,
                }}>
                <Text style = {{
                    fontSize: 15,
                    color: 'gray',
                    fontWeight: 'bold'
                }}> 
                    PROFILE
                </Text> 

                <View style = {{
                    marginTop: 15,
                }}>
                    <View style = {styles.grid}>

                    <Pressable onPress={() => navigation.navigate('Account')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: 'orange',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 20,
                        }}>
                            <MaterialIcons name="account-circle" size={24} color="white" /> 
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Account
                            </Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Security')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: 'lightblue',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 20,
                        }}>
                            <MaterialIcons name="security" size={24} color="white" /> 
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Security
                            </Text>
                    </Pressable>
                    </View>

                    <View style = {styles.grid}>
                        
                    <Pressable onPress={() => navigation.navigate('Settings')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: 'gray',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 20,
                        }}>
                           <Feather name="settings" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Settings
                            </Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Contact Us')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: 'lightgreen',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 20,
                        }}>
                            <AntDesign name="phone" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Contact Us
                            </Text>
                    </Pressable>
                    </View>

                    <View style = {{
                        width: "100%",
                        //paddingTop: 20,
                        flexDirection: 'row',
                        //justifyContent: 'space-around',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                        <Pressable onPress={() => navigation.navigate('My Cards')}
                            style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: "#593196",
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 20,
                        }}>
                             <MaterialCommunityIcons name="cards" size={24} color="white" />
                        </View>
                            <Text style = {{
                                fontSize: 17,
                            }}>
                                My Cards
                            </Text>
                            
                        </Pressable>

                        
                    </View>
                    <View style = {{
                        width: "100%",
                        //paddingTop: 20,
                        flexDirection: 'row',
                        //justifyContent: 'space-around',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                        <Pressable onPress={() => handleLogout()}
                            style = {styles.press}>
                        <Text>Logout</Text>
                        
                        </Pressable>
                    </View>


                   {/* 
                     <View style = {styles.grid}>
                        
                    <Pressable onPress={() => navigation.navigate('My Traveler Card')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#13b955',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                          <MaterialIcons name="luggage" size={24} color="#fff" />
                        </View>
                       <View>
                       <Text style = {{
                            fontSize: 16,  
                        }}>
                            My Traveler
                            </Text>
                            <Text style = {{
                            fontSize: 16,
                        }}>
                            Card
                            </Text>
                       </View>
                        
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('My Buyer Card')}
                        style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#593196',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                             <AntDesign name="shoppingcart" size={24} color="#fff" />
                        </View>
                       
                    <View>
                       <Text style = {{
                            fontSize: 17,
                        }}>
                            My Buyer
                            </Text>
                            <Text style = {{
                            fontSize: 17,
                        }}>
                            Card
                            </Text>
                       </View>
                    </Pressable>
                    </View>
                   */}
               {/*   <View style = {{
                    width: "100%",
                    alignItems: 'flex-start',
                    paddingTop: 10, 
                    paddingBottom: 20
                  }}>
                    <Pressable style = {{
                        width: "80%",
                        height: 60,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: 15,
                        borderRadius: 30,
                        flexDirection: 'row',
                        marginBottom: 10,
                        shadowColor: '#13b955',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        
                        shadowOpacity: 0.60,
                        shadowRadius: 1.0,
      
                        elevation: 1,
                                        
                    }}>
                        <View style = {{
                            backgroundColor: '#13b955',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                        <MaterialIcons name="luggage" size={24} color="#fff" />
                        </View>
                        
                        <Text style = {{
                            //color: 'white',
                            fontSize: 17
                        }}>
                            Update traveler card
                        </Text>
                    </Pressable>
                    <Pressable style = {{
                        width: "80%",
                        height: 60,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: 15,
                        borderRadius: 30,
                        flexDirection: 'row',
                        shadowColor: '#a991d4',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        
                        shadowOpacity: 0.60,
                        shadowRadius: 1.0,
      
                        elevation: 1,
                        //borderStyle: 'solid',
                        //borderBottomWidth: StyleSheet.hairlineWidth,
                        //borderRightWidth: StyleSheet.hairlineWidth,
                        
                        
                    }}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                        <AntDesign name="shoppingcart" size={24} color="#fff" />
                        </View>
                        
                        <Text style = {{
                            //color: 'white',
                            fontSize: 17
                        }}>
                            Update buyer card
                        </Text>
                    </Pressable>
                  </View>
                   
                    */}

                </View>
                </View>
               {/* <View style = {{
                    flexDirection: 'row',
                    marginBottom: 20
                }}>
               <FontAwesome name="star" size={24} color="gold" />
                <FontAwesome name="star" size={24} color="gold" />
                <FontAwesome name="star" size={24} color="gold" />
                <FontAwesome name="star" size={24} color="gold" />
                <FontAwesome name="star-half-empty" size={24} color="gold" />
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginLeft: 5,
                    marginTop: 2
                }}>
                    4.5/5
                </Text>
            </View> */}
              
            </ScrollView>
        </View>
            
    </View>
            
    </View>
  )
}

const styles = StyleSheet.create({
    container : {

    },

    imagebk: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        
        

    },

    overlay: {
        flex: 10,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
       // borderTopLeftRadius: 30,
        //borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderStyle: 'solid',
        borderBottomWidth: 10,
        borderColor: "#a991d4",
        //borderColor: "lightgray",
    },
    
    v2a: {
        backgroundColor: '#a991d4',
        width: '100%',
        height: 120,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: -30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    v2b: {
        backgroundColor: 'white',
        width: '100%',
        height: 400,
        position: 'absolute',
       // marginTop: 70,
       // borderTopRightRadius: 15,
       // borderTopLeftRadius: 15,
       
    },

    press: {
        flexDirection: 'row',
        width: '47%',
        marginVertical: 15,
        paddingHorizontal: 10,
        height: 60,
        marginBottom: 8,
        borderStyle: 'solid',
        //borderBottomWidth: 0.7,
        //borderRightWidth: 0.7,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderColor: '#c8c8c8',
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2.00,
    
        elevation: 1, 
       
        
    },

    grid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        textAlignVertical: 'center',
        
    },
    

})

export default ProfileScreen