import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AntDesign,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../utils/config";
import { ChatState } from "../../context/ChatProvider";
import { fetchChat } from "../../features/chat/chatSlice";
import { showMessage } from "react-native-flash-message";

const data = [
  {
    id: "0",
    imageSource: require("../../../assets/images/avatars/blank-avatar.png"),
  },
  {
    id: "1",
    imageSource: require("../../../assets/images/avatars/bottts1.png"),
  },
  {
    id: "2",
    imageSource: require("../../../assets/images/avatars/bottts2.png"),
  },
  {
    id: "3",
    imageSource: require("../../../assets/images/avatars/bottts3.png"),
  },
  {
    id: "4",
    imageSource: require("../../../assets/images/avatars/bottts4.png"),
  },
  {
    id: "5",
    imageSource: require("../../../assets/images/avatars/bottts5.png"),
  },
  {
    id: "6",
    imageSource: require("../../../assets/images/avatars/bottts6.png"),
  },
  {
    id: "7",
    imageSource: require("../../../assets/images/avatars/bottts7.png"),
  },
  {
    id: "8",
    imageSource: require("../../../assets/images/avatars/bottts8.png"),
  },
  {
    id: "9",
    imageSource: require("../../../assets/images/avatars/bottts9.png"),
  },
  {
    id: "10",
    imageSource: require("../../../assets/images/avatars/bottts10.png"),
  },
  {
    id: "11",
    imageSource: require("../../../assets/images/avatars/bottts11.png"),
  },
  {
    id: "12",
    imageSource: require("../../../assets/images/avatars/bottts12.png"),
  },
  {
    id: "13",
    imageSource: require("../../../assets/images/avatars/bottts13.png"),
  },
  {
    id: "14",
    imageSource: require("../../../assets/images/avatars/bottts14.png"),
  },
  {
    id: "15",
    imageSource: require("../../../assets/images/avatars/bottts15.png"),
  },
  {
    id: "16",
    imageSource: require("../../../assets/images/avatars/bottts16.png"),
  },
  {
    id: "17",
    imageSource: require("../../../assets/images/avatars/bottts17.png"),
  },
  {
    id: "18",
    imageSource: require("../../../assets/images/avatars/bottts18.png"),
  },
  {
    id: "19",
    imageSource: require("../../../assets/images/avatars/bottts19.png"),
  },
  {
    id: "20",
    imageSource: require("../../../assets/images/avatars/bottts20.png"),
  },
  // Add more images as needed
];

const width = Dimensions.get("screen").width;

