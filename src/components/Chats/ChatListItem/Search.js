import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Search() {
  const navigate = useNavigation();
  const handlePress = () => {
    navigate.navigate("Search");
  };
  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="search" size={24} color="black" style={styles.search} />
    </Pressable>
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
  search: {
    paddingRight: 10,
  },
  container: {
    paddingVertical: 16,
    // flexDirection: 'row',
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

export default Search;
