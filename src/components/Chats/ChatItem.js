import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchChat } from "../../features/chat/chatSlice";
import { io } from "socket.io-client";
import { API_BASE_URL_Socket } from "../../utils/config";

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
  { id: "admin_photo", imageSource: require("../../../assets/icon.png") },
  // Add more images as needed
];

const ChatItem = ({
  storedNotifications,
  setchattId,
  setloading,
  chat,
  user,
  getSenderFull,
  formatted_date,
  setSelectedChat,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState();
  const [notifLength, setNotifLength] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUserSender, setIsUserSender] = useState(
    chat.latestMessage?.sender?._id === user?._id ? true : false
  );
  const [isMarked, setIsMarked] = useState(chat.latestMessage?.marked);
  var socket = useRef(null);

  useLayoutEffect(() => {
    socket.current = io(API_BASE_URL_Socket);
    socket.current.on("active", () => setIsActive(true));
    socket.current.on("inActive", () => setIsActive(false));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (storedNotifications) {
      setNewMessage();
      storedNotifications.map((notif) => {
        if (notif == undefined) {
          console.log("notif undefined");
        } else {
          if (notif.chat._id == chat._id) {
            setNotifLength((prev) => prev + 1);
            setNewMessage(notif?.content);
            setIsUserSender(false);
          }
        }
      });
    }
  }, [storedNotifications]);

  useEffect(() => {
    setNewMessage();
    dispatch(fetchChat());
  }, [notifLength]);

  const handleMarked = async () => {
    // try {
    //   const res = await axios.put('http://143.198.168.244/api/message/marked', {}, {})
    //   console.log(";;;;", res.data)
    // } catch(e) {
    //   console.log("ERROR WHILE MARKING: ", e)
    // }
  };

  useEffect(() => {
    handleMarked();
  }, []);

  const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };

  return (
    <Pressable
      key={chat._id}
      onPress={() => {
        if (!isUserSender) {
          setIsMarked(true);
        }
        setNotifLength(0);
        setloading(true);
        setchattId(chat._id);
        // chatArr2.push(chat)
        setSelectedChat(chat);
        navigation.navigate("Messaging", {
          userSelected: user != null ? getSenderFull(user, chat.users) : null,
        });
      }}
      style={styles.container}
    >
      <View>
        <Image
          source={
            user != null
              ? getImageSourceById(getSenderFull(user, chat.users)?.profilePic)
              : null
          }
          style={styles.image}
        />
        {isActive ? (
          <View
            style={{
              backgroundColor: "green",
              height: 10,
              width: 10,
              borderRadius: 10,
              position: "absolute",
              bottom: 14,
              right: 14,
            }}
          />
        ) : null}
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {user != null
              ? getSenderFull(user, chat.users)?.firstName +
                " " +
                getSenderFull(user, chat.users)?.lastName
              : null}
          </Text>
          <Text style={styles.subTitle}>{formatted_date}</Text>
        </View>
        {(chat.latestMessage !== null || chat.latestMessage !== undefined) &&
        chat.latestMessage.content != "" ? (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "90%",
              }}
            >
              <Text numberOfLines={2} style={styles.subTitle}>
                {isTyping
                  ? "Typing..."
                  : newMessage
                  ? newMessage
                  : chat.latestMessage.content}
              </Text>
              {/* <Text>{storedNotifications && storedNotifications.length  ? `new message(s) of length ${storedNotifications.length}` : null}</Text> */}
            </View>
          </View>
        ) : (
          <Text>File Uploaded</Text>
        )}
        {isUserSender && !isMarked ? (
          <View style={styles.notifCheckmark}>
            <Ionicons name="checkmark-done" size={20} color="black" />
          </View>
        ) : isUserSender && isMarked ? (
          <View style={styles.notifCheckmark}>
            <Ionicons name="checkmark-done" size={20} color="black" />
          </View>
        ) : notifLength > 0 || (!isUserSender && !isMarked) ? (
          <View style={styles.notif} />
        ) : null}
      </View>
    </Pressable>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 7,
    marginVertical: 0,
    paddingHorizontal: 6,
    paddingVertical: 7,
    height: 77,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  notif: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    bottom: 20,
    backgroundColor: "#7267e7",
    width: 12,
    height: 12,
    borderRadius: 15,
  },
  notifTxt: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  notifClr: {
    color: "red",
  },
  notifCheckmark: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    bottom: 20,
    width: 19,
    height: 19,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: "gray",
    marginTop: 2,
    marginLeft: 2,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
});
