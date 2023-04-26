import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ChatState } from '../../context/ChatProvider'
import { fetchChat } from '../../features/chat/chatSlice'

const width = Dimensions.get("screen").width

const TravelerCard = ({
    item
}) => {
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

    const [modal, setModal] = useState(false)
    const [showModal, setshowModal] = useState(false)
    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);

  useEffect(() =>{

    dispatch(fetchChat())
    // console.log(chattts[1])
    
  
}, [user])

    
    const TravelerChat = async(travData) => {
        // console.log(travData)
        const userId = travData._id
        // console.log(userId)
        // // console.log(userId)
        // // // console.log(travelerId.current)
        try{
            const config = {
              headers: {
                  Authorization: `Bearer ${user.token}`
        
              }
          }
         console.log(chattts)
        //   console.log(userId)
        //   console.log(chattts[1].users[1]._id)
        // ---
        if(chattts.length > 0){
            chattts.map(async(chat) => {
                if(chat.users[0]._id == userId || chat.users[1]._id == userId){
                    navigation.navigate('Messaging', {userSelected:
                
                        travData})
                    setloading(true)
                    setchatSelected(true)
                    setchattId(chat._id)
                }
                else{
                    
            navigation.navigate('Messaging', {userSelected:
        
                travData})
                setloading(false)
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            setchatSelected(true)
            setchattId(data._id)
                }
            //     else if (chat){
            //         setloading(false)
            //         navigation.navigate('Messaging', {userSelected:
                
            //             travData})
            //         const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            //         setchatSelected(true)
            //         setchattId(data._id)
    
    
            //     }
    
              })

        }
        else{
           
            navigation.navigate('Messaging', {userSelected:
        
                travData})
                setloading(false)
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            setchatSelected(true)
            setchattId(data._id)
        }
        //   ---
        //   for(var i = 0; i < chattts.length ; i++){
        //     if(chattts[i].users[0]._id == userId || chattts[i].users[1]._id == userId){
        //         navigation.navigate('Messaging', {userSelected:
            
        //                 travData})
        //         setloading(true)
        //         setchatSelected(true)
        //         setchattId(chattts[i]._id)
        //     }
        //   }
        //   setloading(true)
        //   navigation.navigate('Messaging', {userSelected:
            
        //     travData})
        //     const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
        //     // console.log(data._id)
        //     setchatSelected(true)
        //     setchattId(data._id)
            // console.log(data._id)
            // setchatSelected(true)
        
            // navigation.navigate('Messaging', {chatId: data._id, userSelected:
            
            //     user != null ? getSenderFull(user, data.users) : null })
                
            }
            // return data
            
            
        catch(err){
            console.log(err)
        }
    }
    const locationPickUp = item?.destination.split(", ")
    const locationPickUpLength = locationPickUp.length
    const locationDeparture = item?.departure.split(", ")
    const locationDepartureLength = locationPickUp.length

    const addToWislistTraveler = async() => {
        console.log("first")
        try {
            // await AsyncStorage.removeItem('@savedTravelers')
          const value = await AsyncStorage.getItem('@savedTravelers');
          let isInCart = false
          if(value !== null) {
            let jsonValue = JSON.parse(value)
            for (var i = 0; i < jsonValue.length; i++) {
              console.log(jsonValue[i]._id, item?._id)
              if (jsonValue[i]?._id === item?._id) {
                isInCart = true;
              }
            }
          }
          if(!isInCart && value !== null) {
            await AsyncStorage.setItem('@savedTravelers', JSON.stringify([ ...value, item]));
          } else if(!isInCart) {
            await AsyncStorage.setItem('@savedTravelers', JSON.stringify([item]));
          }
        } catch (e) {
          console.log("ERROR WHILE FETCH AND STORING WISHLIST: ", e)
        }
    }

    return (
        <>
        <Pressable style={styles.container} onPress={() =>{
            setshowModal(true)
            setModal(true)
        }}>
            <View style={styles.topWrapper}>
                <View style={styles.horizontal}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1681844931547-54cb3b439453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        }}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                            color: "#777"
                        }}>{item?.user?.email}</Text>
                    </View>
                </View>
                <View style={styles.horizontal}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: "Poppins_600SemiBold",
                    }}>
                        {item?.luggageSpace}
                        <Text style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 13
                        }}>Kg</Text>
                    </Text>
                    {/* <Pressable style={styles.dottedButton} onPress={()=>{
                        setModalOpen(true)
                    }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </Pressable> */}
                    <Pressable style={{
                        backgroundColor: "#eee",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 7,
                        marginLeft: 12
                    }} onPress={addToWislistTraveler}>
                        <Text style={{
                            color: "red",
                        }}>Save</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomWrapper}>
                <View>
                    <Text style={styles.txtCountry}>
                        {locationPickUp[locationPickUpLength - 1]}
                    </Text>
                    <Text style={styles.txtCity}>
                        {locationDepartureLength === 3 ? <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</> : locationPickUp[1]}
                    </Text>
                </View>
                <View style={styles.horizontal}>
                    <View style={styles.dot} />
                    <View style={styles.dottedLine} />
                    <MaterialCommunityIcons name="airplane-takeoff" size={24} color="black" />
                    <View style={styles.dottedLine} />
                    <View style={styles.dot} />
                </View>
                <View style={{alignItems: "flex-end"}}>
                    <Text style={styles.txtCountry}>
                        {locationPickUp[locationPickUpLength - 1]}
                    </Text>
                    <Text style={styles.txtCity}>
                        {locationPickUpLength === 3 ? <>{`${locationPickUp[0]}, ${locationPickUp[1]}`}</> : locationPickUp[1]}
                    </Text>
                    <Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 12,
                        color: "#777"
                    }}>
                        {item?.departureDate ? item?.departureDate.slice(0, 10) : ""}
                    </Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginTop: 15
              }}>
                <View>
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
                </View>
                <Pressable style={{
                  backgroundColor: "#13b955",
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 8
                }} onPress={()=>{
                    TravelerChat(traveler.user)
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                    color: "#fff"
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
                      <Image source={{ uri: image }} style={{ 
                        width: 200,
                        height: 200,
                        // borderRadius: "100%",
                        borderRadius: 100,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        }} />
                    <View style={{
                        marginTop:10,
                        fontSize:20,
                        fontWeight:700
                    }}>
                        <Text>{traveler.user.firstName+' '+traveler.user.lastName}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <Ionicons name="location" size={20} color="black" />
                       {/* <Text> &nbsp; &nbsp; {traveler.user.address}</Text> */}
                       <Text>{traveler.user.address}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         <Foundation name="shopping-bag" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; Unknown</Text> */}
                         <Text>Unknown</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         <MaterialCommunityIcons name="weight-kilogram" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; {traveler.luggageSpace}</Text> */}
                         <Text>{traveler.luggageSpace}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={20} color="black" />
                        {/* <Text> &nbsp; &nbsp; {traveler.status}</Text> */}
                        <Text>{traveler.status}</Text>
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
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#eee",
        borderRadius: 5,
        paddingTop: 20,
        justifyContent: "space-between",
        overflow: "hidden"
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 10
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
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
        marginTop: 25,
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
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#593196',
      },
      buttonClose: {
        backgroundColor: 'green',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:19
      },
      modalText: {
        marginBottom: 16,
        textAlign: 'center',
      },
})