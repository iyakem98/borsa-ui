import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function ChatListHeader2() {
  const handleFocus = () => {
    console.log("focused");
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Ionicons name="search" size={24} color="gray" />
        <ScrollView>
          <TextInput
            style={{
              paddingHorizontal: 10,
              paddingVertical: 7,
              width: "100%",
              fontSize: 17,
            }}
            placeholder="search for users"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoFocus={false}
            onFocus={handleFocus}
          />
        </ScrollView>
      </View>
    </View>
  );
}

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

export default ChatListHeader2;
