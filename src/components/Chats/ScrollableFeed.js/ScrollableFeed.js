import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { isSameUser } from "../../../ChatConfig/ChatLogics";
import { ChatState } from "../../../context/ChatProvider";

const ScrollableFeed = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  const [Today, setToday] = useState(false);
  const [Yesterday, setYesterday] = useState(false);
  const [Other, setOther] = useState(false);
  var todaytest = false;
  var yesterdaytest = false;
  var othertest = false;

  useEffect(() => {
    if (todaytest == true) {
      setToday(true);
    } else {
      setToday(false);
    }
    if (yesterdaytest == true) {
      setYesterday(true);
    } else {
      setYesterday(false);
    }
    if (othertest == true) {
      setOther(true);
    } else {
      setOther(false);
    }
  }, []);

  // console.log(todaytest)
  return (
    <FlatList
      data={messages}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      inverted
      maxToRenderPerBatch={2}
      renderItem={(item, i) => {
        let m = item?.item;
        const formatted_date = moment(m.createdAt).format("LT");
        return (
          <>
            <View
              style={[
                styles.container,
                {
                  backgroundColor:
                    m.sender._id === user._id ? "#593196" : "#E8E8E8",
                  alignSelf:
                    m.sender._id === user._id ? "flex-end" : "flex-start",
                  marginTop: isSameUser(messages, m, i, user._id) ? 5 : 10,
                  borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                  borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
                },
              ]}
            >
              <Text
                key={m._id}
                style={{ color: m.sender._id === user._id ? "white" : "black" }}
              >
                {m.content}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: m.sender._id === user._id ? "#fff" : "#404040",
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  {formatted_date}
                </Text>
                {m.sender._id === user._id && m.receiver != null && m.marked ? (
                  <Ionicons
                    name="checkmark-done"
                    size={20}
                    color="white"
                    style={{ marginLeft: 10 }}
                  />
                ) : m.sender._id === user._id &&
                  m.receiver != null &&
                  !m.marked ? (
                  <Ionicons name="checkmark-outline" size={17} color="white" />
                ) : null}
              </View>
            </View>
          </>
        );
      }}
      onEndReached={() => {
        // if (pageBuyer == pageLimBuyer){
        //   return
        // }
        // else {
        //   changeBuyerPage()
        // }
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
  },
  container2: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
  },
  img: {
    height: 100,
    width: 100,
    marginTop: 10,
  },
  time: {
    alignSelf: "flex-end",
  },
});
export default ScrollableFeed;
