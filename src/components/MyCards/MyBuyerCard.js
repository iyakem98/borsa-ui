import {View, Image, Text, StyleSheet, ImageBackground, Pressable, Alert} from 'react-native'
import { Entypo, MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/config';
import { getUserDetails } from '../../features/auth/authSlice';

const MyBuyerCard = ({buyer}) => {

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const { user } = useSelector((state) => state.auth)
    const [myUser, setMyUser] = useState(myUser)

    const hideBuyerCard = async () => {
       // alert(user.hideBuyerCard)
      if(user.hideBuyerCard){

        let data = {
            // hideBuyerCard: false
        }

        if(user.hideBuyerCard==true){
            // data.hideBuyerCard = false
            alert("it's true")
        }else{
            // data.hideBuyerCard = true
            alert("it's false")
        }
        
        axios .put(`${API_BASE_URL}users/profile?id=${user._id}`, data)
        .then((data) => {
        dispatch(getUserDetails(user._id)) 
     })
        .catch((err) => {
            console.log('error iss:', err)   
            alert('no') 
        });
           
        console.log("iddddd:", user._id)
        //     alert(user._id)
        //     axios .put(`${API_BASE_URL}users/profile/?id=${user._id}`, data,
        //     { headers: {
        //     'Content-Type': 'application/json',
        // }})
        //         .then((data) => {
        //         alert('yes')
        //         })
        //         .catch((err) => {
        //         alert("try again pls.")
        //         });

      } 
    }

    useEffect(() => {  
        setMyUser(user)
     }, [])

  return (
    <View style = {styles.container}>
        <View style = {{
            width: '35%'
        }}>
            <Image 
               source={{
                uri: "https://www.usmagazine.com/wp-content/uploads/2021/01/The-Weeknd-Save-Your-Tears-Plastic-Surgery-Look-Is-Prosthetics-Feature.jpg?w=700&quality=86&strip=all",
                }}
                style = {styles.image}
                resizeMode = 'cover'
             />
              <View style = {styles.location_container}>
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
             
           {/*  <Pressable style = {{
                borderStyle: 'solid',
                borderBottomWidth: 0.8,
                marginLeft: 6,
                width: "65%",
                paddingHorizontal: 2,
                borderColor: "#593196",
             }}>
                <Text style = {{
                    //color: '#593196',
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
                color: `${user.hideBuyerCard ? "red" : "green"}`,
            }}>
                {
                    user.hideBuyerCard==true ? "Inactive" : "Actice"
                }
                
            </Text>
            </View>
            
            <AntDesign name="close" size={24} color="red" />
        </View>

           
            <View style = {styles.destination}>
            <View style = {{
                //backgroundColor: '#593196',
                //backgroundColor: '#a991d4',
                //borderRadius: "50%",
                //padding: 5,
                //marginRight: 5
                
            }}>
                 <Octicons name="list-unordered" size={18} color="#593196" style = {{
                    marginRight: 7,
                    
       }} />
            
            </View>
           
            
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginRight: 2,
                    marginTop: 1,
                    //color: '#593196'
                }}>
                    food items, 
                </Text>
           </View>
           <View style = {styles.date}>
            <Text style = {{
                fontWeight: "",
                color: '#343a40'
            }}>
                11/11/22
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
                3kg
            </Text>
            </View>
            </View>
            <View style = {{
        flexDirection: 'row',
       }}>
        <Pressable onPress={() => navigation.navigate('Edit MyBuyer')}
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
                //backgroundColor: '#13b955',
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
       }}
    //    onPress={createConfirmHidingBuyerCard}
    onPress={hideBuyerCard}
       >
        <Text style = {{
            //color: 'white',
        }}>
            {
              user.hideBuyerCard == true ? "Activate" : "Hide"
            }
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
        backgroundColor: 'white',
        flex : 1,
        marginBottom: 8,
        height: "8%",
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
        borderRadius: "50%",
        borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: '#13b955'
        
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

export default MyBuyerCard