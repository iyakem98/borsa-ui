import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL } from '../../utils/config'
import { ChatState } from '../../context/ChatProvider'
import { fetchChat } from '../../features/chat/chatSlice'
import { showMessage } from "react-native-flash-message";

const width = Dimensions.get("screen").width

const Buyer = ({
    item,
    onPress
}) => {
    const buyer = item
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId, loading,  setloading } = ChatState(); 
    const navigation = useNavigation();
    const [showModal, setshowModal] = useState(false)
    const [modal, setModal] = useState(false)

    const viewDetail = (user) => {
        alert("detail")
    }

    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);
  useEffect(() =>{

    dispatch(fetchChat())
    // console.log(chattts[1])
    
  
}, [user])
const BuyerChat = async(buyerData)=> {
    const userId = buyerData._id
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
    
            }
        }

        if((chattts.length < 0) || chattts != null || chattts != undefined){
            navigation.navigate('Messaging', {userSelected:
        
                buyerData})
                setloading(false)
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            setchatSelected(true)
            setchattId(data._id)
        }
        else{

            chattts.map(async(chat) => {
                if(chat.users[0]._id == userId || chat.users[1]._id == userId){
                    navigation.navigate('Messaging', {userSelected:
                
                        buyerData})
                    setloading(true)
                    setchatSelected(true)
                    setchattId(chat._id)
                }

                else {
                    navigation.navigate('Messaging', {userSelected:
        
                        buyerData})
                        setloading(false)
                    const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                    setchatSelected(true)
                    setchattId(data._id)
                }
    
              })
           /* navigation.navigate('Messaging', {userSelected:
        
                travData})
                setloading(false)
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            setchatSelected(true)
            setchattId(data._id) */
        }
       
       {/* if(chattts.length > 0){
            chattts.map(async(chat) => {
                console.log("p-=-=-=", chat?.users[1]?._id, userId)
                if(chat.users[0]._id == userId || chat?.users[1]?._id == userId){
                    navigation.navigate('Messaging', {userSelected:
                
                        buyerData})
                    setloading(true)
                    setchatSelected(true)
                    setchattId(chat._id)
                }
                else{
                   
                    navigation.navigate('Messaging', {userSelected:
                
                        buyerData})
                        setloading(false)
                    const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                    setchatSelected(true)
                    setchattId(data._id)
    
    
                }
    
              })

        }
        else{
            setloading(false)
            navigation.navigate('Messaging', {userSelected:
        
                buyerData})
                setloading(false)
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            setchatSelected(true)
            setchattId(data._id)
        } */}
      
    }
    catch(err){
        console.log(err)
}
}

    const locationPickUp = item?.destination.split(", ")
    const locationPickUpLength = locationPickUp.length
    const locationDeparture = item?.departure.split(", ")
    const locationDepartureLength = locationDeparture.length

    const addToWislistTraveler = async() => {
        try {
            // await AsyncStorage.removeItem('@savedTravelers')
          const value = await AsyncStorage.getItem('@savedBuyer');
          let jsonValue = await JSON.parse(value)
          let isInCart = false
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
            await AsyncStorage.setItem('@savedBuyer', JSON.stringify([...jsonValue, item]));
            showMessage({
                message: "Success",
                description: `Item added to wishlist successfully!`,
                type: "success",
            });
          } else if(!isInCart) {
            console.log("ses")
            await AsyncStorage.setItem('@savedBuyer', JSON.stringify([item]));
            showMessage({
                message: "Success",
                description: `Item added to wishlist successfully!`,
                type: "success",
            });
          } else if(isInCart) {
            console.log("asdsad")
            showMessage({
                message: "Already Exists",
                description: `Item already exists in wishlist!`,
                type: "warning",
            });
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
            onPress()
        }}>
            <View style={styles.topWrapper}>
                <View style={styles.horizontal}>
                    {/* <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1681844931547-54cb3b439453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        }}
                        style={styles.image}
                    /> */}
                    <View style={styles.image}>
                        <AntDesign name="gift" size={30} color="#555" />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}>{item.item[0]}</Text>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "Poppins_500Medium",
                            color: "#777"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                    </View>
                </View>
                <View style={styles.horizontal}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: "Poppins_600SemiBold",
                    }}>
                        {item?.totalWeight}
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
                        {locationDepartureLength === 3 ? locationDeparture[2] : locationDeparture[1]}
                    </Text>
                    <Text style={styles.txtCity}>
                        {locationDepartureLength === 3 ? <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</> : locationDeparture[0]}
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
                        {locationPickUpLength === 3 ? <>{`${locationPickUp[0]}, ${locationPickUp[1]}`}</> : locationPickUp[0]}
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
                  backgroundColor: "#593196",
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 8
                }} onPress={()=>{
                    BuyerChat(buyer.user)
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                    color: "#fff"
                  }}>Message</Text>
                </Pressable>
              </View>
              {showModal && <Modal
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
                        }}>{buyer.user.firstName+' '+buyer.user.lastName}</Text>
                    </View>

                  {/*  <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}> */}
                       {/* <Ionicons name="location" size={20} color="black" /> */}
                        {/* <Text> &nbsp; &nbsp; {buyer.user.address}</Text> */}
                        {/*<Text>{buyer.user.address}</Text> 
                    </View> */}

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}>
                         <Foundation name="shopping-bag" size={30} color="black" />
                         {/* <Text> &nbsp; &nbsp; {buyer.item}</Text> */}
                         <Text style = {{
                            fontSize: 22
                         }}>{buyer.item}</Text>
                    </View>

                  {/*  <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}> */}
                        {/* <MaterialCommunityIcons name="weight-kilogram" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; {buyer.TotalWeight}</Text> */}
                        {/* <Text>{buyer.TotalWeight}</Text>
                    </View> */}

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={30} color="black" />
                        {/* <Text> &nbsp; &nbsp; {buyer.status}</Text> */}
                        <Text style = {{
                            fontSize: 22,
                        }}>{buyer.status}</Text>
                    </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>&times;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>}
        </Pressable>
        </>
    )
}

export default Buyer

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
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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
        //backgroundColor: '#593196',
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