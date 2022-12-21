import {View, Image, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons';


const TravelerCard = ({traveler}) => {
  return (
    <View style = {styles.container}>
        <View style = {{
            width: '35%'
        }}>
            <Image 
                source={{uri: traveler.profilePic}}  
                style = {styles.image}
                resizeMode = 'cover'
             />
              <View style = {styles.location_container}>
                <Entypo name="location-pin" size={20} color="red" />
                <View>
                    <Text style = {styles.text_loc}>
                        {traveler.city},
                    </Text>

                    <Text style = {styles.text_loc2}>
                        {traveler.country}
                    </Text>

             </View>
             </View>
        </View>

        <View style = {{
            width: '70%',
            paddingHorizontal: 10
        }}>
            <Text style = {{
                fontSize: 20,
                marginTop: 2
            }}>
                {traveler.name}
            </Text>
            <View style = {styles.destination}>
           <MaterialIcons name="flight-takeoff" size={24} color="#593196" style = {{
                 marginRight: 2,
           }} />
            
            
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginRight: 2,
                    marginTop: 3,
                    color: '#13b955'
                }}>
                    {traveler.destination_city}, 
                </Text>
                <Text style = {{
                    fontSize: 15,
                    marginTop: 3,
                    color: '#13b955'
                }}>
                    {traveler.destination_country}
                </Text>
           </View>
           <View style = {styles.date}>
            <Text style = {{
                fontWeight: "",
                color: '#343a40'
            }}>
                {traveler.flight_date}
            </Text>
           </View>
           <View style = {styles.space}>
            <View style = {{
                paddingVertical: 5
            }}>
            <Text style = {{
                fontWeight: 'bold',
                 fontSize: 18,  
            }}>
                {traveler.space_left}
            </Text>
            </View>
            </View>
            <Pressable style = {{
                backgroundColor: '#a991d4',
                width: 200,
                alignItems: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30

            }}>
                <Text style = {{
                    fontSize: 18
                }}>
                    Start chatting
                </Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flex : 1,
        marginBottom: 8,
        height: 170,
       // backgroundColor: "#E8E8E8",
        paddingVertical: 10,
        paddingHorizontal: 5,
        //borderStyle: 'solid',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E8E8E8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
        
    },

    image: {
        height: 100,
        width: 100,
        borderRadius: "50%",
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#13b955'
        
    },

    location_container: {
        flexDirection: 'row',
        paddingVertical: 5
    },

    destination: {
        flexDirection: 'row',
       // backgroundColor: "#13b955",
        marginVertical: 5,
        borderRadius: 30,
        paddingHorizontal: 6,
        width: 220
    },

    space: {
        width: 70,
    
    }
})

export default TravelerCard