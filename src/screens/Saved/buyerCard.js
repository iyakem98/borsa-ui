import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
const width = Dimensions.get("screen").width;

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

const BuyerCard = ({ item, addToWislistTraveler }) => {
  // const { setchattId } = ChatState();
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
  const [modalOpen, setModalOpen] = useState(true);
  const locationPickUp = item?.destination.split(", ");
  const locationPickUpLength = locationPickUp.length;
  const locationDeparture = item?.departure.split(", ");
  const locationDepartureLength = locationDeparture.length;

  const { user } = useSelector((state) => state.auth);

  const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };
  const BuyerChat = async (buyerData) => {
    const userId = buyerData._id;
    const userFName = buyerData.firstName;

    // console.log('trav data', travData)
    // console.log('userId', userId)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      navigation.navigate("Messaging", { userSelected: buyerData });
      setloading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}chat`,
        { userId },
        config
      );
      // console.log('data id', data._id)
      setchatSelected(true);
      setchattId(data._id);
      // console.log("chatt id"+  chattId)
    } catch (err) {
      console.log(err);
    }
  };
  const BuyerChatToBeAdded = () => {
    alert(
      'For this Beta version, you have to go to the "Connect" tab to start a new chat'
    );
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        BuyerChat(item.user);
        // BuyerChatToBeAdded()
        // setchattId(item._id)
        // navigation.navigate('Messaging', {userSelected: item.user})
      }}
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
            {/*<AntDesign name="gift" size={30} color="#555" />*/}
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
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {item?.item[0]}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: "#777",
              }}
            >
              {item?.user?.firstName} {item?.user?.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.horizontal}>
          {user?.isImperial ? (
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {(item?.totalWeight * 2.20462).toFixed(1)}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
                }}
              >
                lb
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {(item?.totalWeight * 1.0).toFixed(1)}
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 13,
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
              backgroundColor: "#eee",
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 7,
              marginLeft: 12,
            }}
            onPress={() => addToWislistTraveler(item._id)}
          >
            <Text
              style={{
                color: "red",
              }}
            >
              Remove
            </Text>
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
          <Text style={styles.txtCity}>
            {locationDepartureLength === 3 ? (
              <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</>
            ) : (
              locationDeparture[0]
            )}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 12,
              color: "#777",
            }}
          >
            {item?.startDate ? item?.startDate.slice(0, 10) : ""}
          </Text>
        </View>
        <View style={styles.horizontal}>
          <View style={styles.dot} />
          <View style={styles.dottedLine} />
          <MaterialCommunityIcons
            name="airplane-takeoff"
            size={24}
            color="black"
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
          <Text style={styles.date}>
            {item?.endDate ? item?.endDate.slice(0, 10) : ""}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BuyerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // height: 150,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#eee",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
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
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
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
});
