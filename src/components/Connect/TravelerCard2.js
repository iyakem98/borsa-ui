import { View, Image, Modal, Text, StyleSheet, Pressable } from "react-native";
// import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { fetchChat } from "../../features/chat/chatSlice";

const TravelerCard = ({ traveler }) => {
  // console.log(traveler.user._id)
  const { user } = useSelector((state) => state.auth);
  const { chattts } = useSelector((state) => state.chat);
  const { setchatSelected, setchattId, setloading, fetchAgain } = ChatState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modal, setModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [def, setDef] = useState(
    "https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296"
  );
  const [image, setImage] = useState(def);

  useEffect(() => {
    dispatch(fetchChat());
  }, [user]);
  useEffect(() => {
    dispatch(fetchChat());
  }, [fetchAgain]);

  const TravelerChat = async (travData) => {
    const userId = travData._id;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (chattts.length > 0) {
        chattts.map(async (chat) => {
          if (chat.users[0]._id == userId || chat.users[1]._id == userId) {
            navigation.navigate("Messaging", { userSelected: travData });
            setloading(true);
            setchatSelected(true);
            setchattId(chat._id);
          }
        });
      } else {
        navigation.navigate("Messaging", { userSelected: travData });
        setloading(false);
        const { data } = await axios.post(
          `${API_BASE_URL}chat`,
          { userId },
          config
        );
        setchatSelected(true);
        setchattId(data._id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Pressable
        onPress={() => {
          setshowModal(true);
          setModal(true);
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              width: "35%",
            }}
          >
            <Image
              source={{ uri: traveler.user.profilePic }}
              alt="user"
              style={styles.image}
              resizeMode="cover"
            />
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
              }}
            >
              <Entypo name="location-pin" size={20} color="red" />
              <View>
                <Text style={styles.text_loc}>
                  {traveler.user.address
                    ? traveler.user.address
                    : "Unknown city"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "70%",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 2,
                }}
              >
                {traveler.user.firstName + " " + traveler.user.lastName}
              </Text>
            </View>
            <View style={styles.destination}>
              <View
                style={{
                  backgroundColor: "green",
                  marginRight: 7,
                  borderRadius: 50,
                  padding: 2,
                }}
              >
                <MaterialIcons
                  name="flight-takeoff"
                  size={24}
                  color="#fff"
                  style={{
                    marginRight: 2,
                  }}
                />
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginRight: 2,
                  marginTop: 5,
                  //color: '#593196'
                }}
              >
                {traveler.destination_city},
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  //color: '#593196'
                }}
              >
                {traveler.destination}
              </Text>
            </View>
            <View
              style={{
                paddingLeft: "17%",
                marginTop: -6,
                //position: 'absolute'
              }}
            >
              <Text
                style={{
                  color: "#343a40",
                }}
              >
                {traveler.departureDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                paddingHorizontal: 2,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {traveler.luggageSpace}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 2,
                  marginHorizontal: 3,
                }}
              >
                available
              </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "#13b955",
                width: "70%",
                alignItems: "center",
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30,
              }}
              onPress={() => TravelerChat(traveler.user)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                }}
              >
                Start chatting
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                }}
              >
                View profile
              </Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
              setModal(false);
              setshowModal(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                />
                <View
                  style={{
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  <Text>
                    {traveler.user.firstName + " " + traveler.user.lastName}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="location" size={20} color="black" />
                  <Text>{traveler.user.address}</Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    flexDirection: "row",
                  }}
                >
                  <Foundation name="shopping-bag" size={20} color="black" />
                  <Text>Unknown</Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="weight-kilogram"
                    size={20}
                    color="black"
                  />
                  <Text>{traveler.luggageSpace}</Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    flexDirection: "row",
                  }}
                >
                  <MaterialIcons
                    name="pending-actions"
                    size={20}
                    color="black"
                  />
                  <Text>{traveler.status}</Text>
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.textStyle}>&times;</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    flex: 1,
    marginBottom: 8,
    height: "8%",
    // backgroundColor: "#E8E8E8",
    paddingVertical: 10,
    paddingHorizontal: 5,
    //borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderStyle: "solid",
    //borderWidth: 2,
    //borderColor: '#13b955'
  },

  destination: {
    flexDirection: "row",
    // backgroundColor: "#13b955",
    marginVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 6,
    width: 220,
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
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },
  modalText: {
    marginBottom: 16,
    textAlign: "center",
  },
});

export default TravelerCard;
