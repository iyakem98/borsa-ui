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

const EditLocation = () => {
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
          marginVertical: 8,
        }}
      >
        <Text
          style={{
            //fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Current location
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 5,
            color: "gray",
          }}
        >
          Abel Tesfaye
        </Text>
      </View>
      <View
        style={{
          marginVertical: 8,
        }}
      >
        <Text
          style={{
            //fontWeight: 'bold',
            fontSize: 20,
            marginVertical: 5,
          }}
        >
          New location
        </Text>
        <TextInput
          placeholder="Enter new location"
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
            Update my location
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditLocation;
