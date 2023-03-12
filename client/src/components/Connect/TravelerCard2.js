import {View, Image, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { getSenderFull } from '../../ChatConfig/ChatLogics';
import axios from 'axios';
import moment from 'moment';


const TravelerCard = ({traveler}) => {
    const { user } = useSelector((state) => state.auth)
    // const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId } = ChatState(); 
    const dispatch = useDispatch()
    const navigation = useNavigation();
    var travelerId = useRef(null)
    const [isBuyer, setIsBuyer] = useState(false)
    const now = moment(traveler.lastSeen).format("LT")
    function tweakBuyer() {
        setIsBuyer(!isBuyer)
    }
    
    const TravelerChat = async(travData) => {
        console.log(travData.userName)
        const userId = travData._id
        // console.log(userId)
        // console.log(travelerId.current)
        // try{
            const config = {
              headers: {
                  Authorization: `Bearer ${user.token}`
        
              }
          }
           
        //     // console.log(data._id)
        //     setchatSelected(true)
        
            // navigation.navigate('Messaging', {chatId: data._id, userSelected:
            
            //     user != null ? getSenderFull(user, data.users) : null })
            navigation.navigate('Messaging', {userSelected:
            
                travData})
            // const {data} = await axios.post('http://192.168.100.2:5000/api/chat/', {userId}, config)
            const {data} = await axios.post(BASE_URL + 'chat/', {userId}, config)
            setchattId(data._id)
                
            // }
        //     // return data
            
            
        // catch(err){
        //     console.log(err)
        // }
    }
  return (
        // <View>
        //    <Text>{now}</Text> 
        // </View>
    <View style = {styles.container}>
        <View style = {{
            width: '35%'
        }}>
            <Image 
                source={{uri: traveler.profilePic}}  
                style = {styles.image}
                resizeMode = 'cover'
             />
              <View style = {{
                flexDirection: 'row',
                paddingVertical: 5
              }}>
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
            }}>
                <Text style = {{
                    fontSize: 20,
                    marginTop: 2
                }}>
                    {traveler.firstName + " " + traveler.lastName}
                </Text>
                <Entypo name="magnifying-glass" size={20} color='#593196' style = {{marginHorizontal: 5, marginTop: 5}} />
                
            </View>
            <View style = {styles.destination}>
                <View style = {{
                    backgroundColor: '#593196',
                    marginRight: 7,
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
                    {traveler.destination_city}, 
                </Text>
                <Text style = {{
                    fontSize: 15,
                    marginTop: 5,
                    //color: '#593196'
                }}>
                    {traveler.destination_country}
                </Text>
           </View>
           <View style = {{
                paddingLeft: "17%",
                marginTop: -6,
                //position: 'absolute'
           }}>
            <Text style = {{
                color: '#343a40'
            }}>
                {traveler.flight_date}
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
                {traveler.space_left}
            </Text>


            <Text style = {{
                fontSize: 15,
                marginTop: 2,
                marginHorizontal: 3
            }}>
                available
            </Text>
            
           </View>
            <Pressable style = {{
                backgroundColor: '#13b955',
                width: "70%",
                alignItems: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30

            }} onPress={() => TravelerChat(traveler)}>
                <Text style = {{
                    fontSize: 18,
                    color: 'white'
                }}>
                    Start chatting
                </Text>
            </Pressable>
        </View>
        <View>
            <Pressable>
                <Text style = {{
                    color: "black",
                    fontSize: 18,
                }}>
                    View profile
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
        height: "8%",
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

export default TravelerCard