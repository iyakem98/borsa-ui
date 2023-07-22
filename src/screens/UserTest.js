import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLastSeenAndStatus } from "../features/auth/authSlice";

function UserTest() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  var lastSeen = null;
  if (user) {
    var lastSeen = moment(user.lastSeen).format(" LT");
  }

  // const [lastSeen, setlastSeen] = useState(moment(user.lastSeen).format(" LT"))
  const [online, setOnle] = useState("online");
  const [offline, setOffline] = useState("offline");
  const sendUpdatedData = (status, userId) => {
    // console.log('one')
    console.log(userId);
    const userData = {
      status: status,
      userId: userId,
    };
    dispatch(UpdateLastSeenAndStatus(userData));
  };
  const getuser = async () => {
    console.log(await AsyncStorage.getItem("user"));
  };
  //  console.log(user)
  return (
    <View>
      <Pressable onPress={() => sendUpdatedData(online, user._id)}>
        <Text>click here to get updated user status</Text>
      </Pressable>
      <View>
        <Pressable onPress={() => getuser()}>
          <Text>click here to get updated user infor</Text>
        </Pressable>
      </View>
      <Text>user last time before exiting app {lastSeen} </Text>
      {/* <Text>{user.status}</Text> */}
    </View>
  );
}

export default UserTest;
