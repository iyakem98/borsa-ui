import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView, Alert, Modal, TouchableOpacity, SafeAreaView} from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import moment from 'moment'
import Buyer from '../ConnectScreen/Buyer'
import TravelerCard from '../ConnectScreen/Traveler'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const data = [
  { id: '0', imageSource: require('../../../assets/images/avatars/blank-avatar.png') },
  { id: '1', imageSource: require('../../../assets/images/avatars/bottts1.png') },
  { id: '2', imageSource: require('../../../assets/images/avatars/bottts2.png') },
  { id: '3', imageSource: require('../../../assets/images/avatars/bottts3.png') },
  { id: '4', imageSource: require('../../../assets/images/avatars/bottts4.png') },
  { id: '5', imageSource: require('../../../assets/images/avatars/bottts5.png') },
  { id: '6', imageSource: require('../../../assets/images/avatars/bottts6.png') },
  { id: '7', imageSource: require('../../../assets/images/avatars/bottts7.png') },
  { id: '8', imageSource: require('../../../assets/images/avatars/bottts8.png') },
  { id: '9', imageSource: require('../../../assets/images/avatars/bottts9.png') },
  { id: '10', imageSource: require('../../../assets/images/avatars/bottts10.png') },
  { id: '11', imageSource: require('../../../assets/images/avatars/bottts11.png') },
  { id: '12', imageSource: require('../../../assets/images/avatars/bottts12.png') },
  { id: '13', imageSource: require('../../../assets/images/avatars/bottts13.png') },
  { id: '14', imageSource: require('../../../assets/images/avatars/bottts14.png') },
  { id: '15', imageSource: require('../../../assets/images/avatars/bottts15.png') },
  { id: '16', imageSource: require('../../../assets/images/avatars/bottts16.png') },
  { id: '17', imageSource: require('../../../assets/images/avatars/bottts17.png') },
  { id: '18', imageSource: require('../../../assets/images/avatars/bottts18.png') },
  { id: '19', imageSource: require('../../../assets/images/avatars/bottts19.png') },
  { id: '20', imageSource: require('../../../assets/images/avatars/bottts20.png') },
  // Add more images as needed
];





