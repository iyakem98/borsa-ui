import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { AntDesign, Feather, FontAwesome5, Foundation, Ionicons, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw'
import ErrorUnDraw from '../../assets/svg/errorUnDraw'
import {registerSheet} from 'react-native-actions-sheet';
import BottomSheet from '../../components/BottomSheet'
import SheetManager from 'react-native-actions-sheet';
import moment from 'moment'
import { useRoute } from '@react-navigation/native'
import Header from '../../components/Shared/Header'
import { LinearGradient } from 'expo-linear-gradient'

const width = Dimensions.get("screen").width


const MyCards = () => {
  const dispatch = useDispatch()
  const route = useRoute()
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false)
  const [bottomSheetData, setBottomSheetData] = useState(null)
  const [selectedTab, setSelectedTab] = useState(1)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isTraveler, setIsTraveler] = useState(false)
  const { consumers } = useSelector((state) => state.auth)
  const { travelers} = useSelector((state) => state.auth)
  const { user} = useSelector((state) => state.auth)
  const { fetchAgain, setfetchAgain, chatSelected, setchatSelected, } = ChatState()
  {/*registerSheet('example-two', <BottomSheet />);*/}

  
  function tweakBuyer() {
    setIsBuyer(false)
  }

  function tweakBuyer2() {
    setIsBuyer(true)
  }

  const changeIsFull = async (id, currentStatus) => {
    console.log("card to be deleted is:", id)
    let config = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
      }
    }

    let newData = {
      travelRequestId: id,
      isLuggageSpaceFull: !currentStatus
    }
    Alert.alert('Changing your luggage status', `Are you sure you want to mark your luggage as ${currentStatus ? 'empty' : 'full'}?`, [
      {text: 'OK', onPress: async () => {
        setSpinner(true)
        await axios.put(`http://143.198.168.244/api/travels/update-is-luggage-space-full`, newData, config)
        .then((res) => {
          getCards()
          setSelectedTab(1)
        }).catch((err) => {
          let errResponse =
            (err && err.response && err.response.data) ||
            (err && err.message);
          console.log("error:", errResponse)
        });
        setSpinner(false)
      }},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }

  const deleteTraveler = async (id) => {
    console.log("card to be deleted is:", id)
    let config = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
      }
    }
    Alert.alert('Deleting your card', 'Are you sure you want to delete?', [
      {text: 'OK', onPress: async () => {
        setSpinner(true)
        await axios.delete(`http://143.198.168.244/api/travels/${id}`, config)
        .then((res) => {
          getCards()
          setSelectedTab(1)
        }).catch((err) => {
          console.log("error:", err)
        });
        setSpinner(false)
      }},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }

  const deleteBuyer = async (id) => {
    console.log("card to be deleted is:", id)
    let config = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
      }
  }
    Alert.alert('Deleting your card', 'Are you sure you want to delete?', [
      {text: 'OK', onPress: async () => {
        setSpinner(true)
        await axios.delete(`http://143.198.168.244/api/buyers/${id}`, config)
          .then((res) => {
            getCards()
            setSelectedTab(2)
         })
          .catch((err) => {
            console.log("error:", err)
          });
        setSpinner(false)
      }},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }
  useEffect(() => {
    navigation.addListener('focus', getCards)
    // UpdateUserRoute()
    //  console.log(route.name)
    // setImage(null)
  },[t, b])
  
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

  const getCards = async () => {
    setSpinner(true)
    if(route?.params?.selectedTab){
      setSelectedTab(route.params.selectedTab)
    }
    const config = {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
      }
    }
    await axios.get(`http://143.198.168.244/api/travels/my`, config)
      .then((data) => { 
        console.log("tttttttttttttttt:", data.data.data)
        if(data.data.data.length>0){
          setT(data.data.data.reverse())
        }else{
          setT(data.data.data)
        }
      }).catch((err) => {
        setT(null)
      });
     
    await axios.get(`http://143.198.168.244/api/buyers/my`, config)
      .then((data) => {
        // console.log("bbbbbbbbbbbbb:", b)
        if(data.data.data.length>0){
          setB(data.data.data.reverse())
        }else{
          setB(data.data.data)
        }
    }).catch((err) => {
      setB(null)
    }); 
    setloading(false)
    setSpinner(false)
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
    {/* <Header title="Buyer" backBtn /> */}
    <View style = {{
      flexDirection: 'row',
      alignItems: 'center',
    }}>

    <Pressable onPress={()=>navigation.navigate('More')}
      style = {{
        //backgroundColor: '#593196',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 4,
        width: "25%",
        marginVertical: 10,
        marginLeft: 10,
        borderRadius: 20,
        alignItems: 'center',
    }}>
    <Feather name="chevron-left" size={34} color="black" />
       {/*<Text style={{fontSize:29, marginTop:-3, marginLeft:3, color: 'black'}}>&larr;</Text> */}
       <Text style={{fontSize:18, color: 'black'}}>
        Back
       </Text>

       
    </Pressable>

    <View style = {{
      marginLeft: "15%"
    }}>
      <Text style = {{
         fontSize: 18,
         fontWeight: 600
         //fontFamily: "Poppins_400Regular"
      }}>
        My Cards
      </Text>
    </View>
    </View>
    
   
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
          }}>Traveling</Text>
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
          }}>Shipping</Text>
      </Pressable>
    </View>
  </View>

  {
    spinner && 
    <View style={{
      //position:"absolute",
      height: "100%",
      //top:"40%",
      //left:"0%",
      //zIndex: 200,
      //justifyContent: "center",
      alignItems: "center",
      paddingTop: 35,
      width: "100%"
  }}>
    <ActivityIndicator size="large" color="black" />
  </View>
  }
 

  {
    selectedTab==1 &&
    <View style = {{
      paddingHorizontal: 10,
      backgroundColor: 'white'
    }}>
      <ScrollView
        //horizontal
        style={{marginTop:"3%"}} 
        >

          <View style = {{
            width: '100%',
            alignItems: 'center'
          }}>
              <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              fontSize: 28,
              marginBottom: 5,
              marginRight: 5,
              marginLeft:20,
            }}>
              My Traveling Card
            </Text>

            <Pressable style={{
                // backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: '#e8e8e8',
                //backgroundColor: '#593196',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                justifyItems: 'center',
                paddingHorizontal: 10,
                marginLeft: 17
                //width: 30,
               // height:30,
                //marginTop:10
            }} 
            onPress={()=>{
                navigation.navigate("New Post", {
                    cardToAdd: 1
                })
            }}
            >
                <Text style={{
                    color: "#fff",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    textAlign: "center",
                    //marginTop: 4,
                    //marginLeft: 7,
                }}>
                    <Entypo name="plus" size={26} color="#13b955" />
                 
                </Text>
            </Pressable>

          </View>

          {t && t.length <1 && 

            <View style = {{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <Text style = {{
                fontSize: 18,
                marginBottom: 20,
              }}>
               No card found. Cards you post will appear here.
              </Text>
              <LinearGradient  colors={['#13b955', "#0a863b"]} style = {{
                        width: '100%',
                        borderRadius: 5,
                        //paddingTop: 100,
            }}>
              <Pressable 
                onPress={()=>{
                  navigation.navigate("New Post", {
                      cardToAdd: 1
                  })
              }}
                style = {{
                  //backgroundColor: '#eee',
                  padding: 8,
                  paddingHorizontal: 22,
                  borderRadius: 10
                }}>
                <Text style = {{
                  fontSize: 18,
                  fontFamily: "Poppins_400Regular",
                  color: 'white',
                }}>
                  Add a card
                </Text>
              </Pressable>
              </LinearGradient>
            </View>
            }

            {
         t && t.length>0 && t.map((travel, index) => (
             <View key={index} style={{
              width: "97%",
              //borderRadius:10,
              //marginLeft:20,
              backgroundColor:"#593196",
              backgroundColor: 'white',
              paddingVertical: 20,
              //height:300,
              //padding:5,
              marginVertical: 17,
              shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
             }}>

            <View style={{
                      //marginTop:"5%",
                      //marginLeft:"90%",
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      //backgroundColor: '#e8e8e8',
                      paddingVertical: 0,
                      paddingRight: 10,
                  }}>

                    <View>
                    <Text style={{fontSize:20}}>
              {"  "}

                  {" "+travel.departure.split(",")[0]+"   "} 
                  <MaterialIcons name="flight-takeoff" size={26} color="#593196" />
                   {"   "+travel.destination.split(",")[0]}
                  </Text> 
                    </View>
                      

                      <AntDesign name="delete" size={24} color="black" onPress={()=>deleteTraveler(travel._id)} />
                      </View>




              <View style={{
                  padding:1,
                  marginTop: -10,
              }}>

          <Text style={{textAlign:"right"}}>
          {/*<MaterialIcons name="delete" size={24} color="white" /> */}
          
          </Text>
              
                {user.isImperial? (
                   <Text style={{textAlign:"left", marginTop:2, fontSize:17, color:"black"}}>
                   {"  "}
                   <AntDesign name="calendar" size={22} color="#696969" />
                   {"  "+moment(travel.departureDate).format("MM-DD-YY")} 
                   
                   </Text> 
                ) : (
                  <Text style={{textAlign:"left", marginTop:2, fontSize:17, color:"black"}}>
                  {"  "}
                  <AntDesign name="calendar" size={22} color="#696969" />
                  {"  "+moment(travel.departureDate).format("DD-MM-YY")} 
                  
                  </Text>
                )}

                 
                   
              

              
                
                  

                  
                  <View style = {{
                    backgroundColor: '#13b955',
                    backgroundColor: '#f0f0f0',
                    marginTop: 8,
                    paddingBottom: 10,
                  }}>
                      <Text style={{textAlign:"left", marginTop:10, fontSize:18, color:"black"}}>
                  {"  "}
                  <AntDesign name="infocirlce" size={22} color="#13b955" />
                  {"  "+travel.status} 
                  
                  </Text> 
                  </View>

                  {user.isImperial? (
                <Text style={{textAlign:"left", marginTop:5, fontSize:18, color:"black"}}>
                {"  "}
                {
                  travel?.isLuggageSpaceFull ? 
                  <MaterialCommunityIcons name="bag-personal" size={28} color="black" />
                  :
                  <MaterialCommunityIcons name="bag-personal-outline" size={28} color="black" />
                }
                {" " + (travel?.luggageSpace*2.20462).toFixed(1)} lb 
                
                </Text> 
              ) : (
                <Text style={{textAlign:"left", marginTop:5, fontSize:18, color:"black"}}>
                  {"  "}
                  {
                  travel?.isLuggageSpaceFull ? 
                  <View style={{flexDirection:"row"}}>
                    <MaterialCommunityIcons name="bag-personal" size={28} color="black" />
                  </View>
                  
                  :
                  <MaterialCommunityIcons name="bag-personal-outline" size={28} color="black" />
                }
                  {"  "+ (travel?.luggageSpace*1.0).toFixed(1)} kg 
                  
                  
                  </Text> 
              )}

<MaterialCommunityIcons name={travel?.isLuggageSpaceFull ? 'toggle-switch' : 'toggle-switch-off-outline'} size={28} color="black" 
style={{alignSelf:"flex-end", marginRight:7, marginTop:-28}}
onPress={()=>changeIsFull(travel._id, travel.isLuggageSpaceFull)} />

                  

                 

              </View>
            
              </View>
          ))
      }
          </View>



            {/* <View style={{
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
              // backgroundColor: "white",
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
                  <Ionicons name="md-add" size={24} color="#fff" />
              </Text>
          </Pressable>

            
            </View> */}

</ScrollView>
    </View>
  }

{
    selectedTab==2 &&
    <View style = {{
      paddingHorizontal: 10,
      backgroundColor: 'white'
    }}>
      <ScrollView
        //horizontal
        style={{
          marginTop:"3%",
        }} 
        contentContainerStyle={{
          paddingBottom: 140
        }}
        >
        <View style = {{
          width: "100%",
          alignItems: 'center',
        }}>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              fontSize: 28,
              marginBottom: 5,
              marginRight: 5,
              marginLeft:20,
            }}>
              My Shipping Cards
            </Text>

            <Pressable style={{
                // backgroundColor: "white",
                borderRadius: 20,
                backgroundColor: '#e8e8e8',
                //backgroundColor: '#593196',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                justifyItems: 'center',
                paddingHorizontal: 10,
                marginLeft: 17
                //width: 30,
               // height:30,
                //marginTop:10
            }} 
            onPress={()=>{
                navigation.navigate("New Post", {
                    cardToAdd: 2
                })
            }}
            >
                <Text style={{
                    color: "#fff",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    textAlign: "center",
                    //marginTop: 4,
                    //marginLeft: 7,
                }}>
                    <Entypo name="plus" size={26} color="#593196" />
                 
                </Text>
            </Pressable>


          </View>

          {b < 1 && 

              <View style = {{
                paddingTop: 20,
                alignItems: 'center',
              }}>
                <Text style = {{
                  fontSize: 18,
                  marginBottom: 20,
                }}>
                 No card found. Cards you post will appear here.
                </Text>
                <LinearGradient  colors={['#593196', "#3f216c"]} style = {{
                        width: '100%',
                        borderRadius: 5
                        //paddingTop: 30,
            }}>
                <Pressable 
                  onPress={()=>{
                    navigation.navigate("New Post", {
                        cardToAdd: 2
                    })
                }}
                  style = {{
                    //backgroundColor: '#13b955',
                    //backgroundColor: '#593196',
                    padding: 8,
                    borderRadius: 10
                  }}>
                  <Text style = {{
                    fontSize: 18,
                    color: 'white',
                    fontFamily: 'Poppins_400Regular'
                  }}>
                    Add a new card
                  </Text>
                </Pressable>
                </LinearGradient>
              </View>
              }


          

        {
         b && b.length>0 && b.map((buyer, index) => (
          <View key={index} style={{
              width: "97%",
              //borderRadius:10,
              //marginLeft:20,
              backgroundColor:"#593196",
              backgroundColor: 'white',
              paddingTop: 10,
              //height:300,
              //padding:5,
              marginVertical: 17,
              shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
             }}>

          <View style={{
                      //marginTop:"5%",
                      //marginLeft:"90%",
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      //backgroundColor: '#e8e8e8',
                      paddingVertical: 0,
                      paddingHorizontal: 10,
                  }}>

                    <View>
                    <Text style={{marginTop:3, fontSize:23, color:"black"}}>
                  {"  "}
                  <Foundation name="shopping-bag" size={24} color="#593196" />
                  {"  "+buyer.item[0]} 
                  
                  </Text> 
                    </View>
                      

                      <AntDesign name="delete" size={24} color="black" onPress={()=>deleteBuyer(buyer._id)} />
                      </View>

              <View style={{
                  padding:1
              }}>

          <Text style={{textAlign:"right"}}>
          {/*<MaterialIcons name="delete" size={24} color="white" />*/}
          
          </Text>
          <View style = {{
            //backgroundColor: 'yellow',
            marginTop: -13,
          }}>
                    <Text style={{fontSize:18}}>
              {"  "}

                  {" "+buyer.departure.split(",")[0]+"   "} 
                   {/* {buyer.departure.split(",").length === 3? (
                    
                      <Text>
                       {" "+buyer.departure.split(",")[2]+"   "} 
                      </Text>
                   
                  ): (
                    <View>
                      <Text>
                      {" "+buyer.departure.split(",")[1]+"   "} 
                      </Text>
                    </View>
                  )} */}
                  <MaterialIcons name="flight-takeoff" size={20} color="black" />
                   {"   "+buyer.destination.split(",")[0]}
                  </Text> 
                  
                    </View>

                    <View style = {{
                      flexDirection: 'row',
                      paddingTop: 8,
                      //backgroundColor: 'red'

                    }}>
                      {user.isImperial? (
                         <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                         {"  "}
                         <AntDesign name="calendar" size={18} color="#696969" />
                         {"  "+moment(buyer.startDate).format("MM-DD-YY")} 
                         
                         </Text> 
                      ): (
                        <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                        {"  "}
                        <AntDesign name="calendar" size={18} color="#696969" />
                        {"  "+moment(buyer.startDate).format("DD-MM-YY")} 
                        
                        </Text> 
                      )}

                      {user.isImperial? (
                         <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                         {"   "}
                         <FontAwesome5 name="calendar-times" size={18} color="#696969" />
                         {"  "+moment(buyer.endDate).format("MM-DD-YY")} 
                         
                         </Text> 
                      ) : (
                        <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                        {"   "}
                        <FontAwesome5 name="calendar-times" size={18} color="#696969" />
                        {"  "+moment(buyer.endDate).format("DD-MM-YY")} 
                        
                        </Text> 
                      )
                        }
                   

                 
                    </View>

                  
                  {buyer.description && 
                    <View style = {{
                      paddingVertical: 5,
                      backgroundColor: '#f5f5f5',
                      marginTop: 10,
                    }}>
                       <Text style={{textAlign:"left", marginTop:10, fontSize:15, color:"black"}}>
                     {"  "}
                    {/* <MaterialIcons name="description" size={24} color="black" /> */}
                     {"  "+buyer.description} 
                     
                     </Text> 
                    </View>
                  }

                {!buyer.description && 
                    <View style = {{
                      paddingVertical: 5,
                      backgroundColor: '#f5f5f5',
                      marginTop: 10,
                    }}>
                       <Text style={{textAlign:"left", marginTop:10, fontSize:15, color:"black"}}>
                     {"  "}
                     {/*<MaterialIcons name="description" size={24} color="black" /> */}
                     No description 
                     
                     </Text> 
                    </View>
                  }

                 

                 

              </View>

             
             
              </View>
          ))
      }

 {/* <View style={{
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
                  <Ionicons name="md-add" size={24} color="#fff" />
              </Text>
          </Pressable>

            
            </View> */}
              



        </View>

 
           
</ScrollView>
    </View>
  }

</SafeAreaView>
  )
}

export default MyCards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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