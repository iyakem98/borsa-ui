import React from "react";
import { View } from "react-native";
import { ChatState } from "../context/ChatProvider";
import { Text } from "react-native";

function Chattest() {
  const { searchTriggerChange, setsearchTriggerChange } = ChatState();
  return (
    <>
      <View>
        <Text>test chat</Text>
      </View>
    </>
  );
}

export default Chattest;
