import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInputBase,
} from "react-native";
import TravelerCard from "../components/Connect/TravelerCard";
import travelers from "../../assets/data/travelers.json";
import BuyerCard from "../components/Travelers/BuyerCard";
import buyers from "../../assets/data/buyers.json";
import { useState } from "react";

const TravelerScreen = () => {
  const [isBuyer, setIsBuyer] = useState(false);
  function tweakBuyer() {
    setIsBuyer(!isBuyer);
  }
  return (
    <View style={{ backgroundColor: "white", paddingVertical: 0 }}>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          width: "100%",
          position: "absolute",
          zIndex: 10,
          height: 50,
          alignSelf: "center",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: 30,
          marginBottom: 10,
        }}
        shadowOffset={{ height: 5 }}
        shadowColor="black"
        shadowOpacity={0.1}
      >
        <Pressable
          style={isBuyer ? styles.pressDisabled : styles.pressActive}
          onPress={isBuyer ? () => tweakBuyer() : null}
        >
          <Text
            style={{
              fontSize: 18,
              color: isBuyer ? "black" : "#593196",
              fontWeight: isBuyer ? "0" : "bold",
            }}
          >
            Travelers
          </Text>
        </Pressable>

        <Pressable
          style={isBuyer ? styles.pressActive : styles.pressDisabled}
          onPress={!isBuyer ? () => tweakBuyer() : null}
        >
          <Text
            style={{
              fontSize: 18,
              color: isBuyer ? "#593196" : "black",
              fontWeight: isBuyer ? "bold" : "0",
            }}
          >
            Buyers
          </Text>
        </Pressable>
      </View>
      {isBuyer ? (
        <View
          style={{
            paddingTop: 50,
          }}
        >
          <FlatList
            data={buyers}
            renderItem={({ item }) => <BuyerCard buyer={item} />}
          />
        </View>
      ) : (
        <View
          style={{
            paddingTop: 50,
          }}
        >
          <FlatList
            data={travelers}
            renderItem={({ item }) => <TravelerCard traveler={item} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pressActive: {
    //backgroundColor: '#593196',
    //borderRadius: 30,
    padding: 10,
    width: 100,
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#593196",
  },

  pressDisabled: {
    alignItems: "center",
    padding: 10,
    width: 100,
  },
});

export default TravelerScreen;
