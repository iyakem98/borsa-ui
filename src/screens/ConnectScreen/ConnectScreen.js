import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BuyerCard from '../../components/Connect/BuyerCard'
import TravelerCard from './Traveler'
import { getConsumers, getTravelers } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchChat } from '../../features/chat/chatSlice'
import { ChatState } from '../../context/ChatProvider'
import { Feather } from '@expo/vector-icons'
import Buyer from './Buyer'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw'
import ErrorUnDraw from '../../assets/svg/errorUnDraw'
import {registerSheet} from 'react-native-actions-sheet';
import BottomSheet from '../../components/BottomSheet'
import SheetManager from 'react-native-actions-sheet';


const width = Dimensions.get("screen").width

const ConnectScreen = () => {
  registerSheet('example-two', <BottomSheet />);

  const [bottomSheetData, setBottomSheetData] = useState(null)
  const [selectedTab, setSelectedTab] = useState(1)
  const [scrollY, setScrollY] = useState(0);
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
      },[travelers, consumers, pageBuyer])

    const handleLoadMore = () => {
      const { page } = useState(b.length / 10 + 1);
      getUsers({ page }).then((b) => {
        setBuyers(prevBuyers => [...prevBuyers, ...b]);
      });
    };

    const[pagLim, setPageLim] = useState(0)
  
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
    const [pageBuyer, setPageBuyer] = useState(1);
    const [pageTraveler, setPageTraveler] = useState(1);
    const [limit, setLimit] = useState(10);
    const [p, setP] = useState(pageBuyer)

    const [loading, setloading] = useState(true)

    const getUsers = async () => {
      alert('inside get users')
      const config = {
      headers: {
          Authorization: `Bearer ${user.token}`
        }}

    await axios.get(`http://143.198.168.244/api/travels?page=${pageTraveler}&limit=${limit}`, config)
        .then((data) => {
          
          // console.log("tttttttttttttttt:", t)
         setT(data.data.data)
         setPageTraveler(pageTraveler + 1)
         alert(pageTraveler)
         })
        .catch((err) => {
         setT(null)
        });
     
        await axios.get(`http://143.198.168.244/api/buyers?page=${pageBuyer}&limit=${limit}`, config)
        .then((data) => {
          // console.log("bbbbbbbbbbbbb:", b)
         setB(data.data.data)
         setPageBuyer(pageBuyer + 1)
         alert(pageBuyer)

         })
        .catch((err) => {
          if(pageBuyer > 1) {
            alert('end of list bro')
          }
          else {
            setB(null)
          }
        });

        setloading(false)
    }

    const handleBeforeNextPage = async() => {
      // Increment the page

      setPageBuyer(pageBuyer + 1)
    
    
    };


    const re = async() => {
      // Increment the page

      await handleBeforeNextPage()

      getUsers()
    
    
    };

    const handleNextPage = async() => {
      // Increment the page

      await handleBeforeNextPage()

      getUsers()
    
    
    };

    

    const decrementBuyerPage = async() => {
      // Increment the page

      setPageBuyer(pageBuyer - 1)
    
    
    };

    const decFunc = async() => {
      // Increment the page

      await decrementBuyerPage()
      alert(pageBuyer)

      getUsers()
    
    
    };

    const handleEmpty = () => {
      return <Text style={styles.title}> No data present!</Text>;
    };
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
      <Text>
      {b.length}
      </Text>
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
            paddingHorizontal: 10,
            backgroundColor: 'white'
          }}>
            <FlatList
              data={b}
              //maxToRenderPerBatch={3} 
              ListEmptyComponent={handleEmpty}
              contentContainerStyle={{
                paddingBottom: 100
              }}
             
              renderItem={({item}) => {
                // console.log("first", item)
                return (
                  // <BuyerCard buyer={item} />
                  <Buyer item={item} onPress={()=>{
                    // console.log("first")
                    // SheetManager.show('example-two');
                  }}
                  
                  />
                )
              }}
              onEndReached={() => {
                if (b.length < 10) {
                  alert('You have reached the end of the list')
                }

                else {
                  setPageBuyer(pageBuyer + 1)
                  getUsers()
                }
               
              }}
              //inverted
            />
          </View> 
        ) : (
          <View style = {{
            paddingHorizontal: 10,
            backgroundColor: 'white'
          }}>
            <FlatList
              data={t}
              contentContainerStyle={{
                paddingBottom: 100
              }}
              renderItem={({item}) => {
                // console.log(item)
                return (
                  // <TravelerCard traveler= {item} />
                  <TravelerCard item={item} />
                )
              }}
              onEndReached={() => {
                if (t.length < 10) {
                  alert('You have reached the end of the list')
                }

                else {
                  setPageTraveler(pageTraveler + 1)
                  getUsers()
                }
               
              }}
            />
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