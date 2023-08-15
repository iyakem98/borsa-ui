import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "../context/ChatProvider";
import { fetchChat } from "../features/chat/chatSlice";
import { getSenderFull } from "../ChatConfig/ChatLogics";
import io from "socket.io-client";
import moment from "moment/moment";
import { API_BASE_URL, API_BASE_URL_Socket } from "../utils/config";
import ChatItem from "../components/Chats/ChatItem";
import * as Notifications from "expo-notifications";
import axios from "axios";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { chattts } = useSelector((state) => state.chat);
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();
  const { setloading, isLoading } = ChatState();
  const { messages } = useSelector((state) => state.mess);
  const { setSelectedChat, fetchAgain, setchattId } = ChatState();
  const [visible, setVisible] = useState(false);
  const [Today, setToday] = useState(false);
  const [chatsData, setChatsData] = useState([]);
  const [Yesterday, setYesterday] = useState(false);
  const [otherDs, setotherDs] = useState(false);
  var yesterdaytest = null;
  var todaytest = null;
  const ENDPOINT = "http://192.168.100.2:5000";
  var socket = useRef(null);
  const API_URL = `${API_BASE_URL}chat/`;
  let hasMoreToLoad = false;

  const [socketConnected, setsocketConnected] = useState(false);
  // var storedNotifications = []
  const [storedNotifications, setstoredNotifications] = useState([]);

  let pageNo = 1;
  const allowsNotificationsAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  const fetchAllChats = async () => {
    try {
      const res = await axios.get(
        `http://143.198.168.244/api/chat/v2?page=${pageNo}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data?.chat && res.data?.chat?.length) {
        setChatsData(res.data?.chat);
      }
    } catch (e) {
      console.log("ERROR WHILE FETCHING CHATS : ", e?.response?.data);
    }
  };

  const handleOnEndReached = async () => {
    try {
      if (!hasMoreToLoad) {
        hasMoreToLoad = true;
        const res = await axios.get(
          `http://143.198.168.244/api/chat/v2?page=${pageNo + 1}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (res.data?.chat && res.data?.chat?.length >= 0) {
          setChatsData((prev) => [...prev, ...res.data?.chat]);
          pageNo = pageNo + 1;
        }
      }
    } catch (e) {
      console.log("ERROR WHILE FETCHING CHATS : ", e?.response?.data);
      hasMoreToLoad = false;
    }
  };

  const sendPush = async (newMessage) => {
    const hasPushNotificationPermissionGranted =
      await allowsNotificationsAsync();
    try {
      if (hasPushNotificationPermissionGranted) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New message! 📬",
            body: newMessage?.content,
            data: { data: newMessage },
          },
          trigger: { seconds: 0 },
        });
      } else {
        const { status } = await Notifications.requestPermissionsAsync();
      }
    } catch (e) {
      console.log("NOTIFICATION Permission: ", e);
    }
  };
  // console.log('user', user)
  useLayoutEffect(() => {
    // console.log("before" + socket.current)
    socket.current = io(API_BASE_URL_Socket);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setsocketConnected(true));
  }, []);

  useEffect(() => {
    socket.current.on("message recieved", (newMessageReceived) => {
      storeNotif(newMessageReceived);
      // console.log("===========", newMessageReceived)
      sendPush(newMessageReceived);
    });
  }, []);

  useEffect(() => {
    // dispatch(fetchChat());
    fetchAllChats();
  }, [fetchAgain, storedNotifications]);

  useEffect(() => {
    if (todaytest == true) {
      setToday(true);
      setotherDs(false);
      setYesterday(false);
    } else {
      setToday(false);
    }
  }, [Today]);

  useEffect(() => {
    if (yesterdaytest == true) {
      setYesterday(true);
      setotherDs(false);
      setToday(false);
    } else {
      setYesterday(false);
    }
  }, [Yesterday]);
  const storeNotif = (newMessageReceived) => {
    setstoredNotifications((current) => [...current, newMessageReceived]);
  };

  const renderItem = ({ item, index }) => {
    const chat = item;
    if (chat !== null || chat !== undefined) {
      if (chat.lastestMessage == undefined || chat.lastestMessage == null) {
        // console.log('undefined chat(s)')
        // null;
      }
      if (chat.latestMessage) {
        let msgdate = null;
        msgdate = moment(chat.latestMessage.createdAt, "YYYY-MM-DD");
        let today = moment();
        let d = today.diff(msgdate, "days");
        if (d == 0) {
          var formatted_date = null;
          if (
            chat.lastestMessage !== undefined ||
            chat.lastestMessage !== null
          ) {
            formatted_date = moment(chat.latestMessage.createdAt).format("LT");
          }
          return (
            <ChatItem
              key={index}
              storedNotifications={storedNotifications}
              setchattId={setchattId}
              setloading={setloading}
              chat={chat}
              user={user}
              getSenderFull={getSenderFull}
              formatted_date={formatted_date}
              setSelectedChat={setSelectedChat}
            />
          );
        } else if (d == 1) {
          var formatted_date = "Yesterday";
          return (
            <ChatItem
              key={index}
              storedNotifications={storedNotifications}
              setchattId={setchattId}
              setloading={setloading}
              chat={chat}
              user={user}
              getSenderFull={getSenderFull}
              formatted_date={formatted_date}
              setSelectedChat={setSelectedChat}
            />
          );
        } else {
          var formatted_date = null;
          if (
            chat.lastestMessage !== undefined ||
            chat.lastestMessage !== null
          ) {
            formatted_date = user?.isImperial
              ? moment(chat.latestMessage.createdAt).format("MM/DD/YY")
              : moment(chat.latestMessage.createdAt).format("DD/MM/YY");
          }
          return (
            <ChatItem
              key={index}
              storedNotifications={storedNotifications}
              setchattId={setchattId}
              setloading={setloading}
              chat={chat}
              user={user}
              getSenderFull={getSenderFull}
              formatted_date={formatted_date}
              setSelectedChat={setSelectedChat}
            />
          );
        }
      }
    }
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // setNotification(notification);
        console.log("=====", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        fetchAllChats();
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.con}>
      {chatsData && chatsData.length ? (
        <FlatList
          contentContainerStyle={{
            paddingTop: 10,
          }}
          data={chatsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleOnEndReached}
          initialNumToRender={10}
        />
      ) : (
        <>
          {Platform.OS == "android" ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // height: '100%',
                paddingTop: 30,
              }}
            >
              <Image
                source={require("../../assets/images/pug_glasses.jpeg")}
                style={{
                  width: 260,
                  height: 200,
                  resizeMode: "cover",
                  marginBottom: 20,
                  backgroundColor: "white",
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}
              >
                Security Doggo says hi
              </Text>
              {/*<View style={styles.connectBtn}>
                <Pressable onPress={() => navigation.navigate("Connect")}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    Click here to start chatting{" "}
                  </Text>
                </Pressable>
                  </View> */}
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                paddingTop: 30,
              }}
            >
              <Image
                source={require("../../assets/images/pug_glasses.jpeg")}
                style={{
                  width: 260,
                  height: 200,
                  resizeMode: "cover",
                  marginBottom: 20,
                  backgroundColor: "white",
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}
              >
                Security Doggo says hi
              </Text>
             {/* <Pressable
                style={styles.connectBtn}
                onPress={() => navigation.navigate("Connect")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Click here to start chatting{" "}
                </Text>
                </Pressable> */}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  con: {
    //marginTop: 200,
    //borderRadius: 15,
    backgroundColor: "#fff",
    height: "100%",
  },
  connectBtn: {
    backgroundColor: "#593196",
    width: "65%",
    height: 43,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  connectTxt: {
    fontSize: 20,
  },
  text: {
    marginTop: 200,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    backgroundColor: "#fff",
  },
  notif: {
    alignItems: "flex-end",
  },
  notifClr: {
    color: "red",
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
    borderBottomColor: "lightgray",
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
    fontSize: 15,
  },
  Tex: {
    marginTop: 200,
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
});
