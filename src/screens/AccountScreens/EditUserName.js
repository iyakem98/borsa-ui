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

const EditUserName = () => {
  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: "#fff",
        paddingHorizontal: 5,
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
            //fontWeight: 'bold',
            fontSize: 17,
          }}
        >
          Current username
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 5,
            color: "gray",
          }}
        >
          @weeknd
        </Text>
      </View>
      <View
        style={{
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            //fontWeight: 'bold',
            fontSize: 17,
            marginVertical: 5,
          }}
        >
          New username
        </Text>
        <TextInput
          placeholder="Enter new username"
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
            Update my username
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditUserName;
