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

const EditTravelerDetails = () => {
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
          Destination
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 5,
            color: "gray",
          }}
        >
          Addis Ababa, Ethiopia
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            marginVertical: 5,
          }}
        >
          Update Destination
        </Text>
        <TextInput
          placeholder="Fill your destination"
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
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontSize: 17,
          }}
        >
          Departure Date
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 5,
            color: "gray",
          }}
        >
          Addis Ababa, Ethiopia
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            marginVertical: 5,
          }}
        >
          Update Departure Date
        </Text>
        <TextInput
          placeholder="Pick the date of your departure"
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

export default EditTravelerDetails;
