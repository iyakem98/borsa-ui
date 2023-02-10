import {View, Image, Text, StyleSheet, ImageBackground, Pressable, ScrollView} from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import axios from 'axios';



const TravelerCard = ({traveler}) => {
    const { user } = useSelector((state) => state.auth)
    const TravelerChat = async(travelerID)=> {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
    
            }
        }
    
        // console.log(userId)
    
        const response = axios.post(API_URL, userId, config)
    
        console.log(response)
        
    
        return response.data 

    }
    
  return (
    
    <View style = {styles.container}>
        <View>
        <ImageBackground  source={{uri: traveler.profilePic}}  
           style = {styles.image} resizeMode= 'cover'>
            <View style = {styles.overlay}>
            <Text style = {styles.name}>
                {traveler.firstName + " " + traveler.lastName}
            </Text>

            <View style = {styles.location_container}>
           <Entypo name="location-pin" size={20} color="red" />
           <View style = {styles.location}>
            <Text style = {styles.text_loc}>
                {traveler.city},
            </Text>

            <Text style = {styles.text_loc2}>
                {traveler.country}
            </Text>

           </View>
           </View>
           <View>
            <Text style = {{
                backgroundColor: '#593196',
                color: 'white',
                fontSize: 20,
            }}> Traveler </Text>
           </View>
            </View>
        </ImageBackground>
        </View>

           <View style = {styles.destination}>
           <MaterialIcons name="flight-takeoff" size={24} color="#593196" style = {{
                 marginRight: 2,
           }} />
            
            
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginRight: 2
                }}>
                    {traveler.destination_city}, 
                </Text>
                <Text style = {{
                    fontSize: 16,
                    marginTop: 3
                }}>
                    {traveler.destination_country}
                </Text>
           </View>

           <View style = {styles.date}>
            <Text style = {{
                fontWeight: "bold",
                color: '#343a40'
            }}>
                {traveler.flight_date}
            </Text>
           </View>

           <View style = {styles.space}>
            <View style = {{
                backgroundColor: '#a991d4',
                padding: 6,
                borderRadius: 15
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
                alignSelf: 'center',
                borderWidth: 1,
                padding: 12,
                borderColor: "#593196",
                borderRadius: 30,
                width: "70%",
                alignItems: 'center',
                marginTop: 15,

           }}>
            <Text style = {{
                color: '#593196',
                fontSize: 16
            }}>
                Start chatting!
            </Text>
           </Pressable>
     </View>
     
   
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "90%",
        height: 500,
        marginTop: 30,
        alignSelf: 'center',

        borderRadius: 30,
        overflow: 'hidden',

        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        
        shadowOpacity: 0.10,
        shadowRadius: 1.0,

        elevation: 1,
        
    },

    image: {
        width: "100%",
        height: 300,
        justifyContent: 'flex-end',
        
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    name: {
        //backgroundColor: 'black',
        color: 'white',
        fontSize: 30,

        marginLeft: 5
    },

    location_container: {
        flexDirection: "row",
        paddingTop: 5,
    },

    location: {
        flexDirection: 'row',
    },

    text_loc: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
        marginRight: 3
    },

    text_loc2: {

        color: 'white',
        marginTop: 1,

    },
    destination: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 5
    },

    date: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 5
    },
    space: {
        flexDirection: 'row',
        paddingTop : 10,
        paddingLeft: 5
    }

})
export default TravelerCard