import {View, Image, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyTravelerCard = () => {
    const navigation = useNavigation()
  return (
    <View style = {styles.container}>
    <View style = {{
        width: '35%'
    }}>
        <Image 
           source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Male_Avatar.jpg/800px-Male_Avatar.jpg?20201202061211",
            }}
            resizeMode = 'cover'
            style = {styles.image}
         />
          <View style = {{
            flexDirection: 'row',
            paddingVertical: 5
          }}>
            <Entypo name="location-pin" size={20} color="red" />
            <View>
                <Text style = {styles.text_loc}>
                    Toronto,
                </Text>

                <Text style = {styles.text_loc2}>
                    Canada
                </Text>

         </View>
         </View>
        {/* <Pressable style = {{
            borderStyle: 'solid',
            borderBottomWidth: 0.8,
            marginLeft: 6,
            width: "65%",
            paddingHorizontal: 2,
            borderColor: "#593196",
         }}>
            <Text style = {{
                color: '#593196',
                //color: 'gray',
                fontWeight: 'bold'
            }}>
                View Profile
            </Text>
        </Pressable> */}
    </View>
    

    <View style = {{
        width: '70%',
        paddingHorizontal: 10
    }}>
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 10,
        }}>

            <View style = {{
                flexDirection: 'row'
            }}>
            <Text style = {{
                fontSize: 20,
                marginTop: 2
            }}>
                Abel Tesfaye
            </Text>
            <Text style = {{
                fontSize: 13,
                marginTop: 2,
                marginLeft: 6,
                color: "#13b955",
            }}>
                Active
            </Text>
            </View>
            
            <AntDesign name="close" size={24} color="red" />
        </View>
        <View style = {styles.destination}>
            <View style = {{
                backgroundColor: '#593196',
                marginRight: 7,
                // borderRadius: "50%",
                borderRadius: 50,
                padding: 2                
                }}>
                <MaterialIcons name="flight-takeoff" size={24} color="#fff" style = {{
                marginRight: 2,
        }} />
            
            </View>
       
        
            <Text style = {{
                fontWeight: 'bold',
                fontSize: 15,
                marginRight: 2,
                marginTop: 5,
                //color: '#593196'
            }}>
                Addis Ababa, 
            </Text>
            <Text style = {{
                fontSize: 15,
                marginTop: 5,
                //color: '#593196'
            }}>
                Ethiopia
            </Text>
       </View>
       <View style = {{
            paddingLeft: "18%",
            marginTop: -6,
            //position: 'absolute'
       }}>
        <Text style = {{
            color: '#343a40'
        }}>
            01/01/23
        </Text>
       
        </View>
        <View style = {{
            flexDirection: 'row',
            paddingVertical: 4,
            //width: '42%',
            paddingHorizontal: 2,
            //backgroundColor: '#a991d4'
        }}>
        <Text style = {{
            fontWeight: 'bold',
             fontSize: 18,  
        }}>
            60kg
        </Text>


        <Text style = {{
            fontSize: 15,
            marginTop: 2,
            marginHorizontal: 3
        }}>
            available
        </Text>
        
       </View>
       <View style = {{
        flexDirection: 'row',
       }}>
        <Pressable onPress={() => navigation.navigate('Edit MyTraveler')}
            style = {{
                marginTop: 15,
                width: "55%",
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 4,
                paddingHorizontal: 20,
                backgroundColor: "#E8E8E8",
                backgroundColor: '#593196',
                backgroundColor: '#13b955',
        }}>
                <Text style = {{
                    fontSize: 17,
                    color: 'white'
                }}>
                    Edit Card
                </Text>
       </Pressable>

       <Pressable style = {{
            marginTop: 15,
            width: "35%",
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 2,
            marginLeft: 6,
            paddingHorizontal: 2,
            backgroundColor: "#a991d4",
            backgroundColor: '#593196',
            backgroundColor: '#fc3939',
            backgroundColor: "#e8e8e8",
            borderStyle: 'solid',
            //borderWidth: 0.6,
       }}>
        <Text style = {{
            //color: 'white',
        }}>
            Hide Card
        </Text>
       </Pressable>
       </View>
       
    </View>
</View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        flex : 1,
       //marginBottom: 8,
        //position: 'absolute',
        height: "30%",
       // marginTop: '10%',
        width: '95%',
       // backgroundColor: "#E8E8E8",
        paddingVertical: 10,
        paddingHorizontal: 5,
        //borderStyle: 'solid',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E8E8E8',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 6.00,

        elevation: 1,
        
    },

    image: {
        height: 100,
        width: 100,
        // borderRadius: "50%",
        borderRadius: 50,
        borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: '#13b955'
        
    },

  

    destination: {
        flexDirection: 'row',
       // backgroundColor: "#13b955",
        marginVertical: 5,
        borderRadius: 30,
        paddingHorizontal: 6,
        width: 220
    },

    
})

export default MyTravelerCard

