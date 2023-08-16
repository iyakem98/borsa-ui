import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BuyerCard from '../../components/Connect/BuyerCard'
import TravelerCard from './Traveler'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons'
import Buyer from './Buyer'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw'
import ErrorUnDraw from '../../assets/svg/errorUnDraw'
import {registerSheet} from 'react-native-actions-sheet';
import BottomSheet from '../../components/BottomSheet'
import SheetManager from 'react-native-actions-sheet';
import TravelerHeader from '../../components/Connect/TravelerHeader'
import BuyerHeader from '../../components/Connect/BuyerHeader'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView  from 'lottie-react-native';
import CountryPicker from 'react-native-country-picker-modal'
import CountryFlag from "react-native-country-flag"

const width = Dimensions.get("screen").width

const ConnectScreen = () => {
  // registerSheet('example-two', <BottomSheet />);

  const [bottomSheetData, setBottomSheetData] = useState(null)
  const [selectedTab, setSelectedTab] = useState(1)
  const { consumers } = useSelector(
    (state) => state.auth
  )
  const snapPoints = useMemo(() => ['80%', '80%'], []);
  const { travelers} = useSelector(
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
    }

    function tweakBuyer2() {
        setIsBuyer(true)
    }

      const clearFilterBuyer = () => {
        setFilterBuyer(0)
        setBuyerD("")
        setBuyerS("")
        setBuyersStatus("All")
      }
      const clearFilterTraveler = () => {
        setFilterTraveler(0)
        setTravelerD("")
        setTravelerS("")
        setTravelersStatus("All")
      }
    
    const [t, setT] = useState([])
    const [b, setB] = useState([])
    const [pageBuyer, setPageBuyer] = useState(1);
    //const pageBuyerRef = useRef(pageBuyer);
    const [pageTraveler, setPageTraveler] = useState(1);
    const [limit, setLimit] = useState(10);
    const [buyerTotal, setBuyerTotal] = useState([])
    const [travelerTotal, setTravelerTotal] = useState([])
    const [totBuyer, setTotBuyer] = useState(0)
    const [totTraveler, setTotTraveler] = useState(0)
    const [pageLimBuyer, setPageLimBuyer] = useState(0)
    const [pageLimTraveler, setPageLimTraveler] = useState(0)

    const [ccc, setCcc] = useState(null)

    const onSelectTravelerSource = (country) => {
      console.log("ccc", country)
      setCcc(country)
      if(country.name=="United States"){
        setTravelerS("USA")
      }else{
        setTravelerS(country.name)
      }
      setTravelerSF(country.cca2)
      setTpickup(false)
    }

    const onSelectTravelerDestination = (country) => {
      console.log("ccc", country)
      setCcc(country)
      if(country.name=="United States"){
        setTravelerD("USA")
      }else{
        setTravelerD(country.name)
      }
      setTravelerDF(country.cca2)
      setTdelivery(false)
    }

    const onSelectBuyerSource = (country) => {
      console.log("ccc", country)
      setCcc(country)
      if(country.name=="United States"){
        setBuyerS("USA")
      }else{
        setBuyerS(country.name)
      }
      setBuyerSF(country.cca2)
      setBpickup(false)
    }

    const onSelectBuyerDestination = (country) => {
      console.log("ccc", country)
      setCcc(country)
      if(country.name=="United States"){
        setBuyerD("USA")
      }else{
        setBuyerD(country.name)
      }
      setBuyerDF(country.cca2)
      setBdelivery(false)
    }


    const [loading, setloading] = useState(true)
    const [loadingBuyer, setLoadingBuyer] = useState(false)
    const [notLoadingBuyer, setNotLoadingBuyer] = useState(false)
    const [loadingTraveler, setLoadingTraveler] = useState(false)

    const [filterTraveler, setFilterTraveler] = useState(0)
    const [filterBuyer, setFilterBuyer] = useState(0)

    const [buyersStatus, setBuyersStatus] = useState("All")
    const [travelersStatus, setTravelersStatus] = useState("All")

    const [buyerS, setBuyerS] = useState("")
    const [buyerD, setBuyerD] = useState("")
    const [buyerSF, setBuyerSF] = useState("")
    const [buyerDF, setBuyerDF] = useState("")

    const [travelerS, setTravelerS] = useState("")
    const [travelerD, setTravelerD] = useState("")
    const [travelerSF, setTravelerSF] = useState("")
    const [travelerDF, setTravelerDF] = useState("")

    const findBuyerPickup = (ar) => {
      let lngth = ar.length
      let country = ar[lngth-1].value
      let city = ar[0].value
      if (lngth > 2) {
          city += ', ' + ar[1].value
      }
      console.log("workeeeeeed", `${country}`)
      setBuyerS(`${country}`)
  }

  const findBuyerDestination = (ar) => {
    let lngth = ar.length
    let country = ar[lngth-1].value
    let city = ar[0].value
    if (lngth > 2) {
        city += ', ' + ar[1].value
    }
    console.log("workeeeeeed", `${country}`)
    setBuyerD(`${country}`)
}

const findTravelerPickup = (ar) => {
  let lngth = ar.length
  let country = ar[lngth-1].value
  let city = ar[0].value
  if (lngth > 2) {
      city += ', ' + ar[1].value
  }
  console.log("workeeeeeed", `${country}`)
  setTravelerS(`${country}`)
}

const findTravelerDestination = (ar) => {
let lngth = ar.length
let country = ar[lngth-1].value
let city = ar[0].value
if (lngth > 2) {
    city += ', ' + ar[1].value
}
console.log("workeeeeeed", `${country}`)
setTravelerD(`${country}`)
}

const filterBuyers =  async () => {
  if(!buyerD && !buyerS){
    alert("Please enter either source or destination")
  }else{
    setLoad(true)
    let config = {
      headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
        }}
  
  let {data} =   await axios.get(`http://143.198.168.244/api/buyers`,
  config)
  // console.log("=======", data.data)
  let buy = data.data
  let filteredBuyers = []
  if(buy){
    for(let i=0; i<buy.length; i++){
      let x = buy[i].departure.split(",")
      x = x[x.length-1]
      x = x.replace(" ", "")


      let y = buy[i].destination.split(",")
      y = y[y.length-1]
      y = y.replace(" ", "")
      console.log("yyyyy", y, buyerD)

      // if(x===buyerS){
      //   console.log("got one here", x, buyerS)
      // }
   

      // console.log("xxxxx", x, buyerS)

      if(buyerS && buyerD){
         if(buyerS && buyerS==x && buyerD && buyerD==y){
        filteredBuyers.push(buy[i])
        console.log("yesss xxx", buy[i])
      }
      }else{
         if(buyerS && buyerS==x){
        filteredBuyers.push(buy[i])
        console.log("yesss xxx", buy[i])
      }

      if(buyerD && buyerD==y){
        filteredBuyers.push(buy[i])
        console.log("yesss yyy", buy[i])
      }
      }
     
    }
    console.log("after filter", filteredBuyers)
   if(filteredBuyers.length>0){
    setBuyerTotal(filteredBuyers)
    setFilterBuyer(0)
    setBuyersStatus("Filtered")
   }else{
    alert("No results found.")
   }
   setLoad(false)
  
  }
  }
}