const ProfileScreen = ({navigation}) => {

  const { user} = useSelector((state) => state.auth)


 const [selectedTab, setSelectedTab] = useState(1)


    const route = useRoute()

    const [b, setB] = useState([])
    const [t, setT] = useState([])

    const [buyerHeight, setBuyerHeight] = useState(500)

    const getCards = async (i) => {
       
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        await axios.get(`http://143.198.168.244/api/travels/${i}`, config)
          .then((data) => { 
            console.log("tttttttttttttttt:", data.data.data)
          
              setT(data.data.data)
            
          }).catch((err) => {
            console.log("error fetching traveler card", err)
          });
         
        await axios.get(`http://143.198.168.244/api/buyers/${i}`, config)
          .then((data) => {
           
              setB(data.data.data)
              let cards = data.data.data.length
              // let h = cards*445
              setBuyerHeight(cards % 2 !==0 ? cards*445 : cards*400)
                console.log("heightttttt is", h, cards)
        }).catch((err) => {
          console.log("error fetching buyer card", err)
        }); 
        console.log("heyy")
      
      }

      const getImageSourceById = (id) => {
        const item = data.find((item) => item.id === id);
        return item ? item.imageSource : null;
      };

    useEffect(() => {
        console.log("user is", route.params.theUser)
        getCards(route.params.theUser._id)
       },[])

    return (
       
        <View style = {{
            //paddingVertical: 30,
            backgroundColor: "white"
        }}>
             <View>
             <LinearGradient 
                        colors={['#705c9d','#593196']}
                        style = {{
                            //height: "100%",
                            //alignItems: 'center',
                            paddingTop: 30,
                            paddingHorizontal: 20,
                            paddingBottom: 50,
                            //justifyContent: 'center'
                }}>
                    <View style = {{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                     <Image source={getImageSourceById(route.params.theUser?.profilePic)} style={{ 
                        width: 120,
                        height: 120,
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
                                // marginBottom: 2,
                                fontFamily: "Poppins_400Regular",
                                color: 'white'
                            }}>
                                {route.params.theUser?.firstName + ' ' + route.params.theUser?.lastName}
                            </Text>
                            <View style = {{
                                //backgroundColor: '#593196',
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                borderRadius: 20,
                            }}>
                                <Text style = {{
                                color: '#fff',
                                fontFamily: "Poppins_400Regular"
                                }}>
                                  {route.params.theUser?.email}
                                </Text>
                            </View>
                            
                        </View>
                        
                    </View>
                </LinearGradient>
         <View>
        
         </View>
         <View style={{
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
    //   width: width - 30,
      backgroundColor: "#eee",
      padding: 10,
      borderRadius: 10
    }}>
      <Pressable style={{
          backgroundColor: selectedTab === 1 ? "#fff" : "#eee",
          borderRadius: 5,
          width: "33%",
          paddingVertical: 13,
          alignItems: "center"
      }} onPress={()=>{
          setSelectedTab(1)
      }}>
          <Text style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14
          }}>Profile</Text>
      </Pressable>
      <Pressable style={{
          backgroundColor: selectedTab === 2 ? "#fff" : "#eee",
          borderRadius: 5,
          width: "33%",
          paddingVertical: 13,
          alignItems: "center"
      }} onPress={()=>{
        setSelectedTab(2)
      }}>
          <Text style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14
          }}>Travels</Text>
      </Pressable>

      <Pressable style={{
          backgroundColor: selectedTab === 3 ? "#fff" : "#eee",
          borderRadius: 5,
          width: "33%",
          paddingVertical: 13,
          alignItems: "center"
      }} onPress={()=>{
        setSelectedTab(3)
      }}>
          <Text style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14
          }}>Shippings</Text>
      </Pressable>

    </View>
                
        </View>
    
       <View>
          {
            selectedTab == 1 && 
            // <View style={{
            //     backgroundColor:"transparent",
            //     marginTop:10
            // }}>
            //     <View style={{flexDirection:"row", marginTop:15, marginLeft:10}}>
            //     <AntDesign name="user" size={30} color="black" />
            //     <Text style={{marginLeft:20, fontFamily:"poppins", fontSize:21, letterSpacing:1.4}}>
            //         {route.params.theUser.firstName+' '+route.params.theUser.lastName}
            //     </Text>
            //     </View>

            //     <View style={{flexDirection:"row", marginTop:15, marginLeft:10}}>
            //     <Entypo name="email" size={30} color="black" />
            //     <Text style={{marginLeft:20, fontFamily:"poppins", fontSize:21, letterSpacing:1.4}}>
            //         {route.params.theUser.firstName+' '+route.params.theUser.lastName}
            //     </Text>
            //     </View>

            //     <View style={{flexDirection:"row", marginTop:15, marginLeft:10}}>
            //     <MaterialIcons name="date-range" size={30} color="black" />
            //     <Text style={{marginLeft:20, fontFamily:"poppins", fontSize:21, letterSpacing:1.4}}>
            //         {'Borsa user since '+ moment(route.params.theUser.createdAt).format("MMM YYYY")}
            //     </Text>
            //     </View>

            // </View>
            <ScrollView style = {styles.v2b}>
                <View style = {{
                     paddingVertical: 5,
                     paddingHorizontal: 20,
                }}>
               

                <View style = {{
                    marginTop: 15,
                }}>
                    <View style = {styles.myRow}>

                    <View 
                        style = {styles.press}>
                        <View style = {styles.pressView1}>
                        <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: 'orange',
                            backgroundColor: '#7267e7',
                            backgroundColor: "#593196",
                            backgroundColor: '#e8e8e8',
                            backgroundColor: 'white',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 10,
                        }}>
                            <MaterialIcons name="account-circle" size={24} color="black" /> 
                        </View>
                       
                        <Text style = {{
                            fontSize: 17,
                            fontFamily: "Poppins_400Regular"
                        }}>
                            {route.params.theUser.firstName+' '+route.params.theUser.lastName}
                            </Text>
                        </View>
                        
                            {/* <AntDesign name="caretright" size={22} color="lightgray" /> */}
                    </View>

                    <View
                    style = {styles.press}>
                        <View style = {styles.pressView1}>
                            <View style = {{
                            backgroundColor: '#a991d4',
                            backgroundColor: "#593196",
                            //backgroundColor: '#7267e7',
                            backgroundColor: '#e8e8e8',
                            backgroundColor: 'white',
                            padding: 8,
                            borderRadius: 50,
                            marginRight: 10,
                        }}>
                        <Entypo name="email" size={24} color="black" />
                        </View>
    
                        <Text style = {{
                            fontSize: 17,
                            fontFamily: "Poppins_400Regular"
                        }}>
                            {route.params.theUser.email}
                            </Text>  
                            </View>
                            {/* <AntDesign name="caretright" size={22} color="lightgray" /> */}
                </View>

                   
                   
                    </View>

                   <View style = {styles.myRow}>
                  
                    </View>

                    <View style = {styles.myRow}>

                    
                <View
                        style = {styles.press}>
                            <View style = {styles.pressView1}> 
                                <View style = {{
                                backgroundColor: '#a991d4',
                                backgroundColor: 'black',
                                backgroundColor: '#7267e7',
                                backgroundColor: "#593196",
                                backgroundColor: '#e8e8e8',
                                backgroundColor: 'white',
                                padding: 8,
                                borderRadius: 50,
                                marginRight: 10,
                            }}>
                                 <MaterialIcons name="date-range" size={24} color="black" />
                            </View>
                        
                            <Text style = {{
                                fontSize: 17,
                                fontFamily: "Poppins_400Regular"
                            }}>
                                 {'Borsa user since '+ moment(route.params.theUser.createdAt).format("MMM YYYY")}
                                </Text>
                                </View>
                    </View>

