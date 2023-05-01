import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw'
import ErrorUnDraw from '../../assets/svg/errorUnDraw'
import {registerSheet} from 'react-native-actions-sheet';
import BottomSheet from '../../components/BottomSheet'
import SheetManager from 'react-native-actions-sheet';
import moment from 'moment'

const width = Dimensions.get("screen").width

const ConnectScreen = () => {
  registerSheet('example-two', <BottomSheet />);

  const [bottomSheetData, setBottomSheetData] = useState(null)
  const [selectedTab, setSelectedTab] = useState(1)
  const { consumers } = useSelector(
    (state) => state.auth
  )
  const snapPoints = useMemo(() => ['80%', '80%'], []);
  const { travelers} = useSelector(
    (state) => state.auth
  )
  
  const { user} = useSelector(
    (state) => state.auth
  )
  const { fetchAgain, setfetchAgain,
    chatSelected, setchatSelected, } = ChatState()
  
    const dispatch = useDispatch()
    const [isBuyer, setIsBuyer] = useState(false)
    const [isTraveler, setIsTraveler] = useState(false)
    const navigation = useNavigation();
    function tweakBuyer() {
        setIsBuyer(false)
        // console.log(isBuyer)
    }

    function tweakBuyer2() {
        setIsBuyer(true)
        // console.log(isBuyer)
    }
    useEffect(() => {
      navigation.addListener('focus', getUsers)
      // UpdateUserRoute()
     //  console.log(route.name)
       // setImage(null)
      },[travelers, consumers])
  
    // const getConsumers = async () => {
    //   try{
    //     const {data} = await axios.get('http://192.168.100.2:5000/api/users/consumers')
    //     console.log(data)
    //     setConsumers(data)
    // setConsumers((state) => {
    //   // console.log(state)
    //   return state
    // })
        

    //   }
    //   catch(error){
    //     console.log('error in getting customers')
    //   }
         
    //     }
    const [t, setT] = useState([])
    const [b, setB] = useState([])

    const [loading, setloading] = useState(true)

    const getUsers = async () => {

      const config = {
      headers: {
          Authorization: `Bearer ${user.token}`
        }}

    await axios.get(`http://143.198.168.244/api/travels/my`, config)
        .then((data) => {
          
          // console.log("tttttttttttttttt:", t)
         setT(data.data.data)
         })
        .catch((err) => {
         setT(null)
        });
     
        await axios.get(`http://143.198.168.244/api/buyers/my`, config)
        .then((data) => {
          // console.log("bbbbbbbbbbbbb:", b)
         setB(data.data.data)
         })
        .catch((err) => {
          setB(null)
        });

        setloading(false)
    }
        // useEffect(() => {
        //   //  dispatch(getTravelers())
        //   //  console.log(travelers)
        //   //  dispatch(getConsumers())
        //   //  getUsers()
        //   //  console.log(consumers)
        //   //  console.log(isBuyer)
        //   // console.log("my travelerrrrrrrs are:", travelers)
        //   // console.log("my buyerrrrrrrrs are:", consumers)
        //   let u = AsyncStorage.getItem('user')
        //   console.log("userrrrrr:", user)
        // }, [travelers, consumers])
        
  return (
  //  <ScrollView>
  //  {travelers  && travelers.map((traveler) => (
  //   <View key={traveler._id}>
  //     <TravelerCard  traveler={traveler} />
  //   </View>
    
  //  ))}
  //  </ScrollView>
  // <ScrollView>
  <SafeAreaView style={styles.container}>
    <View style={{
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 15
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        width: width - 30,
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 10
      }}>
        <Pressable style={{
            backgroundColor: selectedTab === 1 ? "#fff" : "#eee",
            borderRadius: 5,
            width: "49%",
            paddingVertical: 13,
            alignItems: "center"
        }} onPress={()=>{
            isBuyer ? setIsBuyer(false) : null
            setSelectedTab(1)
        }}>
            <Text style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14
            }}>Traveler</Text>
        </Pressable>
        <Pressable style={{
            backgroundColor: selectedTab === 2 ? "#fff" : "#eee",
            borderRadius: 5,
            width: "49%",
            paddingVertical: 13,
            alignItems: "center"
        }} onPress={()=>{
          !isBuyer ? setIsBuyer(true) : null
          setSelectedTab(2)
        }}>
            <Text style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 14
            }}>Buyer</Text>
        </Pressable>
      </View>
    </View>
    {loading ? (
      <View style={{
          paddingTop: 20
      }}>
        <ActivityIndicator size="large" color="#777" />
      </View>
    ) : (selectedTab === 2 && b && b.length > 0) || (selectedTab === 1 && t && t.length > 0) ? (
      <View style = {{backgroundColor: "white", paddingVertical: 0}}>         
        {isBuyer ? (
          <View style={{
            alignItems: "center",
            paddingTop: 60
          }}>
            <EmptyUnDraw />
            <Text style={{
              fontFamily: "Poppins_500Medium",
              marginTop: 20,
              textAlign: "center",
              fontSize: 16
            }}>No traveler card found.</Text>
          </View>
        ) : (
            <View style = {{
                paddingHorizontal: 10,
                backgroundColor: 'white'
              }}>
                <ScrollView
                  horizontal
                  style={{marginTop:"25%"}} 
                  >
    
    {
                   t.length>0 && t.map((travel, index) => (
                       <View key={index} style={{
                        width:300,
                        borderRadius:10,
                        marginLeft:20,
                        backgroundColor:"green",
                        height:300,
                        padding:30
                       }}>
                        <View style={{
                            padding:5
                        }}>
    
                    <Text style={{textAlign:"right"}}>
                    {/*<MaterialIcons name="delete" size={24} color="white" /> */}
                    
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
              </View>
        )}
      </View>
    ) : (selectedTab === 2 && b && b.length === 0) || (selectedTab === 1 && t && t.length === 0) ? (
        <View style={{
            alignItems: "center",
            paddingTop: 60
          }}>
            <EmptyUnDraw />
            <Text style={{
              fontFamily: "Poppins_500Medium",
              marginTop: 20,
              textAlign: "center",
              fontSize: 16
            }}>No buyer card found.</Text>
          </View>
    ) : (
        <View style = {{
            paddingHorizontal: 10,
            backgroundColor: 'white'
          }}>
            <ScrollView
              horizontal
              style={{marginTop:"25%"}} 
              >

{
               b.length>0 && b.map((buyer, index) => (
                <View key={index} style={{
                    width:300,
                    borderRadius:10,
                    marginLeft:20,
                    backgroundColor:"#593196",
                    height:300,
                    padding:30
                   }}>
                    <View style={{
                        padding:5
                    }}>

                <Text style={{textAlign:"right"}}>
                {/*<MaterialIcons name="delete" size={24} color="white" />*/}
                
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
          </View>
    )}
  </SafeAreaView>
  )
}

export default ConnectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pressActiveB: {
      //backgroundColor: '#593196',
      //borderRadius: 30,
      padding: 10,
      width: 100,
      alignItems: 'center',
      borderStyle: 'solid',
      borderBottomWidth: 2,
      borderColor: '#593196'


  },

  pressDisabledB : {
      alignItems: 'center',
      padding: 10,
      width: 100,
      
  },

  pressActiveT: {
    //backgroundColor: '#593196',
    //borderRadius: 30,
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'green'


},

pressDisabledT : {
    alignItems: 'center',
    padding: 10,
    width: 100,
    
}
})