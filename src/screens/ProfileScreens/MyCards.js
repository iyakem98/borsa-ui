import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { Button } from 'react-native-paper';
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons, Foundation, Entypo, Ionicons } from '@expo/vector-icons';
import MyTravelerCard from '../../components/MyCards/MyTravelerCard';
import MyBuyerCard from '../../components/MyCards/MyBuyerCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { useRoute } from '@react-navigation/native'



const MyCards = ({navigation}) => {

    const [myTCards, setMyTCards] = useState([])
    const [myBCards, setMyBCards] = useState([])
    const [loading, setLoading] = useState(true)

    const route = useRoute()

    const { user} = useSelector(
        (state) => state.auth
      )

    const getMyCards = async() => {
        console.log("just fetching my cards", user)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
              }}
      
          await axios.get(`http://143.198.168.244/api/travels/my`, config)
              .then((data) => {
               console.log("found these t cards", data.data.data)
               setMyTCards(data.data.data)
               })
              .catch((err) => {
                console.log("error", err)
              });

              await axios.get(`http://143.198.168.244/api/buyers/my`, config)
              .then((data) => {
               console.log("found these b cards", data.data.data)
               setMyBCards(data.data.data)
               })
              .catch((err) => {
                console.log("error", err)
              });
    }

    useEffect(() => {
            getMyCards()
            console.log("my cards")
        },[])

  return (
    <View style = {{
        height: "100%",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: "5%"
    }}>

        {/* <View style = {{
            width: '100%',
            height: '30%',
            alignItems: 'center',
            marginBottom: 50,
        }}>
       <Text
       style={{
        marginTop: "40%"
       }}
       >No card found. Cards you post will appear here.</Text>
       <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "80%",
                    marginTop:20
                }} 
                onPress={()=>{
                    navigation.navigate("New Post")
                }}
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>Post a Card</Text>
                </Pressable>
        </View> */}


        <Text style={{marginBottom:5, fontSize:18, letterSpacing:1.5}}>Traveler Cards</Text>
        
            
        <ScrollView
              horizontal 
              >

{
               myTCards.length>0 && myTCards.map((travel, index) => (
                   <View key={index} style={{
                    width:300,
                    borderRadius:10,
                    marginLeft:20,
                    backgroundColor:"green",
                    height:"auto"
                   }}>
                    <View style={{
                        padding:5
                    }}>

                <Text style={{textAlign:"right"}}>
                <MaterialIcons name="delete" size={24} color="white" />
                
                </Text>

                    <Text style={{textAlign:"left", marginTop:20, fontSize:18, color:"white"}}>
                    {"  "}

                    <MaterialIcons name="flight" size={24} color="white" />
                        {" "+travel.departure.split(",")[0]+"   "} 
                        <MaterialIcons name="flight-takeoff" size={24} color="white" />
                         {"   "+travel.destination.split(",")[0]}
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <MaterialIcons name="date-range" size={24} color="white" />
                        {"  "+moment(travel.departureDate).format("DD-MM-YY")} 
                        
                        </Text> 


                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <MaterialIcons name="luggage" size={26} color="white" />
                        {"  "+travel.luggageSpace} kg 
                        
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <AntDesign name="infocirlce" size={22} color="white" />
                        {"  "+travel.status} 
                        
                        </Text> 

                       

                    </View>
                    </View>
                ))
            }

                   <View style={{
                    width:300,
                    borderRadius:10,
                    marginLeft:20,
                    backgroundColor:"green",
                    alignItems:"center",
                    justifyContent:"center"
                   }}>
                    
                        <Text style={{
                            textAlign:"center",
                            fontSize:15,
                            color:"white"
                        }}>
                            Add new traveler card.
                        </Text>

                        <Pressable style={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    width: 30,
                    height:30,
                    marginTop:10
                }} 
                onPress={()=>{
                    navigation.navigate("New Post")
                }}
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>
                        <Ionicons name="md-add" size={24} color="green" />
                    </Text>
                </Pressable>

                  
                    </View>

</ScrollView>

<Text style={{marginBottom:5, fontSize:18, letterSpacing:1.5, marginTop:10}}>Buyer Cards</Text>
             
              <ScrollView
              horizontal 
              >

            {
                myBCards.map((buyer, index) => (
                   <View key={index} style={{
                    width:300,
                    borderRadius:10,
                    marginLeft:20,
                    backgroundColor:"#593196",
                    height:"auto"
                   }}>
                    <View style={{
                        padding:5
                    }}>

                <Text style={{textAlign:"right"}}>
                <MaterialIcons name="delete" size={24} color="white" />
                
                </Text>

                    <Text style={{textAlign:"left", marginTop:20, fontSize:18, color:"white"}}>
                    {"  "}

                    <MaterialIcons name="flight" size={24} color="white" />
                        {" "+buyer.departure.split(",")[0]+"   "} 
                        <MaterialIcons name="flight-takeoff" size={24} color="white" />
                         {"   "+buyer.destination.split(",")[0]}
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <MaterialIcons name="date-range" size={24} color="white" />
                        {"  "+moment(buyer.startDate).format("DD-MM-YY")} 
                        
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"   "}
                        <FontAwesome5 name="calendar-times" size={22} color="white" />
                        {"  "+moment(buyer.endDate).format("DD-MM-YY")} 
                        
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <Foundation name="shopping-bag" size={22} color="white" />
                        {"  "+buyer.item[0]} 
                        
                        </Text> 

                        <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"white"}}>
                        {"  "}
                        <MaterialIcons name="description" size={24} color="white" />
                        {"  "+buyer.description} 
                        
                        </Text> 

                       

                    </View>
                    </View>
                ))
            }


<View style={{
                    width:300,
                    borderRadius:10,
                    marginLeft:20,
                    backgroundColor:"#593196",
                    alignItems:"center",
                    justifyContent:"center"
                   }}>
                    
                        <Text style={{
                            textAlign:"center",
                            fontSize:15,
                            color:"white"
                        }}>
                            Add new buyer card.
                        </Text>

                        <Pressable style={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    width: 30,
                    height:30,
                    marginTop:10
                }} 
                onPress={()=>{
                    navigation.navigate("New Post", {
                        cardToAdd: "buyer"
                    })
                }}
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>
                        <Ionicons name="md-add" size={24} color="#593196" />
                    </Text>
                </Pressable>

                  
                    </View>

             </ScrollView>
        
    </View>
  )
}

export default MyCards