import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getSender, getSenderFull } from "../../../ChatConfig/ChatLogics";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { allMessages } from "../../../features/message/messageSlice";
import { ChatState } from "../../../context/ChatProvider";
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { selectedChat, setSelectedChat } = ChatState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allMessages(chat._id));
    setSelectedChat(chat);
  }, []);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Messaging", {
          chatId: chat._id,
          userSelected:
            user != null ? getSenderFull(user, chat.users).userName : null,
        })
      }
      style={styles.container}
    >
      <Image
        source={{
          uri: user != null ? getSenderFull(user, chat.users).profilePic : null,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {user != null ? getSenderFull(user, chat.users).firstName : null}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
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
  },
  subTitle: {
    color: "gray",
  },
  Tex: {
    marginTop: 200,
  },
});

export default ChatListItem;
