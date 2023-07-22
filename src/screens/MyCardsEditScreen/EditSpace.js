import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

const EditSpace = () => {
  return (
    <View
      style={{
        paddingTop: 20,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View
        style={{
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontSize: 17,
          }}
        >
          Current Space Available
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 5,
            color: "gray",
          }}
        >
          0-5kg
        </Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            marginVertical: 5,
          }}
        >
          Update Space Available
        </Text>
        <TextInput
          placeholder="Enter new email"
          style={{
            width: "85%",
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderStyle: "solid",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "gray",
            fontSize: 15,
            marginBottom: 16,
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#593196",
            paddingVertical: 7,
            paddingHorizontal: 17,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
            }}
          >
            Update my email
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditSpace;
