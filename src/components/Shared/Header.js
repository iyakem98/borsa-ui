import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

const Header = ({
  backBtn,
  title,
  shadow,
  onTextChange,
  textField,
  textData,
  onBackPress,
  onChange,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, shadow ? styles.shadow : null]}>
      {backBtn ? (
        <Pressable
          onPress={() => {
            onBackPress ? onBackPress() : null;
            navigation.goBack();
          }}
          style={{
            marginRight: 10,
            // flex: 0.1
          }}
        >
          <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
        </Pressable>
      ) : null}
      {textField ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <TextInput
            label="Type a word to find a chat"
            value={textData}
            onChange={() => onChange(true)}
            onChangeText={(text) => onTextChange(text)}
            mode="outlined"
            autoCapitalize="none"
            style={{
              // flex: 0.7,
              marginTop: 15,
              marginBottom: 13,
              borderColor: "transparent",
              // paddingVertical: 5
            }}
            // error={userPasswordError}
            outlineStyle={{
              backgroundColor: "#fff",
            }}
            placeholderTextColor="#eee"
          />
        </View>
      ) : null}
      {title ? (
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    width: "100%",
    height: 65,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2
  },
});