const Buyer = ({ item, onPress }) => {
  const buyer = item;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chattts, isLoading, isError, message } = useSelector(
    (state) => state.chat
  );
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    chatSelected,
    setchatSelected,
    chattId,
    setchattId,
    loading,
    setloading,
  } = ChatState();
  const navigation = useNavigation();
  const [showModal, setshowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false)

  const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };

  const viewDetail = (user) => {
    alert("detail");
  };

  const [def, setDef] = useState(
    "https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296"
  );
  const [image, setImage] = useState(def);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIds([]);
      savedIds();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    savedIds();
  }, [ful]);

  const [ids, setIds] = useState([]);
  const [ful, setIsFul] = useState(false);

  const savedIds = async (id) => {
    let value = await AsyncStorage.getItem("@savedBuyer");
    let jsonValue = await JSON.parse(value);

    let ids = [];

    if (value !== null && jsonValue) {
      for (var i = 0; i < jsonValue.length; i++) {
        ids.push(jsonValue[i]?._id);
      }

      setIds(ids);
    }
  };

  const BuyerChat = async (buyerData) => {
    const userId = buyerData._id;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      navigation.navigate("Messaging", { userSelected: buyerData });

      // // // console.log("loading" + loading)
      setloading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}chat`,
        { userId },
        config
      );
      // console.log(data)
      setchatSelected(true);
      setchattId(data._id);
      // console.log("chatt id"+  chattId)

      // if((chattts.length < 0) || chattts != null || chattts != undefined){
      //     navigation.navigate('Messaging', {userSelected:

      //         buyerData})
      //         setloading(false)
      //     const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
      //     setchatSelected(true)
      //     setchattId(data._id)
      // }
      // else{

      //     chattts.map(async(chat) => {
      //         if(chat.users[0]._id == userId || chat.users[1]._id == userId){
      //             navigation.navigate('Messaging', {userSelected:

      //                 buyerData})
      //             setloading(true)
      //             setchatSelected(true)
      //             setchattId(chat._id)
      //         }

      //         else {
      //             navigation.navigate('Messaging', {userSelected:

      //                 buyerData})
      //                 setloading(false)
      //             const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
      //             setchatSelected(true)
      //             setchattId(data._id)
      //         }

      //       })
      //    /* navigation.navigate('Messaging', {userSelected:

      //         travData})
      //         setloading(false)
      //     const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
      //     setchatSelected(true)
      //     setchattId(data._id) */
      // }

      {
        /* if(chattts.length > 0){
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
        } */
      }
    } catch (err) {
      console.log(err);
    }
  };

  const locationPickUp = item?.destination.split(", ");
  const locationPickUpLength = locationPickUp.length;
  const locationDeparture = item?.departure.split(", ");
  const locationDepartureLength = locationDeparture.length;

  const addToWislistTraveler = async () => {
    try {
      // await AsyncStorage.removeItem('@savedTravelers')
      const value = await AsyncStorage.getItem("@savedBuyer");
      let jsonValue = await JSON.parse(value);
      let isInCart = false;
      if (value !== null && jsonValue) {
        for (var i = 0; i < jsonValue.length; i++) {
          console.log(jsonValue[i]._id, item?._id);
          if (jsonValue[i]?._id === item?._id) {
            isInCart = true;
          }
        }
      }
      if (!isInCart && value && value.length) {
        console.log("first");
        await AsyncStorage.setItem(
          "@savedBuyer",
          JSON.stringify([...jsonValue, item])
        );
        showMessage({
          message: "Success",
          description: `Item added to wishlist successfully!`,
          type: "success",
        });
        setIsFul(true);
        savedIds();
      } else if (!isInCart) {
        console.log("ses");
        await AsyncStorage.setItem("@savedBuyer", JSON.stringify([item]));
        showMessage({
          message: "Success",
          description: `Item added to wishlist successfully!`,
          type: "success",
        });
        setIsFul(true);
        savedIds();
      } else if (isInCart) {
        let filtered = jsonValue.filter((j) => j._id != item._id);
        await AsyncStorage.setItem("@savedBuyer", JSON.stringify(filtered));
        setIsFul(false);
        let newC = ids.filter((i) => i != item._id);
        setIds(newC);
        savedIds();
        showMessage({
          message: "Item Removed",
          description: `Item removed from wishlist!`,
          type: "warning",
        });
      }
    } catch (e) {
      console.log("ERROR WHILE FETCH AND STORING WISHLIST: ", e);
    }
  };

  const descriptionPlus = () => {
    setDescriptionModal(!descriptionModal)
    setTimeout(() => {
      setDescriptionModal(false);
    }, 10000); // 10000 milliseconds (10 seconds)
  }
 


  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate("Profile", {
            theUser: item?.user,
          })
        }
      >
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
              <View style = {{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 3,
                }}
              >
                {item.item[0]}
              </Text>
              
              {buyer.description && 
                    <Pressable onPress={descriptionPlus}
                      style = {{
                        //paddingVertical: 5,
                        //backgroundColor: '#f5f5f5',
                      // marginTop: 10,
                      marginLeft: 3,
                      }}>
                        {descriptionModal? (
                          <MaterialCommunityIcons name="arrow-collapse" size={20} color="#5f43b2" />
                        ): (
                          <AntDesign name="infocirlceo" size={20} color="#5f43b2" />
                        )}
                      
                    </Pressable>
                  }

              </View>
             
              {/* <Pressable onPress={()=>navigation.navigate("Profile", {
                    theUser: item?.user
                })}>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "Poppins_500Medium",
                            color: "#777"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                    </Pressable> */}
            </View>
          </View>
          <View style={styles.horizontal}>
            {user?.isImperial ? (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                {(item?.totalWeight * 2.20462).toFixed(1)}
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                  }}
                >
                  lb
                </Text>
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                {(item?.totalWeight * 1.0).toFixed(1)}
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                  }}
                >
                  kg
                </Text>
              </Text>
            )}

            {/* <Pressable style={styles.dottedButton} onPress={()=>{
                        setModalOpen(true)
                    }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </Pressable> */}
            <Pressable
              style={{
                //backgroundColor: "#eee",
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 7,
                marginLeft: 12,
              }}
              onPress={addToWislistTraveler}
            >
              {ids.includes(item._id) ? (
                <AntDesign name="heart" size={24} color="#fc3939" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <View>
            <Text style={styles.txtCountry}>
              {locationDepartureLength === 3
                ? locationDeparture[2]
                : locationDeparture[1]}
            </Text>
            <Text style={styles.txtCity1}>
              {locationDepartureLength === 3 ? (
                <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</>
              ) : (
                locationDeparture[0]
              )} 
            </Text>
          </View>
          <View style={styles.horizontal}>
            <View style={styles.dot} />
            <View style={styles.dottedLine} />
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={24}
              //color="#593196"
            />
            <View style={styles.dottedLine} />
            <View style={styles.dot} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.txtCountry}>
              {locationPickUp[locationPickUpLength - 1]}
            </Text>
            <Text style={styles.txtCity}>
              {locationPickUpLength === 3 ? (
                <>{`${locationPickUp[0]}, ${locationPickUp[1]}`}</>
              ) : (
                locationPickUp[0]
              )}
            </Text>
            {/*<Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 12,
                        color: "#777"
                    }}>
                        {item?.departureDate ? item?.departureDate.slice(0, 10) : ""}
                </Text> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            paddingHorizontal: 10,
            paddingVertical: 8,
            //marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={getImageSourceById(item?.user?.profilePic)}
              style={{
                width: 40,
                height: 40,
                marginTop: 0,
                marginRight: 5,
                // borderRadius: "100%",
                borderRadius: 100,
              }}
            />

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 2,
                }}
              >
                {item?.user?.firstName} {item?.user?.lastName}
              </Text>
            </View>
          </View>
          {/*  <View>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                  }}>All Items</Text>
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
          <Pressable
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderRadius: 8,
              borderStyle: 'solid',
              borderWidth: 0,
              borderRadius: 8,
              //borderColor: '#5f43b2',
              backgroundColor: '#5f43b2',
            }}
            onPress={() => {
              BuyerChat(buyer.user);
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
                color: "#fff",
                //color: '#5f43b2',
              }}
            >
              Message
            </Text>
          </Pressable>
        </View>
        {descriptionModal && (
         <View style = {{
          paddingVertical: 6,
          paddingHorizontal: 3,
         }}>
          <Text style = {{
            fontFamily: "Poppins_500Medium",
          }}>
            Extra Note:  
            <Text style = {{
              fontFamily: 'Poppins_400Regular'
            }}>
              {" "}{buyer.description}
            </Text>
          </Text>
         </View>
        )}
      </Pressable>
    </>
  );
};

export default Buyer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    //height: 250,
    width: "98%",
    alignSelf: 'center',
    marginBottom: 15,
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderColor: "#eee",
    borderRadius: 5,
    paddingTop: 6,
    //justifyContent: "space-between",
    //overflow: "hidden",
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
    //height: 50,
    //width: 50,
    borderRadius: 5,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 10 ,
    // paddingRight: 20
  },
  txtCountry: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
  },
  txtCity: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#777",
    maxWidth: 110,
  },
  txtCity1: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#777",
    maxWidth: 110,
    marginBottom: 15,
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //marginTop: 2,
    //paddingVertical: 5,
    paddingHorizontal: 10,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  date: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#777",
  },
  dottedLine: {
    borderStyle: "dotted",
    borderColor: "#999",
    borderWidth: 1,
    width: width * 0.15,
    height: 1,
    borderRadius: 1,
  },
  dot: {
    backgroundColor: "#999",
    height: 5,
    width: 5,
    borderRadius: 5,
  },
  dottedButton: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#593196",
  },
  buttonClose: {
    //backgroundColor: '#593196',
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  modalText: {
    marginBottom: 16,
    textAlign: "center",
  },
});
