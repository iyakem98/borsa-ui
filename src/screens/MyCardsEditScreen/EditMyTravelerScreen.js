import { View, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet, TextInput } from "react-native"
import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditMyTravelerScreen = () => {
  const navigation = useNavigation()
  return (
    <View style = {{
      paddingTop: 30,
      backgroundColor: '#fff',
      height: "100%",
      width: "100%",
      alignItems: 'center'
  }}>

    <View style = {{
      alignItems: 'center'
    }}>
      <Text style = {{
        fontSize: 25,
        marginTop: 10
      }}>
        My Traveler Card
      </Text>
    </View>

    <View style = {{
      width: '90%',
      paddingTop: 40,
    }}>

       <Pressable onPress={() => navigation.navigate('Edit Location')}
        style = {styles.pressable}>

        <Text style = {{
          fontSize: 16,
        }}>
          Location
        </Text>

        <View style = {{
          flexDirection: 'row'
        }}>
          <Text style = {{
            color: "gray",
            marginRight: 10,
            fontSize: 16,
          }}>
             Toronto, Canada 
          </Text>
          <AntDesign name="right" size={17} color="gray" />
        </View>

      </Pressable>

      
      <Pressable onPress={() => navigation.navigate('Edit Traveler Details')}
        style = {styles.pressable}>

          <View>
                <Text style = {{
                fontSize: 16,
              }}>
                Destination
              </Text>

              <Text style = {{
                fontSize: 16,
              }}>
                Flight Date
              </Text>

          </View>

       
        <View style = {{
          alignItems: 'flex-end',
        }}>
          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
            Addis Ababa, Ethiopia
            </Text>
            
            <AntDesign name="right" size={17} color="gray" />
          </View>
          <Text style = {{
            color: "gray",
            marginRight: 10,
            fontSize: 16,
            marginRight: "15%"
          }}>
            01/01/24 
          </Text>
        </View>
        
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Edit Space Available')}
        style = {styles.pressable}>

        <Text style = {{
          fontSize: 16,
        }}>
          Available Space
        </Text>

        <View style = {{
          flexDirection: 'row'
        }}>
          <Text style = {{
            color: "gray",
            marginRight: 10,
            fontSize: 16,
          }}>
            29kg 
          </Text>
          <AntDesign name="right" size={17} color="gray" />
        </View>

      </Pressable>
      <Pressable onPress={() => navigation.navigate('Edit MyBuyer')}
        style = {styles.pressable}>

        <Text style = {{
          fontSize: 16,
        }}>
          Card Hidden
        </Text>

        <View style = {{
          flexDirection: 'row'
        }}>
          <Text style = {{
            color: "gray",
            marginRight: 10,
            fontSize: 16,
          }}>
            No 
          </Text>
          <AntDesign name="right" size={17} color="gray" />
        </View>

      </Pressable>  
    </View>

   <View style = {{
      width: '100%',
      alignItems: 'center',
      paddingTop: 20,
   }}>
    <Pressable style = {{
      width: "70%",
      backgroundColor: "#fc3939",
      backgroundColor: '#593196',
      backgroundColor: '#13b955',
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 20
      
    }}>

      <Text style = {{
        color: 'white',
        fontSize: 17,
      }}>
        Send request to edit card
      </Text>

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


export default EditMyTravelerScreen