import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView, Alert, Modal, TouchableOpacity} from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ChatState } from '../context/ChatProvider';
import io from 'socket.io-client'
import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const ProfileScreen = ({navigation}) => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const ENDPOINT = "http://192.168.100.2:5000"
    var socket = io(ENDPOINT)
    const {onlineStatus, setonlineStatus} = ChatState()
    const handleLogout = () => {
        {user ? socket.emit("userLogout", {userID: user._id}) : (null)}
        dispatch(logout())
        // navigate.navigate("Login")
    }

      const [modalVisible, setModalVisible] = useState(false)

      const deleteAcc = async () => {
       
         axios.delete(`${API_BASE_URL}users/${user._id}`)
         await AsyncStorage.removeItem("user")
        .then((data) => {
            alert("Deleted.")
            handleLogout()
         })
        .catch((err) => {
          console.log("error is", err)
          alert("No")
        });
    }

    const showConfirmDialog = () => {
        // return Alert.alert(
        //   "Are your sure?",
        //   "Are you sure you want to remove this beautiful box?",
        //   [
        //     // The "Yes" button
        //     {
        //       text: "Yes",
        //     //   onPress: () => {
        //     //     setShowBox(false);
        //     //   },
        //     },
        //     // The "No" button
        //     // Does nothing but dismiss the dialog when tapped
        //     {
        //       text: "No",
        //     },
        //   ]
        // );
        alert('ok')
      };

  return (
    
    <View style = {{
        paddingVertical: 70,
        backgroundColor: "white"
    }}>
         <View>
            <View style  = {styles.profileTop}>
                <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                 <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/800px-Male_Avatar.jpg?20201202061211" }} style={{ 
                    width: 130,
                    height: 130,
                    marginTop:0,
                    // borderRadius: "100%",
                    borderRadius: 100,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    }} />
                    <View style = {{
                         marginLeft: 20
                    }}>
                        <Text style = {{
                            fontSize: 25,
                            marginTop: 20,
                            marginBottom: 5
                        }}>
                            {user.firstName + ' ' + user.lastName}
                        </Text>
                        <View style = {{
                            //backgroundColor: '#593196',
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            borderRadius: 20
                        }}>
                            <Text style = {{
                                //color: '#fff'
                            }}>
                               {`borsa user since: 12/12/12`}
                            </Text>
                        </View>
                        
                    </View>
                    
                </View>
            </View>
      {/*  <ImageBackground
                source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/800px-Male_Avatar.jpg?20201202061211",
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
                    {/* <Text style = {{
                        fontSize: 20,
                        marginBottom: 0
                    }}>
                    🇨🇦
                    </Text> 
                </View>
               {/* <View style = {{
                    flexDirection: 'row',
                }}>
                    {user && user.isTraveler && 
                        <Pressable style = {{
                            backgroundColor: "#13b955",
                            width: "20%",
                            height: "45%",
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
                        height: "45%",
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
            

                </ImageBackground> */}
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
                    PROFILE AND SETTINGS
                </Text> 

                <View style = {{
                    marginTop: 15,
                }}>
                    <View style = {styles.myRow}>

                    <Pressable onPress={() => navigation.navigate('Account')}
                        style = {styles.press}>
                        <View style = {styles.pressView1}>
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
                        </View>
                        
                            <AntDesign name="caretright" size={22} color="lightgray" />
                    </Pressable>
                   {/* <Pressable onPress={() => navigation.navigate('Security')}
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
                    </Pressable> */}
                    </View>

                   <View style = {styles.myRow}>
                        
                   {/* <Pressable onPress={() => navigation.navigate('Settings')}
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
                    </Pressable> */}
                    <Pressable onPress={() => navigation.navigate('Contact Us')}
                        style = {styles.press}>
                            <View style = {styles.pressView1}> 
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
                                </View>
                                <AntDesign name="caretright" size={22} color="lightgray" />
                    </Pressable>
                    </View>

                    <View style = {styles.myRow}>

                    <Pressable onPress={() => navigation.navigate('My Cards')}
                    style = {styles.press}>
                        <View style = {styles.pressView1}>
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
                            </View>
                            <AntDesign name="caretright" size={22} color="lightgray" />
                </Pressable>
                <Pressable onPress={() => handleLogout()}
                        style = {styles.press}>
                            <View style = {styles.pressView1}> 
                                <View style = {{
                                backgroundColor: '#a991d4',
                                backgroundColor: 'black',
                                padding: 8,
                                borderRadius: 50,
                                marginRight: 20,
                            }}>
                                <MaterialIcons name="logout" size={24} color="white" />
                            </View>
                        
                            <Text style = {{
                                fontSize: 17,
                            }}>
                                Log out
                                </Text>
                                </View>
                    </Pressable>
                
<TouchableOpacity onPress={() => {
    setModalVisible(true)
}}
    style = {styles.press}>
        <View style = {styles.pressView1}>
            <View style = {{
            backgroundColor: '#a991d4',
            backgroundColor: 'lightblue',
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 50,
            marginRight: 20,
        }}>
        <AntDesign name="deleteuser" size={24} color="white" />
        </View>
    
        <Text style = {{
            fontSize: 17,
            whiteSpace:"nowrap"
        }}>
            Delete Account
            </Text>
        </View>
    
</TouchableOpacity>
</View>


                {/*    <View style = {{
                        width: "100%",
                        marginTop: 30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        
                    }}>
                        <Pressable onPress={() => handleLogout()}
                            >
                        <Text style={{textAlign:"center", fontSize:18}}>Logout</Text>
       
                        
                        </Pressable>

                        
                        
                </View> */}

                   


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

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete your account? This action can not be reversed.</Text>
            
            <Pressable
              style={[styles.button, styles.buttonCloseYes]}
              onPress={() => deleteAcc()}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonCloseNo]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     
    </View>
            
    </View>
  )
}

const styles = StyleSheet.create({
    container : {

    },

    profileTop: {
        paddingHorizontal: 30,
        backgroundColor: 'white'
    },

    imagebk: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        
        

    },

    overlay: {
        flex: 1,
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
        height: 700,
        position: 'absolute',
       // marginTop: 70,
       // borderTopRightRadius: 15,
       // borderTopLeftRadius: 15,
       
    },

    press: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 100,
        //height: 60,
        marginBottom: 8,
        borderStyle: 'solid',
        //borderBottomWidth: 0.7,
        //borderRightWidth: 0.7,
        backgroundColor: '#fff',
        //borderRadius: 30,
        borderColor: '#c8c8c8',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
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

    myRow: {
    },

    pressView1: {
        flexDirection: 'row', 
        alignItems: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonCloseYes: {
        backgroundColor: 'red',
        marginTop:10,
        width:200
      },
      buttonCloseNo: {
        backgroundColor: 'green',
        marginTop:10,
        width:200,
        color:"black"
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 18,
        textAlign: 'center',
      },
    

})

export default ProfileScreen