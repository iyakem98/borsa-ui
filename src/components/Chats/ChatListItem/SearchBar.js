import React from "react";
import { TextInput, View } from "react-native";
import { ChatState } from "../../../context/ChatProvider";

function SearchBar() {
  const handleFocus = () => {
    console.log("focused");
  };

  const { setsearchFirstName } = ChatState();

  return (
    <>
      <View>
        <TextInput
          placeholder="Search for users"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onFocus={handleFocus}
          onChangeText={(e) => setsearchFirstName(e)}
        />
      </View>
    </>
  );
}

export default SearchBar;
