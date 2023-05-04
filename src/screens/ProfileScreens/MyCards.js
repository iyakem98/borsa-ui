import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { AntDesign, Feather, FontAwesome5, Foundation, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw'
import ErrorUnDraw from '../../assets/svg/errorUnDraw'
import {registerSheet} from 'react-native-actions-sheet';
import BottomSheet from '../../components/BottomSheet'
import SheetManager from 'react-native-actions-sheet';
import moment from 'moment'
import { useRoute } from '@react-navigation/native'

const width = Dimensions.get("screen").width


const ConnectScreen = () => {
  registerSheet('example-two', <BottomSheet />);

  const route = useRoute()

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

    const deleteTraveler = async (id) => {
        console.log("card to be deleted is:", id)
       
        let config = {
            headers: {
                Authorization: `Bearer ${user.token}`
              }}

              Alert.alert('Deleting your card', 'Are you sure to delete?', [
                
                {text: 'OK', onPress: async () => {
                  setSpinner(true)
        await axios.delete(`http://143.198.168.244/api/travels/${id}`, config)
        .then((res) => {
          
           console.log("delllll:", res)
            getCards()
            setSelectedTab(1)
            
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

    const deleteBuyer = async (id) => {
        console.log("card to be deleted is:", id)
        
        let config = {
            headers: {
                Authorization: `Bearer ${user.token}`
              }}

              Alert.alert('Deleting your card', 'Are you sure to delete?', [
                
                {text: 'OK', onPress: async () => {
                  setSpinner(true)

        await axios.delete(`http://143.198.168.244/api/buyers/${id}`, config)
        .then((res) => {
          
           console.log("delllll:", res)
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
          Authorization: `Bearer ${user.token}`
        }}

        await axios.get(`http://143.198.168.244/api/travels/my`, config)
        .then((data) => {
          
        console.log("tttttttttttttttt:", data.data.data)
        if(data.data.data.length>0){
          setT(data.data.data.reverse())
        }else{
          setT(data.data.data)
        }
         
         })
        .catch((err) => {
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
         })
        .catch((err) => {
          setB(null)
        });

        setloading(false)
        setSpinner(false)
    }

    const [spinner, setSpinner] = useState(false)
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

  {
    spinner && 
    <View style={{
      position:"fixed",
      top:"40%",
      left:"0%",
      zIndex: 200
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
              My Traveler Cards
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
                    cardToAdd: "traveler"
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

          {t.length < 1 && 

            <View style = {{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              <Text style = {{
                fontSize: 18,
                marginBottom: 20,
              }}>
                You have not posted any traveler card yet.
              </Text>
              <Pressable 
                onPress={()=>{
                  navigation.navigate("New Post", {
                      cardToAdd: "traveler"
                  })
              }}
                style = {{
                  backgroundColor: '#13b955',
                  padding: 8,
                  borderRadius: 10
                }}>
                <Text style = {{
                  fontSize: 18,
                  color: 'white',
                }}>
                  Add a new card
                </Text>
              </Pressable>
            </View>
            }

            {
         t.length>0 && t.map((travel, index) => (
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

                  <Text style={{textAlign:"left", marginTop:2, fontSize:17, color:"black"}}>
                  {"  "}
                  <AntDesign name="calendar" size={22} color="#696969" />
                  {"  "+moment(travel.departureDate).format("DD-MM-YY")} 
                  
                  </Text> 


                  <Text style={{textAlign:"left", marginTop:5, fontSize:18, color:"black"}}>
                  {"  "}
                  <MaterialIcons name="luggage" size={26} color="black" />
                  {"  "+travel.luggageSpace} kg 
                  
                  </Text> 

                  
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
        >
        <View style = {{
          width: "100%",
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
              My Buyer Cards
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
                    cardToAdd: "buyer"
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

          {b.length < 1 && 

              <View style = {{
                paddingTop: 20,
                alignItems: 'center',
              }}>
                <Text style = {{
                  fontSize: 18,
                  marginBottom: 20,
                }}>
                  You have not posted any buyer card yet.
                </Text>
                <Pressable 
                  onPress={()=>{
                    navigation.navigate("New Post", {
                        cardToAdd: "traveler"
                    })
                }}
                  style = {{
                    backgroundColor: '#13b955',
                    backgroundColor: '#593196',
                    padding: 8,
                    borderRadius: 10
                  }}>
                  <Text style = {{
                    fontSize: 18,
                    color: 'white',
                  }}>
                    Add a new card
                  </Text>
                </Pressable>
              </View>
              }


          

        {
         b.length>0 && b.map((buyer, index) => (
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
                  <MaterialIcons name="flight-takeoff" size={20} color="black" />
                   {"   "+buyer.destination.split(",")[0]}
                  </Text> 
                    </View>

                    <View style = {{
                      flexDirection: 'row',
                      paddingTop: 8,
                      //backgroundColor: 'red'

                    }}>
                    <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                  {"  "}
                  <AntDesign name="calendar" size={18} color="#696969" />
                  {"  "+moment(buyer.startDate).format("DD-MM-YY")} 
                  
                  </Text> 

                  <Text style={{marginTop:0, fontSize:15, color:"#696969"}}>
                  {"   "}
                  <FontAwesome5 name="calendar-times" size={18} color="#696969" />
                  {"  "+moment(buyer.endDate).format("DD-MM-YY")} 
                  
                  </Text> 
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