import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EditMyBuyerScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingTop: 30,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            marginTop: 10,
          }}
        >
          My Buyer Card
        </Text>
      </View>

      <View
        style={{
          width: "90%",
          paddingTop: 40,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Edit Location")}
          style={styles.pressable}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Location
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
              }}
            >
              Toronto, Canada
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Edit Buyer Details")}
          style={styles.pressable}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 3,
              }}
            >
              Items
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginVertical: 3,
              }}
            >
              Order Date
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginVertical: 3,
              }}
            >
              Total Weight
            </Text>
          </View>

          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  marginRight: 10,
                  fontSize: 16,
                  marginVertical: 3,
                }}
              >
                Addis Ababa, Ethiopia
              </Text>

              <AntDesign name="right" size={17} color="gray" />
            </View>
            <Text
              style={{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
                marginRight: "15%",
                marginVertical: 3,
              }}
            >
              11/11/22
            </Text>

            <Text
              style={{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
                marginRight: "15%",
                marginVertical: 3,
              }}
            >
              0-5kg
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Edit MyBuyer")}
          style={styles.pressable}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Card Hidden
          </Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
              }}
            >
              No
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Pressable
          style={{
            width: "70%",
            backgroundColor: "#fc3939",
            backgroundColor: "#593196",
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Save Changes
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    justifyContent: "space-between",
    //borderRadius: 30,
    //borderStyle: 'solid',
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginVertical: 5,
    //borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.0,

    elevation: 1,
  },
});

export default EditMyBuyerScreen;
