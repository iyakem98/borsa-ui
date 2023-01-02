import {View, Text, Image, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
//  import MyTravelerCard from '../../components/MyCards/MyTravelerCard';
// import MyBuyerCard from '../../components/MyCards/MyBuyerCard';

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
        <Text style = {{
            fontSize: 20,
            marginBottom: 15,
        }}>
            My Traveler Card
        </Text>
        <MyTravelerCard/>
        </View>
        
        <View style = {{
            width: '100%',
            height: '30%',
            alignItems: 'center',
        }}>
        <Text style = {{
            fontSize: 20,
            marginBottom: 15,
            position: 'relative'
        }}>
            My Buyer Card
        </Text>
        <MyBuyerCard/>
        </View>
        
    </View>
  )
}

export default MyCards