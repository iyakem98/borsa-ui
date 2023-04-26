import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { Button } from 'react-native-paper';
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MyTravelerCard from '../../components/MyCards/MyTravelerCard';
import MyBuyerCard from '../../components/MyCards/MyBuyerCard';

const MyCards = () => {
  return (
    <View style = {{
        height: "100%",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: "5%"
    }}>

        <View style = {{
            width: '100%',
            height: '30%',
            alignItems: 'center',
            marginBottom: 50,
        }}>
       <Text
       style={{
        marginTop: "40%"
       }}
       >No card found. Cards you post will appear here.</Text>
       <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    width: "100%",
                }} >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>Post a Card</Text>
                </Pressable>
        </View>
        
    </View>
  )
}

export default MyCards