import { View, Text, StyleSheet, Pressable, Image, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../features/auth/authSlice";

const screenWidth = Dimensions.get('window').width;

const WelcomeImperial = () => {
    const { user } = useSelector((state) => state.auth)
    const [isImperial, setIsImperial] = useState(user.isImperial)
    const [selectedTab, setSelectedTab] = useState(0)
  return (
    <LinearGradient 
    colors={['#705c9d','#593196']}
    style = {{
        height: "100%",
        //alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 15,
        //justifyContent: 'center'
    }}>

<View>

<View style = {{
//paddingHorizontal: 20,
marginBottom: 20,
}}> 
<Text style = {{
    fontSize: 22,
    color: 'white',
    fontFamily: "Poppins_400Regular"
}}>
    Please choose your preferred measurement system:
</Text>
<Text style={styles.optionText}>1. Metric System (SI)</Text>
<Text style={styles.exampleText}>Weight: kg</Text>
<Text style={styles.exampleText}>Distance: km</Text>
<Text style={styles.exampleText}>Date Format: DD/MM/YYYY</Text>
<Text style={styles.optionText}>2. Imperial System </Text>
<Text style={styles.exampleText}>Weight: lb</Text>
<Text style={styles.exampleText}>Distance: mi</Text>
<Text style={styles.exampleText}>Date Format: MM/DD/YYYY</Text>
</View>

<View style = {{
//flexDirection: 'row',
width: '100%',
alignItems: 'center',
//paddingHorizontal: 30,
}}>
     <View style={{
              flexDirection: "row",
              //alignItems: 'center',
              justifyContent: "space-between",
              width: screenWidth - 40,
              marginTop: 15,
              //backgroundColor: "#fff",
              paddingHorizontal: 5,
              borderRadius: 10,
              paddingVertical: 4,
              borderStyle: 'solid',
              borderWidth: 0.6,
              borderColor: '#eee',
            }}>
              <Pressable
                style={{
                    backgroundColor: selectedTab === 1 || (!user.isImperial && selectedTab == 0) ? "#fff" : "transparent",
                    borderRadius: 5,
                    width: "49%",
                    paddingVertical: 7,
                    alignItems: "center",
                    justifyContent: 'center',
                }} onPress={()=>{
                    setSelectedTab(1)
                    setIsImperial(false)
                }}>
                  <Text style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      color: selectedTab === 1 || (!user.isImperial && selectedTab == 0) ? "#000" : '#fff',
                  }}>Metric</Text>
              </Pressable>
              <Pressable 
                style={{
                    backgroundColor: selectedTab === 2 || (user.isImperial && selectedTab == 0) ? "#fff" : "transparent",
                    borderRadius: 5,
                    width: "49%",
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignItems: "center"
                }} onPress={()=>{
                  setSelectedTab(2)
                  setIsImperial(true)
                }}>
                  <Text style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      color: selectedTab === 2 || (user.isImperial && selectedTab == 0) ?  "#000" : '#fff',
                  }}>Imperial</Text>
              </Pressable>
            </View>

</View>
</View>
   </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
    },
    option: {
      backgroundColor: '#F2F2F2',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    selectedOption: {
      backgroundColor: '#AEDCF0',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    optionText: {
      fontSize: 19,
      marginBottom: 5,
      color: 'white',
     fontFamily: "Poppins_600SemiBold",
     marginTop: 20,
    },
    exampleText: {
      fontSize: 14,
      color: 'white',
    fontFamily: "Poppins_400Regular",
    marginLeft: 22,
    },
  });

export default WelcomeImperial