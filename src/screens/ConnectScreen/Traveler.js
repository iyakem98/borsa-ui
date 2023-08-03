import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ChatState } from '../../context/ChatProvider'
import { fetchChat } from '../../features/chat/chatSlice'
import { API_BASE_URL } from '../../utils/config'
import { FlashMessageTransition, showMessage } from "react-native-flash-message";

const width = Dimensions.get("screen").width

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

const TravelerCard = ({
    item
}) => {
    var changeChat = false
    let traveler = item
    const { user } = useSelector((state) => state.auth)
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId, loading,  setloading, fetchAgain, setfetchAgain, } = ChatState(); 
    const dispatch = useDispatch()
    const navigation = useNavigation();
    var travelerId = useRef(null)
    const [isBuyer, setIsBuyer] = useState(false)
    function tweakBuyer() {
        setIsBuyer(!isBuyer)
    }
var store1 = null
var store2 = null
    const [modal, setModal] = useState(false)
    const [showModal, setshowModal] = useState(false)
    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);
//   useEffect(() =>{

//     dispatch(fetchChat())
//     // console.log(chattts[1])
    
  
// }, [user])
//   useEffect(() =>{

//     dispatch(fetchChat())
//     // console.log(chattts[1])
// }, [])

const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          setIds([])
          savedIds()
    });
    return unsubscribe;
 }, [navigation]);

useEffect(() => {
   savedIds()
}, [ful])

const [ids, setIds] = useState([])
const [ful, setIsFul] = useState(false)

