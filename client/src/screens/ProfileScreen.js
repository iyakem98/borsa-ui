import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';


const ProfileScreen = () => {
  return (
    <View>
        <ImageBackground
                source={{
                uri: "https://www.usmagazine.com/wp-content/uploads/2021/01/The-Weeknd-Save-Your-Tears-Plastic-Surgery-Look-Is-Prosthetics-Feature.jpg?w=700&quality=86&strip=all",
                }}
                style= {styles.imagebk}
        >
            <View style = {styles.overlay}>
                <Text style = {{
                    color: 'white',
                    marginBottom: 5,
                    marginLeft: 10,
                    fontSize: 30
                }}>
                    Abel Tesfaye
                </Text>
                <View style = {{
                    flexDirection: 'row',
                    marginBottom: 40,
                    marginLeft: 15,
                }}>
                    <Text style = {{
                        color: 'white',
                        marginTop: 5,
                        fontSize: 14,
                        marginRight: 5
                    }}>
                        Toronto, Canada 
                    </Text>
                    <Text style = {{
                        fontSize: 20,
                        marginBottom: 10
                    }}>
                    🇨🇦
                    </Text>
                </View>
                
            </View>
            

        </ImageBackground>
        <View>
            <View style = {styles. v2a}>
                    <View>
                    <Text style = {{
                        fontSize: 30,
                        //fontWeight: "bold",
                        
                    }}>
                    Buyer
                    </Text>

                    <Text>
                        Joined 12/12/2022
                    </Text>
                </View>
              

                <Pressable style = {{
                    backgroundColor: '#17141f',
                    width: '35%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderRadius: 50,
                    // borderRadius: 20,
                   // borderStyle: 'solid',
                    //borderWidth: 1,
                    marginTop: 3
                    

                }}>
                    <Text style = {{
                        fontSize: 18,
                        color: "white"
                    }}>
                        Update
                    </Text>
                </Pressable>
            </View>
            <ScrollView style = {styles.v2b}>
                <View style = {{
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

                </View>
                <Text style = {{
                    fontSize: 15,
                    color: 'lightgray',
                    fontWeight: 'bold'
                }}>
                    PROFILE
                </Text>

                <View style = {{
                    marginTop: 15,
                }}>
                    <View style = {styles.grid}>
                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: 'orange',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                            <FontAwesome name="history" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Orders
                            </Text>
                    </Pressable>
                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: 'lightgreen',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                            <FontAwesome5 name="money-bill-wave" size={19} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Bidding
                            </Text>
                    </Pressable>
                    </View>

                    <View style = {styles.grid}>
                        
                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: 'red',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                            <MaterialIcons name="payment" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Payment
                            </Text>
                    </Pressable>
                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: 'lightblue',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                            <AntDesign name="phone" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Contact
                            </Text>
                    </Pressable>
                    </View>

                    <View style = {styles.grid}>
                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            padding: 8,
                            borderRadius: "50%",
                            marginRight: 20,
                        }}>
                            <MaterialIcons name="favorite-border" size={24} color="white" />
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                        }}>
                            Favorites
                            </Text>
                    </Pressable>

                    <Pressable style = {styles.press}>
                        <View style = {{
                            backgroundColor: 'gray',
                            padding: 8,
                            borderRadius: "50%",
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
                    </View>
                   
                   

                </View>
            </ScrollView>
        </View>
            
    </View>
  )
}

const styles = StyleSheet.create({
    container : {

    },

    imagebk: {
        width: "100%",
        height: 400,
        justifyContent: 'flex-end'

    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        marginTop: 70,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 15
    },

    press: {
        flexDirection: 'row',
        width: '40%',
        height: 80,
        marginBottom: 8,
        borderStyle: 'solid',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        borderColor: '#c8c8c8',
        paddingVertical: 5,
        alignItems: 'center',
       
        
    },

    grid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        textAlignVertical: 'center',
        
    },

    

})

export default ProfileScreen