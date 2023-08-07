import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Platform,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { ChatState } from "../context/ChatProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { API_BASE_URL, API_BASE_URL_Socket } from "../utils/config";
import moment from "moment";
import HeaderChat from "../components/Shared/HeaderChat";
import ChatInput from "../components/Chats/ChatInput";
import MessageTemplate from "../components/Message/MessageTemplate";
import * as Notifications from "expo-notifications";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const MessagingScreen = ({ navigation }) => {
  const {
    selectedChat,
    setfetchAgain,
    setmessageSentOrReceived,
    chatRoute,
    setNewwMessage,
    chattId,
    loading,
    setloading,
    setactiveToday,
  } = ChatState();
  const { user } = useSelector((state) => state.auth);
  const [newmessage, setNewMessage] = useState("");
  const route = useRoute();
  const { userSelected } = route.params;
  const [messages, setMessages] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  let prevDate = 0;
  const [messagesLength, setMessagesLength] = useState(false);
  const [latestMess, setlatestMess] = useState();
  const [isActive, setIsActive] = useState(false);
  const [active, setIsactive] = useState(false);

  let todayDateLabel = false;
  let yesterdayDateLabel = false;
  let olderDateLabel = false;
  let todayDate = false;
  let yesterdayDate = false;
  let olderDate = false;

  var socket = useRef(null);

  const allowsNotificationsAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
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
            data: { data: "goes here" },
          },
          trigger: { seconds: 2 },
        });
      } else {
        const { status } = await Notifications.requestPermissionsAsync();
      }
    } catch (e) {
      console.log("NOTIFICATION Permission: ", e);
    }
  };

  useLayoutEffect(() => {
    socketCall();
  }, []);

  useEffect(() => {
    console.log("check to see if active value", isActive);
  }, [active]);

  useEffect(() => {
    setMessagesLength(messages.length);
  }, [messages]);

  useEffect(() => {
    fetchMessage();
  }, [chattId]);
  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    chatRouteCompare = chatRoute;
    console.log("chattId", chattId);
  }, []);

  useEffect(() => {
    socket.current.on("message recieved", (newMessageReceived) => {
      testNewMessages(newMessageReceived);
      console.log("first", newMessageReceived);
      sendPush(newMessageReceived);
    });
  }, []);

  useEffect(() => {
    if (socketConnected) {
      activeHandler();
    }
  }, [socketConnected, isActive]);

  // useEffect(() =>{
  //   // console.log('is active value in mess', isActive)
  //   console.log('is active value in mess', isActive)

  //  }, [active])

  const [datesShown, setDatesShown] = useState([]);
  const socketCall = () => {
    socket.current = io(API_BASE_URL_Socket);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setsocketConnected(true));
    // socket.current.emit("active", chattId)
    // socket.current.emit("seen", chattId)
    socket.current.on("active", () => setIsActive(true));
    socket.current.on("inActive", () => setIsActive(false));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));
    //  console.log('socket current active value', socket.current.active)
    // return () => {
    //   socket.current.emit("inActive", chattId)
    //   socket.current.emit("stop typing", chattId)
    // }
  };
  const testNewMessages = async (newMessageReceived) => {
    const { data } = await axios.get(`${API_BASE_URL}message/${chattId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
      },
    });
    setMessages(data?.data, newMessageReceived);
  };

  const sendMessage = async () => {
    setlatestMess(newmessage.trim());
    setactiveToday(true);
    setNewwMessage(true);
    setNewMessage("");
    let now = moment();
    setMessages([
      {
        content: newmessage,
        createdAt: now,
        isLoading: true,
        _id: 60,
        sender: {
          _id: user._id,
        },
      },
      ...messages,
    ]);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}message/`,
        {
          content: newmessage,
          chatId: chattId,
          image: "",
          receiver: route.params.userSelected._id,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
          },
        }
      );
      socket.current.emit("new message", data);
      setMessages([data, ...messages]);
      setNewwMessage(false);
      setmessageSentOrReceived(false);
      setfetchAgain(true);
      setfetchAgain(false);
      setNewMessage("");
      return data;
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const fetchMessage = async (pageNum) => {
    setloading(true);
    try {
      let msgs = await AsyncStorage.getItem(`me&${chattId}`);
      if (msgs) {
        setMessages(JSON.parse(msgs));
      } else {
        setMessages([]);
      }
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
        },
      };
      console.log("-=-=--=");
      const { data } = await axios.get(
        `${API_BASE_URL}message/${chattId}`,
        config
      );
      await AsyncStorage.setItem(`me&${chattId}`, JSON.stringify(data?.data));

      setMessages(data?.data);
      setNewwMessage(false);
      console.log("-=-=");
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const fetchWithPageMessage = async (pageNum) => {
    setloading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("myToken")}`,
        },
      };
      const { data } = await axios.get(
        `${API_BASE_URL}message/${chattId}?page=${pageNum}`,
        config
      );

      setMessages((prev) => [...prev, ...data.data]);
      socket.current.emit("join chat", chattId);
    } catch (error) {}
    setloading(false);
  };
  const typingHandler = (e) => {
    setNewMessage(e);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", chattId);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", chattId);
        setTyping(false);
      }
    }, timerLength);
  };
  const activeHandler = (e) => {
    console.log("initiating active handler");
    // socket.current.emit("connected");
    // console.log(socket.current.emit('inActive', chattId))
    // console.log('is active value after inactivity', socket.current.active )
    var timerLength = 1000;

    socket.current.emit("active", chattId);
    // setActiveHandler()
    // console.log('is active value after activity', isActive )
    // console.log('socket current inactive value', socket.current.inActive)
    setTimeout(() => {
      console.log("isactive value in active handler", isActive);
    }, timerLength);
  };
  const setActiveHandler = () => {
    var timerLength = 5000;
    setTimeout(() => {
      console.log("isactive value in active handler", isActive);
    }, timerLength);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        height: height,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{
          position: "relative",
          flex: 1,
          height: height - 200,
        }}
      >
        <HeaderChat
          onGoBack={() => navigation.pop()}
          isActive={setActiveHandler}
          isActive2={isActive}
          active={active}
          activeHandler={activeHandler}
          user={user}
          selectedChat={selectedChat}
          userSelectedFromConnectCard={userSelected ? userSelected : null}
          isTyping={isTyping}
          loading={loading}
        />
        <FlatList
          data={messages}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          inverted
          maxToRenderPerBatch={2}
          renderItem={(item) => {
            let today = moment();
            let m = item?.item;
            let i = item?.index;
            let d = m?.createdAt ? today.diff(m?.createdAt, "days") : null;

            let dateVisible = false;

            let sameDate = messages.filter(
              (mes) => today.diff(mes?.createdAt, "days") == d
            );

            if (sameDate.indexOf(m) == sameDate.length - 1) {
              dateVisible = true;
              if (d == 0) {
                d = "Today";
              } else if (d == 1) {
                d = "Yesterday";
              } else if (d > 1 && d <= 7) {
                d = moment(m?.createdAt).format("MMM, DD ddd");
              } else if (d > 7 && d < 365) {
                d = moment(m?.createdAt).format("MMM D");
              } else {
                d = moment(m?.createdAt).format("MMM D YYYY");
              }
            }

            return (
              <>
                <MessageTemplate
                  m={m}
                  user={user}
                  i={i}
                  todayDateLabel={todayDateLabel}
                  yesterdayDateLabel={yesterdayDateLabel}
                  olderDateLabel={olderDateLabel}
                  todayDate={todayDate}
                  yesterdayDate={yesterdayDate}
                  olderDate={olderDate}
                  prevDate={prevDate}
                  // d={d}
                />

                {dateVisible && (
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: 4,
                      marginBottom: 4,
                    }}
                  >
                    {d}
                  </Text>
                )}
              </>
            );
          }}
          onEndReached={() => {
            fetchWithPageMessage(pageNum + 1);
            setPageNum((prev) => prev + 1);
          }}
        />
        <ChatInput
          sendMessage={sendMessage}
          newmessage={newmessage}
          setNewMessage={setNewMessage}
          chattId={chattId}
          socket={socket}
          typing={isTyping}
          typingHandler={typingHandler}
          activeHandler={activeHandler}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({});
