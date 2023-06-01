import { View, Text, Pressable, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getUserDetails } from "../features/auth/authSlice";
import { API_BASE_URL } from "../utils/config";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";


const data = [
    { id: '0', imageSource: require('../../assets/images/avatars/blank-avatar.png') },
    { id: '1', imageSource: require('../../assets/images/avatars/bottts1.png') },
    { id: '2', imageSource: require('../../assets/images/avatars/bottts2.png') },
    { id: '3', imageSource: require('../../assets/images/avatars/bottts3.png') },
    { id: '4', imageSource: require('../../assets/images/avatars/bottts4.png') },
    { id: '5', imageSource: require('../../assets/images/avatars/bottts5.png') },
    { id: '6', imageSource: require('../../assets/images/avatars/bottts6.png') },
    { id: '7', imageSource: require('../../assets/images/avatars/bottts7.png') },
    { id: '8', imageSource: require('../../assets/images/avatars/bottts8.png') },
    { id: '9', imageSource: require('../../assets/images/avatars/bottts9.png') },
    { id: '10', imageSource: require('../../assets/images/avatars/bottts10.png') },
    { id: '11', imageSource: require('../../assets/images/avatars/bottts11.png') },
    { id: '12', imageSource: require('../../assets/images/avatars/bottts12.png') },
    { id: '13', imageSource: require('../../assets/images/avatars/bottts13.png') },
    { id: '14', imageSource: require('../../assets/images/avatars/bottts14.png') },
    { id: '15', imageSource: require('../../assets/images/avatars/bottts15.png') },
    { id: '16', imageSource: require('../../assets/images/avatars/bottts16.png') },
    { id: '17', imageSource: require('../../assets/images/avatars/bottts17.png') },
    { id: '18', imageSource: require('../../assets/images/avatars/bottts18.png') },
    { id: '19', imageSource: require('../../assets/images/avatars/bottts19.png') },
    { id: '20', imageSource: require('../../assets/images/avatars/bottts20.png') },
    // Add more images as needed
  ];

  

const numColumns = 4;
const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth / numColumns)-30;
  

const ProfilePicker = () => {
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const [profilePic, setProfilePic] = useState(user.profilePic)

    const [tempPic, setTempPic] = useState(null)

    const handleUpdate = async () => {
       
    
        let userData = {
          //id: user._id,
          "profilePic": tempPic? String(tempPic.id) : profilePic,
        }
    
        axios.put(`${API_BASE_URL}users/profile/?id=${user._id}`, userData,
          { headers: {
            'Content-Type': 'application/json',
        }}).then((data) => {
          alert('profile updated')
          dispatch(getUserDetails(user._id))
          // handleLogout()
          navigation.popToTop()
        }).catch((err) => {dea
          alert("try again pls.")
          console.log("errorr", err)
        }); 
      }
    
      const getImageSourceById = (id) => {
        const item = data.find((item) => item.id === id);
        return item ? item.imageSource : null;
      };
      
    const renderImage = ({ item }) => (
        <TouchableOpacity onPress={() => setTempPic(item)}>
             <Image source={item.imageSource} style={styles.image} />
        </TouchableOpacity>
      );
    
    const handleCancel = () => {
      setTempPic(null)
      navigation.popToTop()
    }
    
  return (
        <View style={styles.container}>
          <LinearGradient  colors={['#593196', "#fff"]} style = {{
                        width: '100%',
                        paddingTop: 100,
            }}>
              <View>
              <Pressable onPress={()=>navigation.popToTop()}
                style = {{
                  paddingLeft: 10,
                }}>
              <FontAwesome5 name="chevron-left" size={24} color="black" />
              </Pressable>
            </View>
            <View style = {{
                marginBottom: 20,
                alignItems: 'center'
            }}>
                {tempPic? (
                    <Image source={tempPic.imageSource} style={{ 
                        width: 120,
                        height: 120,
                        marginTop:0,
                        // borderRadius: "100%",
                        borderRadius: 100,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                       }} />
                ): (
                    <Image source={getImageSourceById(user.profilePic)} style={{ 
                        width: 120,
                        height: 120,
                        marginTop:0,
                        // borderRadius: "100%",
                        borderRadius: 100,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                       }} />
                      
                )}
            </View>
            </LinearGradient>
            <View style = {{
                marginBottom: 10,
            }}>
                <Text style = {{
                    fontSize: 20,
                    fontFamily: "Poppins_400Regular",
                }}>
                   Choose your Bomoji!
                </Text>
                  { (!(user.profilePic == '0') && !tempPic) && (
                  
                  <TouchableOpacity onPress={alert(tempPic)}
                    style = {{
                      flexDirection: 'row',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 5,
                    }}>
                    <Text style = {{
                      fontSize: 16,
                      fontFamily: "Poppins_600SemiBold",
                    }}>
                      Remove My Avatar
                    </Text>
              </TouchableOpacity>
                  )

                  }
                
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 10,
                }}>

                    <TouchableOpacity onPress={handleCancel}
                      style = {{
                          backgroundColor: '#eee',
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 5,
                          marginHorizontal: 5,
                      }}>
                        <Text>
                            Cancel
                        </Text>
                    </TouchableOpacity >

                    {tempPic && <TouchableOpacity onPress={handleUpdate}
                    style = {{
                        backgroundColor: '#593196',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 5,
                        marginHorizontal: 5,
                    }}>
                        <Text style = {{
                            color: '#fff'
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>}

                    

                </View>
            </View>
           
                <FlatList style = {{
                    //backgroundColor: 'yellow',
                }}
                data={data.slice(1, 21)}
                renderItem={renderImage}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={{ flexGrow: 0 }}
                
                />
           
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //paddingTop: 90,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    image: {
      width: imageWidth,
      height: imageWidth,
      margin: 5,
      marginHorizontal: 10,
      borderRadius: 100,
    },
  });
export default ProfilePicker