</View>


                </View>
                </View>
            </ScrollView>
          }

{
            selectedTab == 2 && 
            <SafeAreaView style={{marginTop:20, backgroundColor:"#E8E8E8"}}>
             
                 {
                 t && t.map((travel, index) => (
                     <View key={index} style={{marginLeft:"2.5%", width:"95%"}}>
                         <TravelerCard item={travel} />
                     </View>
                 ))
                 }
 
                 {
                   t.length<1 &&
                   <Text style={{marginTop:30, fontSize:19, textAlign:"center", marginLeft:20}}>No traveler card found.</Text>
                 }
            
             </SafeAreaView>
          }

{
            selectedTab == 3 && 
           <View>
           <ScrollView 
           
          contentContainerStyle={{
            minHeight: buyerHeight
          }} 
           style={{backgroundColor:"#E8E8E8"}}>
            
                {
                b && b.map((buyer, index) => (
                    <Buyer key={index} item={buyer} />
                ))
                }

            </ScrollView>


            {
                  b.length<1 &&
                  <Text style={{marginTop:30, fontSize:19, textAlign:"center", marginLeft:20}}>No shipping card found.</Text>
                }
            </View>
          }

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
        // position: 'absolute',
       // marginTop: 70,
       // borderTopRightRadius: 15,
       // borderTopLeftRadius: 15,
       
    },

    press: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 15,
        // paddingHorizontal: 10,
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
        /*shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2.00,
    
        elevation: 1, */
       
        
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
        borderRadius: 10,
        padding: 20,
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
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 4,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonCloseYes: {
        backgroundColor: 'red',
        marginTop:10,
        //width:200
      },
      buttonCloseNo: {
        backgroundColor: 'green',
        backgroundColor: '#13b955',
        backgroundColor: '#e8e8e8',
        marginTop:10,
        //width:200,
        color:"black"
      },
      textStyle: {
        color: 'white',
        //fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 9,
        textAlign: 'center',
        fontSize: 16,
        
      },
    

})
   
   
   export default ProfileScreen