const [load, setLoad] = useState(false)

const filterTravelers =  async () => {
  if(!travelerD && !travelerS){
    alert("Please enter either source or destination")
  }else{
    setLoad(true)
    let config = {
      headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
        }}
  
  let {data} =   await axios.get(`http://143.198.168.244/api/travels`,
  config)
  // console.log("=======", data.data)
  let travel = data.data
  let filteredTravels = []
  if(travel){
    for(let i=0; i<travel.length; i++){
      let x = travel[i].departure.split(",")
      x = x[x.length-1]
      x = x.replace(" ", "")

       let y = travel[i].destination.split(",")
      y = y[y.length-1]
      y = y.replace(" ", "")
      console.log("yyyyy", y, travelerD)

     if(travelerD && travelerS){
         if(travelerS && travelerS==x && travelerD && travelerD==y){
        filteredTravels.push(travel[i])
        console.log("yesss xxx", travel[i])
      }

      }else{
         if(travelerS && travelerS==x){
        filteredTravels.push(travel[i])
        console.log("yesss xxx", travel[i])
      }

      if(travelerD && travelerD==y){
        filteredTravels.push(travel[i])
        console.log("yesss yyy", travel[i])
      }
      }

      // console.log("xxxxx", x, travelerS)
  
     
    }
    console.log("after filter", filteredTravels)
   if(filteredTravels.length>0){
    setT(filteredTravels)
    setFilterTraveler(0)
    setTravelersStatus("Filtered")
   }else{
    alert("No results found.")
   }

   setLoad(false)
   
  }
  }
}

          const handleClear = () => {
                        setTravelerS("")
                        setTravelerSF("")
                        setTravelerD("")
                        setTravelerDF("")
                        setBuyerD("")
                        setBuyerDF("")
                        setBuyerS("")
                        setBuyerSF("")
                        setPageBuyer(1)
                        setPageTraveler(1)
                        setTravelersStatus("All")
                        getUsers()
}

