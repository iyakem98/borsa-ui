import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";

const BottomSheet = ({ sheetId }) => {
  const actionSheetRef = useRef(null);
  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled={true}
    >
      <View
        style={{
          padding: 20,
          height: 300,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#f7f7f7",
            borderRadius: 100,
            marginRight: 10,
          }}
        />

        <View style={{ flexGrow: 1 }}>
          <View
            style={{
              width: "100%",
              height: 20,
              backgroundColor: "#f7f7f7",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              width: "80%",
              height: 20,
              backgroundColor: "#f7f7f7",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
