import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../../../context/ChatProvider";
import { getSenderFull } from "../../../ChatConfig/ChatLogics";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const ChatListHeader = ({ chatArr }) => {
  const { user } = useSelector((state) => state.auth);
  const { settriggerChange, setSelectedChat, setchattId, setloading } =
    ChatState();

  const [triggerChange2, settriggerChange2] = useState(false);
  const navigation = useNavigation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    settriggerChange(true);
    settriggerChange2(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          style={{
            paddingHorizontal: 10,
            paddingVertical: 7,
            width: "100%",
            fontSize: 17,
          }}
          placeholder="search for users"
          placeholderTextColor="gray"
          onFocus={() => {
            settriggerChange(true);
            settriggerChange2(true);
          }}
          onChangeText={(e) => {
            setQuery(e);
            if (e == "" || e == undefined) {
              settriggerChange(false);
              settriggerChange2(false);
            } else {
              settriggerChange(true);
              settriggerChange2(true);
            }
          }}
          autoCapitalize="none"
        />
      </View>
      <View>
        {chatArr &&
          chatArr.map((chat) => {
            if (chat != null && chat.latestMessage != null) {
              formatted_date = moment(chat.latestMessage.createdAt).format(
                "LT"
              );

              if (
                chat?.users &&
                chat?.users[1]?.firstName &&
                chat?.users[1]?.firstName.toLowerCase().includes(query) &&
                chat?.latestMessage != null
              ) {
                if (chat !== null || chat !== undefined) {
                  if (
                    chat.lastestMessage == undefined ||
                    chat.lastestMessage == null
                  ) {
                  }
                  if (chat.latestMessage) {
                    let msgdate = null;
                    msgdate = moment(
                      chat.latestMessage.createdAt,
                      "YYYY-MM-DD"
                    );
                    let today = moment();
                    let d = today.diff(msgdate, "days");
                    if (d == 0) {
                      var formatted_date = null;
                      if (
                        chat.lastestMessage !== undefined ||
                        chat.lastestMessage !== null
                      ) {
                        formatted_date = moment(
                          chat.latestMessage.createdAt
                        ).format("LT");
                      }
                      return (
                        <>
                          {triggerChange2 && (
                            <Pressable
                              key={chat._id}
                              onPress={() => {
                                setSelectedChat(chat);
                                setchattId(chat._id);
                                setloading(true);
                                navigation.navigate("Messaging", {
                                  chatId: chat._id,
                                  userSelected:
                                    user != null
                                      ? getSenderFull(user, chat.users)
                                      : null,
                                });
                              }}
                              style={styles.box}
                            >
                              <View>
                                <Image
                                  source={{
                                    uri:
                                      user != null
                                        ? getSenderFull(user, chat.users)
                                            .profilePic
                                        : null,
                                  }}
                                  style={styles.image}
                                />
                              </View>
                              <View style={styles.content}>
                                <View style={styles.row}>
                                  <Text style={styles.name}>
                                    {user != null
                                      ? getSenderFull(user, chat.users)
                                          .firstName
                                      : null}
                                  </Text>
                                  <Text style={styles.subTitle}>
                                    {formatted_date}
                                  </Text>
                                </View>
                                {chat.latestMessage &&
                                chat.latestMessage.content ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text
                                      numberOfLines={2}
                                      style={styles.subTitle}
                                    >
                                      {chat.latestMessage.content}
                                    </Text>
                                  </View>
                                ) : (
                                  ""
                                )}
                              </View>
                            </Pressable>
                          )}
                        </>
                      );
                    } else if (d == 1) {
                      return (
                        <>
                          {triggerChange2 && (
                            <Pressable
                              key={chat._id}
                              onPress={() => {
                                setSelectedChat(chat);
                                setchattId(chat._id);
                                setloading(true);
                                navigation.navigate("Messaging", {
                                  chatId: chat._id,
                                  userSelected:
                                    user != null
                                      ? getSenderFull(user, chat.users)
                                      : null,
                                });
                              }}
                              style={styles.box}
                            >
                              <View>
                                <Image
                                  source={{
                                    uri:
                                      user != null
                                        ? getSenderFull(user, chat.users)
                                            .profilePic
                                        : null,
                                  }}
                                  style={styles.image}
                                />
                              </View>
                              <View style={styles.content}>
                                <View style={styles.row}>
                                  <Text style={styles.name}>
                                    {user != null
                                      ? getSenderFull(user, chat.users)
                                          .firstName
                                      : null}
                                  </Text>
                                  <Text style={styles.subTitle}>Yesterday</Text>
                                </View>
                                {chat.latestMessage &&
                                chat.latestMessage.content ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text
                                      numberOfLines={2}
                                      style={styles.subTitle}
                                    >
                                      {chat.latestMessage.content}
                                    </Text>
                                  </View>
                                ) : (
                                  ""
                                )}
                              </View>
                            </Pressable>
                          )}
                        </>
                      );
                    } else {
                      var formatted_date = null;
                      if (
                        chat.lastestMessage !== undefined ||
                        chat.lastestMessage !== null
                      ) {
                        formatted_date = moment(
                          chat.latestMessage.createdAt
                        ).format("DD/MM/YY");
                      }

                      return (
                        <>
                          {triggerChange2 && (
                            <Pressable
                              key={chat._id}
                              onPress={() => {
                                setSelectedChat(chat);
                                setchattId(chat._id);
                                setloading(true);
                                navigation.navigate("Messaging", {
                                  chatId: chat._id,
                                  userSelected:
                                    user != null
                                      ? getSenderFull(user, chat.users)
                                      : null,
                                });
                              }}
                              style={styles.box}
                            >
                              <View>
                                <Image
                                  source={{
                                    uri:
                                      user != null
                                        ? getSenderFull(user, chat.users)
                                            .profilePic
                                        : null,
                                  }}
                                  style={styles.image}
                                />
                              </View>
                              <View style={styles.content}>
                                <View style={styles.row}>
                                  <Text style={styles.name}>
                                    {user != null
                                      ? getSenderFull(user, chat.users)
                                          .firstName
                                      : null}
                                  </Text>
                                  <Text style={styles.subTitle}>
                                    {formatted_date}
                                  </Text>
                                </View>
                                {chat.latestMessage &&
                                chat.latestMessage.content ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text
                                      numberOfLines={2}
                                      style={styles.subTitle}
                                    >
                                      {chat.latestMessage.content}
                                    </Text>
                                  </View>
                                ) : (
                                  ""
                                )}
                              </View>
                            </Pressable>
                          )}
                        </>
                      );
                    }
                  }
                }
              }
            }
          })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 16,
    justifyContent: "space-around",
    marginBottom: 5,
  },

  input: {
    flexDirection: "row",
    backgroundColor: "#efefef",
    width: "80%",
    borderRadius: 20,
    paddingLeft: 10,
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  cheader: {
    fontWeight: "bold",
    fontSize: 40,
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
});
export default ChatListHeader;
