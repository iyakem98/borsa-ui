import { View, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';

const SecurityScreen = () => {
  return (
    <View  style = {{
        paddingTop: 0,
        backgroundColor: '#fff',
        height: "100%",
        alignItems: 'center'
    }}>
       <View style = {{
        width: '100%',
        paddingTop: 0,
      }}>
        
        <Pressable style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Password
          </Text>
            <AntDesign name="right" size={17} color="gray" />
        </Pressable>
        
        <Pressable style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            2-factor authentication
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              On 
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderRadius: 30,
    //borderStyle: 'solid',
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginVertical: 5,
    //borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#E8E8E8',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.00,

    elevation: 1, 
  }
})

export default SecurityScreen