const [tpickup, setTpickup] = useState(false)
const [tdelivery, setTdelivery] = useState(false)

const [bpickup, setBpickup] = useState(false)
const [bdelivery, setBdelivery] = useState(false)


    useEffect(() => {   
      getUsers()
      setPageLimTraveler(totTraveler)
    }, [pageBuyer, pageTraveler])
 
    const changeBuyerPage = () => {
      setLoadingBuyer(true)
      setPageBuyer(pageBuyer+1)
    }

    const changeTravelerPage = () => {
      setLoadingTraveler(true)
      setPageTraveler(pageTraveler+1)
      
    }

    const getUsers = async () => {

      let user1 = await  AsyncStorage.getItem("@user_data")
      let user = JSON.parse(user1)
     
      const config = {
      headers: {
          Authorization: `Bearer ${user.token}`
        }}

    await axios.get(`http://143.198.168.244/api/travels?page=${pageTraveler}&limit=${limit}`, config)
        .then((data, total) => {
          
          console.log("tttttttttttttttt:", data.data.data)
         setT(data.data.data)
         //setPageTraveler(pageTraveler + 1)
         setTravelerTotal([...travelerTotal, ...data.data.data])
         setTotTraveler(data.data.total)
         setPageLimTraveler(Math.ceil(data.data.total/10))
         //setLoadingBuyer(true)
         })
        .catch((err) => {
         setT(null)
        });
     
        await axios.get(`http://143.198.168.244/api/buyers?page=${pageBuyer}&limit=${limit}`, config)
        .then((data, total) => {
         setB(data.data.data)
         //setPageBuyer(pageBuyer + 1)
         setBuyerTotal([...buyerTotal, ...data.data.data])
         setTotBuyer(data.data.total)
         setPageLimBuyer(Math.ceil(data.data.total/10))
         //alert(buyerTotal.length)
         })
        .catch((err) => {
          setB(null)
        });


        setLoadingBuyer(false)
        setLoadingTraveler(false)
        setloading(false)
        setLoad(false)
    }

        
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        backgroundColor: "#fff",
        backgroundColor: "#fcfbff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 15,
        marginTop: 7
      }}>
                 
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: "space-between",
          width: width - 30,
          backgroundColor: "#eee",
          padding: 8,
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
            handleClear()
            setFilterBuyer(0)
            setFilterTraveler(0)
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
            alignItems: "center",
            /*
            shadowColor: '#737373',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: selectedTab == 2? 0.28 : 0,
            shadowRadius: selectedTab == 2? 3.00 : 0,
          */
          }} onPress={()=>{
            !isBuyer ? setIsBuyer(true) : null
            setSelectedTab(2)
            handleClear()
            setFilterBuyer(0)
            setFilterTraveler(0)
          }}>
            <Text style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14
            }}>Shipping</Text>
          </Pressable>
        </View>
      </View>
        {
          load ? 
          <LottieView
            style={{

              height: 250,
              left: "10%",
              //right: '20%',
              top: '5%',
            
            }}
            source={require('../../assets/loader.json')}

            autoPlay
            loop
            />
          
          :
          <View>
          
          
          {loading ? (
            <View style={{
                paddingTop: "100%"
            }}>
              {/* <ActivityIndicator size="large" color="#777" /> */}
              {/* <Lottie
      source={require('../../assets/Animation - 1689355162679.json')}
    /> */}
      {/* <LottieView
       
        source={require('../../assets/animation_lkjgfh27.json')}
      /> */}
      {/* <Lottie source={require('../../assets/loading.json')} autoPlay loop /> */}
    
              {/* <LottieView
      source={require('../../assets/qdZM0DGhfn.json')}
    /> */}
   {/* <View style={styles.animationContainer}> */}
    <LottieView
        style={{
         
          height: 86,
          position: 'absolute',
          top: "120%",
          left: '1%', 
        }}
        source={require('../../assets/animation_planeLoading.json')}
        autoPlay
        loop
      />
     {/* <LottieView
        style={{
         
          height: 250,
        }}
        source={require('../../assets/Animation - 1689355162679.json')}
        autoPlay
        loop
      />
      <LottieView
        style={{
          width: 500,
          height: 200,
        
        }}
        source={require('../../assets/animation_lks476w7.json')}
        autoPlay
        loop
      /> */}
   {/* </View> */}
            </View>
          ) : (selectedTab === 2 && b && b.length > 0) || (selectedTab === 1 && t && t.length > 0) ? (
            <View style = {{backgroundColor: "white", paddingVertical: 0}}>         
              {isBuyer ? (
                <View style={{
                  paddingHorizontal: 10,
                  backgroundColor: '#fcfbff',
                }}>
      
                        {
                          filterBuyer==0 &&
                         (
                          buyersStatus=="All" ?
                          <TouchableOpacity 
                          onPress={()=>setFilterBuyer(1)}
                          style = {{
                              backgroundColor: '#e8e8e8',
                              //backgroundColor: '#a991d4',
                              //backgroundColor: 'black',
                              //backgroundColor: '#009cdc',
                              //backgroundColor: "#593196",
                              //backgroundColor: '#7267e7',
                              backgroundColor: 'white',
                              //width:100,
                              width: "13%",
                              marginBottom: 12,
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                              borderRadius: 5,
                              flexDirection: 'row',
                              alignItems: 'center',

                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.22,
                              shadowRadius: 2.22,

                              elevation: 3,
                      }}>
                          <Ionicons name="filter" size={24} color="black" />
                         
                      </TouchableOpacity>
      
                      :
      
                     <>
                      <Text style = {{
                          textAlign:"center",
                          fontSize:18
                      }}>
                        Showing results for {buyerS ? buyerS : "-"} to {buyerD ? buyerD : "-"}
                      </Text>
                      <TouchableOpacity 
                      onPress={()=>{
                        setPageBuyer(1)
                        setPageTraveler(1)
                        setBuyersStatus("All")
                        getUsers()
                      }}
                      style = {{
                          backgroundColor: '#e8e8e8',
                          //backgroundColor: '#a991d4',
                          //backgroundColor: 'black',
                          //backgroundColor: '#009cdc',
                          //backgroundColor: "#593196",
                          //backgroundColor: '#7267e7',
                          marginTop:10,
                          marginBottom:5,
                          marginLeft:"20%",
                          width:"60%",
                          paddingVertical: 6,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent:"center"
                  }}>
                      {/* <Ionicons name="filter" size={24} color="black" /> */}
                     
                      
                      <Text style = {{
                          fontSize: 18,
                          marginLeft: 2,
                          //color: 'white'
                      }}>
                        Clear Filters
                      </Text>
                  </TouchableOpacity>
                  </>
                         )
                        }
      
                        {
                          filterBuyer==1 &&
                          <View style = {{
                            //backgroundColor: 'yellow',
                            maxHeight: "100%",
                        }}>
                
                            <TouchableOpacity onPress={()=>{
                              clearFilterBuyer()
                              handleClear()
                              getUsers()
                            }}
                                style = {{
                                    //backgroundColor: '#E8E8E8',
                                    paddingLeft: 10,
                                    width: "10%"
                
                                }}
                            >
                            <Ionicons name="close-circle" size={28} color="black" />
                            </TouchableOpacity>
                
                            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>
                                <View style = {{
                                  width: '100%',
                                  alignItems: 'center',
                                }}>
                                 
                                </View>
                                <Text style={{
                                    marginTop: 20,
                                    marginBottom: 3,
                                    fontFamily: "Poppins_400Regular",
                                    //fontSize: 18,
                                }}>
                                    Pickup Location
                                </Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    borderWidth: 0,
                                    //borderBottomWidth: 1,
                                    borderColor: 'lightgray',
                                    paddingHorizontal: 5,
                                    //paddingVertical: 5,
                                    borderRadius: 5,
                                    //width: "95%"
                                }}>
                                    
                                   
                                   <View style={styles.container}>
                

{!buyerS && (
      <View style={{
        width:"100%", 
        backgroundColor:"#eee",
        paddingTop: 10,
        //backgroundColor: "#fff",  
        height:40,
        padding:5,
        display:"flex",
        alignContent:"center",
        //alignItems:"center",
        borderRadius: 6,
        fontSize:20,
        marginTop: 4,
      }}>
      <CountryPicker
          withFlag
          onSelect={onSelectBuyerSource}
          styles={{
             fontFamily:"Poppins_400Regular",
          }}
      />
      </View>
       )}

          {buyerS && !bpickup && (
            <Pressable
            onPress={()=>setBuyerS("")}
            style={{
              width:"100%", 
              backgroundColor:"#f6f6fb",
              height:40,
              padding:5,
              display:"flex",
              alignContent:"center",
              //alignItems:"center"
            }}>

        
                <View style={{flexDirection:"row", paddingTop: 4}}>
              <Text style={{fontSize:17, fontFamily: "Poppins_400Regular",}}>
                {buyerS} 
              </Text>
              <Text style={{marginLeft:20, marginTop:5}}>
                <CountryFlag isoCode={buyerSF} size={17} />
              </Text>
              </View>
      
     </Pressable>
      )}
                
                                </View>
                                </View>
                                <Text style={{
                                    marginTop: 20,
                                    marginBottom: 3,
                                    fontFamily: "Poppins_400Regular",
                                    //fontSize: 18,
                                }}>
                                    Delivery Location
                                </Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderWidth: 0,
                                    //borderBottomWidth: 1,
                                    borderColor: 'lightgray',
                                    paddingHorizontal: 5,
                                    //paddingVertical: 5,
                                    borderRadius: 5,
                                    //width: "95%"
                                }}>
                                    
                
{!buyerD && (
      <View style={{
        width:"100%", 
        //backgroundColor:"#f6f6fb",
        backgroundColor: '#e8e8e8',
        height:40,
        padding:5,
        paddingTop: 10,
        display:"flex",
        alignContent:"center",
        //alignItems:"center",
        fontSize:20,
        marginTop: 4,
      }}>
      <CountryPicker
          withFlag
          onSelect={onSelectBuyerDestination}
          styles={{
             fontFamily:"Poppins_400Regular",
          }}
      />
      </View>
       )}

          {buyerD && !bdelivery && (
            <Pressable
            onPress={()=>setBdelivery("")}
            style={{
              width:"100%", 
              backgroundColor:"#f6f6fb",
              height:40,
              padding:5,
              display:"flex",
              alignContent:"center",
              //alignItems:"center"
            }}>

        
                <View style={{flexDirection:"row", paddingTop: 4}}>
              <Text style={{fontSize:17, fontFamily: "Poppins_400Regular",}}>
                {buyerD} 
              </Text>
              <Text style={{marginLeft:20, marginTop:5}}>
                <CountryFlag isoCode={buyerDF} size={17} />
              </Text>
              </View>
      
     
      </Pressable>
      )}
                                </View>
                                </ScrollView>
                                <View style = {{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingVertical: 30,
                                }}>
                                   
                                    <Pressable 
                                      onPress={()=>{
                                        clearFilterBuyer()
                                      }}
                                        style = {{
                                            //backgroundColor: '#E8E8E8',
                                            paddingHorizontal: 10,
                                            paddingVertical: 7,
                                            marginHorizontal: 30,
                                            borderRadius: 5,
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                            borderColor: '#5f43b2',
                                        }}>
                                        <Text style = {{
                                          color: '#5f43b2',
                                        }}>
                                            Discard
                                        </Text>
                                    </Pressable>
      
                                    <Pressable
                                    onPress={filterBuyers} 
                                        style = {{
                                            backgroundColor: '#593196',
                                            backgroundColor: '#5f43b2',
                                            paddingHorizontal: 30,
                                            paddingVertical: 7,
                                            marginHorizontal: 2,
                                            borderRadius: 5,
                                        }}>
                                        <Text style = {{
                                            color: 'white'
                                        }}>
                                            Apply 
                                        </Text>
                                    </Pressable >
                                </View>
                        </View>  
                        }
      
                  <FlatList
                    // ListHeaderComponent={BuyerHeader}
                    data={buyerTotal}
                    contentContainerStyle={{
                      paddingBottom: 270,
                      paddingTop: 10,
                      backgroundColor: '#fcfbff',
                    }}
                    maxToRenderPerBatch={2}
                    renderItem={({item}) => {
                      // console.log("first", item)
                      return (
                        // <BuyerCard buyer={item} />
                        <Buyer item={item} onPress={()=>{
                          // console.log("first")
                          // SheetManager.show('example-two');
                        }} />
                      )
                    }}
                    onEndReached={() => {
      
                     if(buyersStatus==="All"){
                      if (pageBuyer == pageLimBuyer){
                        return
                      }
      
                      else {
                        changeBuyerPage()
                      }
                    }
                      
                     
                     
                    }}
                  />
      
      {loadingBuyer && <View style = {{
                    top: "30%",
                    left: '50%',
                    zIndex: 100000,
                    position: "absolute",
                  }}> 
                   <LottieView
            style={{

              height: 250,
              //left: "5%",
              //right: '20%',
              bottom: '5%',
            
            }}
            source={require('../../assets/loader.json')}

            autoPlay
            loop
            />
                  </View>}
                  
                </View> 
              ) : (
                <View style = {{
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  backgroundColor: "#fcfbff",
                }}>
                  
                  {
                          filterTraveler==0 &&
                         (
                          travelersStatus=="All" ?
                          <TouchableOpacity 
                          onPress={()=>setFilterTraveler(1)}
                          style = {{
                              //backgroundColor: '#e8e8e8',
                              //backgroundColor: '#a991d4',
                              //backgroundColor: 'black',
                              //backgroundColor: '#009cdc',
                              //backgroundColor: "#593196",
                              //backgroundColor: '#7267e7',
                              backgroundColor: 'white',
                              //width:100,
                              width: "13%",
                              marginBottom: 12,
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                              borderRadius: 5,
                              flexDirection: 'row',
                              alignItems: 'center',

                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.22,
                              shadowRadius: 2.22,

                              elevation: 3,
                      }}>
                        <Ionicons name="filter" size={24} color="black" />
                         {/* <AntDesign name="plus" size={18} color="black" />
                          <Text style = {{
                              fontSize: 18,
                              marginLeft: 2,
                              //color: 'white'
                          }}>
                            Add Filter
                        </Text> */}
                      </TouchableOpacity>
      
                      :
      
                     <>
                      <Text style = {{
                          textAlign:"center",
                          fontSize:18
                      }}>
                        Showing results for {travelerS ? travelerS : "-"} to {travelerD ? travelerD : "-"}
                      </Text>
                      <TouchableOpacity 
                      onPress={()=>{
                        handleClear()
                      }}
                      style = {{
                          backgroundColor: '#e8e8e8',
                          //backgroundColor: '#a991d4',
                          //backgroundColor: 'black',
                          //backgroundColor: '#009cdc',
                          //backgroundColor: "#593196",
                          //backgroundColor: '#7267e7',
                          marginTop:10,
                          marginBottom:5,
                          marginLeft:"20%",
                          width:"60%",
                          paddingVertical: 6,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent:"center"
                  }}>
                      {/* <Ionicons name="filter" size={24} color="black" /> */}
                     
                      
                      <Text style = {{
                          fontSize: 18,
                          marginLeft: 2,
                          //color: 'white'
                      }}>
                        Clear Filters
                      </Text>
                  </TouchableOpacity>
                  </>
                         )
                        }
      
                        {
                          filterTraveler==1 &&
                          <View style = {{
                            //backgroundColor: 'yellow',
                            maxHeight: "100%",
                        }}>
                
                            <TouchableOpacity onPress={()=>{
                              clearFilterTraveler()
                              handleClear()
                              getTravelers()
                            }}
                                style = {{
                                    //backgroundColor: '#E8E8E8',
                                    paddingLeft: 10,
                                    width: "10%"
                
                                }}
                            >
                            <Ionicons name="close-circle" size={28} color="black" />
                            </TouchableOpacity>
                
                            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>

                               <View style = {{
                                  width: '100%',
                                  alignItems: 'center',
                                }}>
                                
                                </View>
                                
                                <Text style={{
                                    marginTop: 20,
                                    marginBottom: 3,
                                    fontFamily: "Poppins_400Regular",
                                    //fontSize: 18,
                                }}>
                                    Flying from
                                </Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    borderWidth: 0,
                                    //borderBottomWidth: 1,
                                    borderColor: 'lightgray',
                                    paddingHorizontal: 5,
                                    //paddingVertical: 5,
                                    borderRadius: 5,
                                    //width: "95%"
                                }}>
                                    
                                   
                                   <View style={styles.container}>


       {!travelerS && (
      <View style={{
        width:"100%", 
        backgroundColor:"#eee",
        paddingTop: 10,
        //backgroundColor: "#fff",  
        height:40,
        padding:5,
        display:"flex",
        alignContent:"center",
        //alignItems:"center",
        borderRadius: 6,
        fontSize:20,
        marginTop: 4,
      }}>
      <CountryPicker
          withFlag
          onSelect={onSelectTravelerSource}
          styles={{
             fontFamily:"Poppins_400Regular",
          }}
      />
      </View>
       )}

          {travelerS && !tpickup && (
            <Pressable
            onPress={()=>setTravelerS("")}
            style={{
              width:"100%", 
              backgroundColor:"#f6f6fb",
              height:40,
              padding:5,
              display:"flex",
              alignContent:"center",
              //alignItems:"center"
            }}>

        
                <View style={{flexDirection:"row", paddingTop: 4}}>
              <Text style={{fontSize:17, fontFamily: "Poppins_400Regular",}}>
                {travelerS} 
              </Text>
              <Text style={{marginLeft:20, marginTop:5}}>
                <CountryFlag isoCode={travelerSF} size={17} />
              </Text>
              </View>
      
     
      </Pressable>
      )}

                
                                </View>
                                </View>
                                <Text style={{
                                    marginTop: 20,
                                    marginBottom: 3,
                                    fontFamily: "Poppins_400Regular",
                                    //fontSize: 18,
                                }}>
                                    Flying to
                                </Text>
                                <View style={{
                                    borderWidth: 1,
                                    borderWidth: 0,
                                    //borderBottomWidth: 1,
                                    borderColor: 'lightgray',
                                    paddingHorizontal: 5,
                                    //paddingVertical: 5,
                                    borderRadius: 5,
                                    //width: "95%"
                                }}>
                         
       {!travelerD && (
      <View style={{
        width:"100%", 
        backgroundColor:"#eee",
        paddingTop: 10,
        //backgroundColor: "#fff",  
        height:40,
        padding:5,
        display:"flex",
        alignContent:"center",
        //alignItems:"center",
        borderRadius: 6,
        fontSize:20,
        marginTop: 4,
      }}>
      <CountryPicker
          withFlag
          onSelect={onSelectTravelerDestination}
          styles={{
             fontFamily:"Poppins_400Regular",
          }}
      />
      </View>
       )}

          {travelerD && !tdelivery && (
            <Pressable
            onPress={()=>setTravelerD("")}
            style={{
              width:"100%", 
              backgroundColor:"#f6f6fb",
              height:40,
              padding:5,
              display:"flex",
              alignContent:"center",
              //alignItems:"center"
            }}>

        
                <View style={{flexDirection:"row", paddingTop: 4}}>
              <Text style={{fontSize:17, fontFamily: "Poppins_400Regular",}}>
                {travelerD} 
              </Text>
              <Text style={{marginLeft:20, marginTop:5}}>
                <CountryFlag isoCode={travelerDF} size={17} />
              </Text>
              </View>
      
     
      </Pressable>
      )}
                                </View>
                                </ScrollView>
                                <View style = {{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingVertical: 30,
                                }}>
                                   
                                    <Pressable 
                                      onPress={()=>{
                                       clearFilterTraveler()
                                      }}
                                        style = {{
                                          paddingHorizontal: 10,
                                          paddingVertical: 7,
                                          marginHorizontal: 30,
                                          borderRadius: 5,
                                          borderStyle: 'solid',
                                          borderWidth: 1,
                                          borderColor: '#5f43b2',
                                        }}>
                                        <Text style = {{
                                           color: '#5f43b2',
                                        }}>
                                            Discard
                                        </Text>
                                    </Pressable>
      
                                    <Pressable
                                    onPress={filterTravelers} 
                                        style = {{
                                            backgroundColor: '#593196',
                                            //backgroundColor: '#5f43b2',
                                            paddingHorizontal: 30,
                                            paddingVertical: 7,
                                            marginHorizontal: 2,
                                            borderRadius: 5,
                                        }}>
                                        <Text style = {{
                                            color: 'white'
                                        }}>
                                            Apply 
                                        </Text>
                                    </Pressable >
                                </View>
                        </View>  
                        }
      
                  <FlatList
                    // ListHeaderComponent={TravelerHeader}
                    data={travelerTotal}
                    contentContainerStyle={{
                      paddingBottom: 270,
                      paddingTop: 6,
                      backgroundColor: "#fcfbff"
                    }}
                    renderItem={({item}) => {
                      // console.log(item)
                      return (
                        // <TravelerCard traveler= {item} />
                        <TravelerCard item={item} />
                      )
                    }}
                    onEndReached={() => {
                      
                      if(travelersStatus=="All"){
                      if (pageTraveler == pageLimTraveler){
                        return
                      }
      
                      else {
                        changeTravelerPage()
                      }
                    }
                     
                     
                    }}
                  />
                  {loadingTraveler && <View style = {{
                    top: "30%",
                    left: '50%',
                    zIndex: 100000,
                    position: "absolute",
                  }}> 
                   <LottieView
            style={{

              height: 250,
              //left: "5%",
              //right: '20%',
              bottom: '5%',
            
            }}
            source={require('../../assets/loader.json')}

            autoPlay
            loop
            />
                  </View>}
                  
                </View>
              )}
            </View>
          ) : 
          (selectedTab === 2 && b && b.length === 0) || (selectedTab === 1 && t && t.length === 0) ? (
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
              }}>No Ads Found</Text>
            </View>
          ) : (
            <View style={{
              alignItems: "center",
              paddingTop: 60
            }}>
              <ErrorUnDraw />
              <Text style={{
                fontFamily: "Poppins_500Medium",
                marginTop: 20,
                textAlign: "center",
                fontSize: 16
              }}>Something went wrong</Text>
              <Pressable onPress={()=>{
                getUsers()
              }} style={{
                backgroundColor: "#eee",
                borderRadius: 30,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}>
                <Ionicons name="md-reload-outline" size={30} color="#999" />
              </Pressable>
            </View>
          )}

        </View>
        }
        </SafeAreaView>
  )
}

export default ConnectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#fcfbff"
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
    
},
animationContainer: {
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
},
buttonContainer: {
  paddingTop: 20,
},
})