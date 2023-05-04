import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { AntDesign, Feather, FontAwesome5, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons'
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
                padding:10
               }}>

              <View style={{
                    marginTop:"3%",
                    marginLeft:"91%"
                }}>
                    <AntDesign name="delete" size={24} color="#fff" onPress={()=>deleteTraveler(travel._id)} />
                    </View>

                <View style={{
                    padding:1
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

              
                </View>

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
            marginTop:"5%",
          }} 
          >
          <View style = {{
            width: "100%",
            alignItems: 'center'
          }}>

            <Text>
              My Buyer Cards
            </Text>
          {
           b.length>0 && b.map((buyer, index) => (
            <View key={index} style={{
                width: "97%",
                borderRadius:10,
                //marginLeft:20,
                backgroundColor:"#593196",
                height:300,
                //padding:5,
                marginVertical: 10,
               }}>

            <View style={{
                        //marginTop:"5%",
                        //marginLeft:"90%",
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: '#e8e8e8',
                        paddingVertical: 10
                    }}>

                      <View>
                      <Text style={{textAlign:"left", fontSize:22, marginTop: 5}}>
                {"  "}

                    {" "+buyer.departure.split(",")[0]+"   "} 
                    <MaterialIcons name="flight-takeoff" size={24} color="black" />
                     {"   "+buyer.destination.split(",")[0]}
                    </Text> 
                      </View>
                        

                        <AntDesign name="delete" size={24} color="#593196" onPress={()=>deleteBuyer(buyer._id)} />
                        </View>

                <View style={{
                    padding:1
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
                // backgroundColor: "white",
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

              
                </View>
                



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