const savedIds = async (id) => {
    let value = await AsyncStorage.getItem('@savedTravelers');
    let jsonValue = await JSON.parse(value)

    let ids = []

    if(value !== null && jsonValue) {
      for (var i = 0; i < jsonValue.length; i++) {
        ids.push(jsonValue[i]?._id)
      }

      setIds(ids)
    }

}



    
const TravelerChat = async(travData) => {
    // setchattId(13)
    // console.log('cccc' + chattId)
    // store2 = true
//     setchattId(false)
// setchattId(123)
// setchattId((state) => {
//   return state
// })
    
    
    // setchattId(121)
    // console.log('ccccddd' + chattId)
    // console.log('ccccss' + chattId)
    const userId = travData._id
    const userFName = travData.firstName
//   console.log(chattts)
    try{
        const config = {
          headers: {
              Authorization: `Bearer ${user.token}`
    
          }
      }
    //   if(!chattts){
    //     console.log("ghiegwighiewg")
    //   }
    //   else{
    //     console.log(chattts)
    //     console.log('existing chat')
    //   }
     
//    console.log(chattts)
                    
                   
                    
                   
                    navigation.navigate('Messaging', {userSelected:
                        
                        travData})
                        
                    // // // console.log("loading" + loading)
                     setloading(true)
                    const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                    // console.log(data)
                    setchatSelected(true)
                    setchattId(data._id)
                    console.log("chatt id"+  chattId)
                  
                    
                    
                    
            
        }
        
        
    catch(err){
        console.log(err)
    }
}
    const createChat = async(chat, userId, travData, userFName ,config)  => {
        // console.log(userFName)
        console.log('user[0]' + chat.users[0].firstName)
        console.log('user[1]' + chat.users[1].firstName)
        // if(chat.users[0]._id == userId || chat.users[1]._id == userId){
        if(chat.users[1]._id == userId){
            console.log('chat exists')
                navigation.navigate('Messaging', {userSelected:
            
                    travData})
                setloading(true)
                // console.log("loading" + loading)
                setchatSelected(true)
                setchattId(chat._id)
            }
            // else if(chat.users[1].firstName != userFName){
            // else if(chat.latestMessage == null || chat.latestMessage == undefined){
            //     // console.log(chat.users[1].firstName )
            //     navigation.navigate('Messaging', {userSelected:
        
            //                     travData})
            //                     setloading(false)
                            // const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                            
            //                 setchatSelected(true)
            //                 setchattId(data._id)   
            // }



        //     else if(chat.users[0]._id != userId ||chat.users[1]._id != userId){
        //     // else if(chat.users[1]._id != userId){
        //         console.log('no chat users')
        //         // console.log(chat.users[1].firstName)
        //         // console.log('chat does not exist')
        //         
        //     }

    }
    const createChat2 = async(chat, userId, travData, userFName ,config)  => {
        navigation.navigate('Messaging', {userSelected:
        
                                travData})
                                setloading(false)
                            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                            setchatSelected(true)
                            setchattId(data._id)   
        
    }
    const locationPickUp = item?.destination.split(", ")
    const locationPickUpLength = locationPickUp.length
    const locationDeparture = item?.departure.split(", ")
    const locationDepartureLength = locationDeparture.length

    const addToWislistTraveler = async() => {
        try {
            // await AsyncStorage.removeItem('@savedTravelers')
          const value = await AsyncStorage.getItem('@savedTravelers');
          let isInCart = false
          let jsonValue = await JSON.parse(value)
          if(value !== null && jsonValue) {
            for (var i = 0; i < jsonValue.length; i++) {
              console.log(jsonValue[i]._id, item?._id)
              if (jsonValue[i]?._id === item?._id) {
                isInCart = true;
              }
            }
          }
          if(!isInCart && value && value.length) {
            console.log("first")
            await AsyncStorage.setItem('@savedTravelers', JSON.stringify([...jsonValue, item]));
            showMessage({
                message: "Success",
                description: `Item added to wishlist successfully!`,
                type: "success",
            });
            // setIds(ids.push(item._id))
            setIsFul(true)
            savedIds()
          } else if(!isInCart) {
            console.log("ses")
            await AsyncStorage.setItem('@savedTravelers', JSON.stringify([item]));
            showMessage({
                message: "Success",
                description: `Item added to wishlist successfully!`,
                type: "success",
            });
            setIsFul(true)
            savedIds()
            // setIds(ids.push(item._id))
          } else if(isInCart) {
            let filtered = jsonValue.filter(
                (j) =>
                j._id != item._id
              );
              await AsyncStorage.setItem('@savedTravelers', JSON.stringify(filtered));
              setIsFul(false)
              let newC = ids.filter(
                (i) =>
               i != item._id
              );
              setIds(newC)
              savedIds()
            showMessage({
                message: "Item Removed",
                description: `Item removed from wishlist!`,
                type: "success",
            });
          }
        } catch (e) {
          console.log("ERROR WHILE FETCH AND STORING WISHLIST: ", e)
        }
    }

    return (
        <>
        <Pressable style={styles.container} 
            onPress={()=>navigation.navigate("Profile", {
                theUser: item?.user
            })}>
  
            <View style={styles.bottomWrapper}>
                <View>
                    <Text style={styles.txtCountry}>
                        {locationDepartureLength === 3 ? locationDeparture[2] : locationDeparture[1]}
                    </Text>
                    <Text style={styles.txtCity}>
                        {locationDepartureLength === 3 ? <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</> : locationDeparture[0]}
                    </Text>
                </View>
                <View style={styles.horizontal}>
                    <View style={styles.dot} />
                    <View style={styles.dottedLine} />
                    <MaterialCommunityIcons name="airplane-takeoff" size={24} color="#7267e7" />
                    <View style={styles.dottedLine} />
                    <View style={styles.dot} />
                </View>
                <View style={{alignItems: "flex-end"}}>
                    <Text style={styles.txtCountry}>
                        {locationPickUp[locationPickUpLength - 1]}
                    </Text>
                    <Text style={styles.txtCity}>
                        {locationPickUpLength === 3 ? <>{`${locationPickUp[0]}, ${locationPickUp[1]}`}</> : locationPickUp[0]}
                    </Text>
                  {/*  <Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 12,
                        color: "#777"
                    }}>
                        {item?.departureDate ? item?.departureDate.slice(0, 10) : ""}
                </Text> */}
                </View>
            </View>
            <View style={styles.topWrapper}>
                <View style={styles.horizontal}>
                    {/* <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1681844931547-54cb3b439453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        }}
                        style={styles.image}
                    /> */}
                    <View>
                <View style = {{
                    flexDirection: 'row'
                }}>
                   {/* <Text style={{
                    fontSize: 14,
                    fontFamily: "Poppins_500Medium",
                    marginRight: 5,
                  }}>Departing on:</Text> */}
                  <AntDesign name="calendar" size={24} color="black" />
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    maxWidth: 300,
                    marginLeft: 5,
                  }}>
                   <Text style = {{
                    fontSize: 14,
                    fontWeight: 'bold'
                   }}>
                   {item?.departureDate ? item?.departureDate.slice(0, 10) : ""}
                   </Text>
                  </View>
                </View>
                  
                </View>
                    
                   {/* <View style={styles.image}>
                        <Fontisto name="shopping-bag" size={28} color="#555" />
                </View> */}
                   {/* <View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                            color: "#777"
                        }}>{item?.user?.email}</Text> 
                    </View> */}
                </View>
                <View style={styles.horizontal}>
                {/*<MaterialIcons name="luggage" size={24} color="" />*/}
                <MaterialCommunityIcons name="bag-personal-outline" size={24} color="black" />
                {user?.isImperial? (
                         <Text style={{
                            fontSize: 18,
                            fontFamily: "Poppins_600SemiBold",
                            color: 'gray',
                        }}>
                            {(item?.luggageSpace*2.20462).toFixed(1)}
                            <Text style={{
                                fontFamily: "Poppins_400Regular",
                                fontSize: 16
                            }}>lb</Text>
                        </Text>
                    ):(
                         <Text style={{
                            fontSize: 18,
                            fontFamily: "Poppins_600SemiBold",
                            color: 'gray'
                        }}>
                            {(item?.luggageSpace*1.0).toFixed(1)}
                            <Text style={{
                                fontFamily: "Poppins_400Regular",
                                fontSize: 16
                            }}>Kg</Text>
                        </Text>
                    )}
                    {/* <Pressable style={styles.dottedButton} onPress={()=>{
                        setModalOpen(true)
                    }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </Pressable> */}
                    <Pressable style={{
                        //backgroundColor: "#eee",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 7,
                        marginLeft: 12
                    }} onPress={addToWislistTraveler}>
                       {
                        ids.includes(item._id) ? 
                        <AntDesign name="heart" size={24} color="#7267e7" />  
                        :
                        <AntDesign name="hearto" size={24} color="black" />
                       }
                    </Pressable>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginTop: 10
              }}>
               {/* <View>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                  }}>Excluded Items</Text>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    maxWidth: 300
                  }}>
                    {item?.item ? item?.item.map((item)=>{
                        return (
                            <Text style={{
                                fontSize: 14,
                                lineHeight: 16,
                                fontFamily: "Poppins_400Regular",
                                color: "#777"
                            }}>{item},</Text>
                        )
                    }) : null}
                  </View>
                </View> */}
               {/* <View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: "Poppins_500Medium",
                  }}>Departure:</Text>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    maxWidth: 300
                  }}>
                   <Text style = {{
                    fontSize: 14
                   }}>
                   {item?.departureDate ? item?.departureDate.slice(0, 10) : ""}
                   </Text>
                  </View>
                </View> */}

               <Pressable onPress={()=>navigation.navigate("Profile", {
                    theUser: item?.user
                })}>
                <View style = {{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

            <Image source={getImageSourceById(item?.user?.profilePic)} style={{ 
                    width: 40,
                    height: 40,
                    marginTop:0,
                    marginRight: 5,
                    // borderRadius: "100%",
                    borderRadius: 100,
                    
                    }} />

                     <View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                    </View>

                </View>
                </Pressable>

               
                <Pressable style={{
                  //backgroundColor: "#13b955",
                  //backgroundColor: 'navy',
                  //backgroundColor: '#009cdc',
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  paddingVertical: 6,
                  borderRadius: 8,
                  borderStyle: 'solid',
                  borderWidth: 1.5,
                  borderRadius: 8
                }} onPress={()=>{ 
                    store1 = true
                    setchattId(null)
                    TravelerChat(traveler.user)
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                    //color: "#fff"
                  }}>Message</Text>
                </Pressable>
              </View>
        </Pressable>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModal(false);
          setshowModal(false)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                    <View style={{
                        marginTop:10,
                        fontSize:20,
                        fontWeight:700
                    }}>
                        <Text style = {{
                            fontSize: 20,
                        }}>{traveler?.user?.firstName+' '+traveler?.user?.lastName}</Text>
                    </View>

                  {/*  <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}> */}
                      {/*  <Ionicons name="location" size={20} color="black" />
                       {/* <Text> &nbsp; &nbsp; {traveler.user.address}</Text> */}
                      {/* <Text>{traveler.user.address}</Text> */}
                   {/* </View> */}

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         {/*<Foundation name="shopping-bag" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; Unknown</Text> */}
                        {/* <Text>Unknown</Text> */}
                    </View>

                    <View style={{
                        marginTop:1,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         <MaterialCommunityIcons name="weight-kilogram" size={30} color="black" />
                         {/* <Text> &nbsp; &nbsp; {traveler.luggageSpace}</Text> */}
                         <Text style = {{
                            fontSize: 22,
                         }}>{traveler.luggageSpace}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={30} color="black" />
                        {/* <Text> &nbsp; &nbsp; {traveler.status}</Text> */}
                        <Text style = {{
                            fontSize: 20,
                        }}>{traveler.status}</Text>
                    </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>&times;</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
        </>
    )
}

export default TravelerCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        // height: 150,
        width: '98%',
        alignSelf: 'center',
        marginBottom: 15,
        //borderWidth: 0.2,
        //borderStyle: "solid",
        borderColor: "#000",
        borderRadius: 5,
        paddingTop: 20,
        justifyContent: "space-between",
        //overflow: "hidden",
        shadowColor: "#593196",
        shadowColor: '#737373',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.28,
        shadowRadius: 3.00,
        
        elevation: 24,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        // paddingRight: 20
    },
    txtCountry: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15
    },
    txtCity: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: "#777",
        maxWidth: 110,
    },
    bottomWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    date: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: "#777"
    },
    dottedLine: {
        borderStyle: "dotted",
        borderColor: "#999",
        borderWidth: 1,
        width: width * 0.15,
        height: 1,
        borderRadius: 1
    },
    dot: {
        backgroundColor: "#999",
        height: 5,
        width: 5,
        borderRadius: 5
    },
    dottedButton: {
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        marginTop: 200,
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
        padding: 5,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#593196',
      },
      buttonClose: {
        //backgroundColor: 'red',
      },
      textStyle: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:30
      },
      modalText: {
        marginBottom: 16,
        textAlign: 'center',
      },
})
