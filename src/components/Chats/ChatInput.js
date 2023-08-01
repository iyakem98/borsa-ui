import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {React, useState} from "react";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;
const paddingVertical = 8;
const marginVertical = 4;

const ChatInput = ({
  sendMessage,
  newmessage,
  setNewMessage,
  typingHandler,
  activeHandler,
}) => {
  const [inputHeight, setInputHeight] = useState(45); // Initial height of the TextInput
  const containerHeight = Math.max(inputHeight + 20, 2); // Minimum container height is 65

  // Function to update the height of the TextInput based on its content
  const onContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    // Set a maximum height for the TextInput to limit expansion
    const newHeight = Math.min(height, 300); // Adjust the maximum height as needed
    setInputHeight(newHeight);
  };
  return (
    <View style={{ paddingBottom: marginVertical, paddingTop: 4, }}>
      <View
        style={{
          paddingTop: 5,
          width: "100%",
          overflow: "hidden",
         // marginVertical: marginVertical,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            height: 45,
            //paddingVertical: 5,
            paddingHorizontal: 15,
            height: containerHeight,
            paddingTop: 0,
          }}
        >
          <TextInput
            value={newmessage}
            onChangeText={(text) => {
              setNewMessage(text);
            }}
            style={[styles.input, { height: inputHeight + 2 * paddingVertical }]} 
            multiline
            placeholder="Type your message..."
            onChange={() => {
              activeHandler();
              typingHandler();
            }}
            onContentSizeChange={onContentSizeChange}
            onFocus={() => {
              if (newmessage.length > 0) {
                // socket.current.emit('typing', chattId);
              } else {
                // socket.current.emit("stop typing", chattId);
              }
            }}
            onBlur={() => {
              // socket.current.emit("stop typing", chattId);
            }}
          />
          <Pressable
            style={{
              backgroundColor: "#13b955",
              backgroundColor: "#7267e7",
              height: 35,
              width: 35,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (
                newmessage == null ||
                newmessage == undefined ||
                newmessage == ""
              ) {
                console.log("undefined");
              } else {
                sendMessage();
              }
            }}
          >
            <AntDesign name="arrowup" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === "ios" ? 8 : 0,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 2 + paddingVertical,
    borderRadius: 8,
    height: "100%",
    width: width - 75,
    maxHeight: 300, // Set a maximum height for the TextInput
    textAlignVertical: "center",
  },
});
