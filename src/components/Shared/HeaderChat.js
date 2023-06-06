import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'react-native'

const data = [
  { id: '0', imageSource: require('../../../assets/images/avatars/blank-avatar.png') },
  { id: '1', imageSource: require('../../../assets/images/avatars/bottts1.png') },
  { id: '2', imageSource: require('../../../assets/images/avatars/bottts2.png') },
  { id: '3', imageSource: require('../../../assets/images/avatars/bottts3.png') },
  { id: '4', imageSource: require('../../../assets/images/avatars/bottts4.png') },
  { id: '5', imageSource: require('../../../assets/images/avatars/bottts5.png') },
  { id: '6', imageSource: require('../../../assets/images/avatars/bottts6.png') },
  { id: '7', imageSource: require('../../../assets/images/avatars/bottts7.png') },
  { id: '8', imageSource: require('../../../assets/images/avatars/bottts8.png') },
  { id: '9', imageSource: require('../../../assets/images/avatars/bottts9.png') },
  { id: '10', imageSource: require('../../../assets/images/avatars/bottts10.png') },
  { id: '11', imageSource: require('../../../assets/images/avatars/bottts11.png') },
  { id: '12', imageSource: require('../../../assets/images/avatars/bottts12.png') },
  { id: '13', imageSource: require('../../../assets/images/avatars/bottts13.png') },
  { id: '14', imageSource: require('../../../assets/images/avatars/bottts14.png') },
  { id: '15', imageSource: require('../../../assets/images/avatars/bottts15.png') },
  { id: '16', imageSource: require('../../../assets/images/avatars/bottts16.png') },
  { id: '17', imageSource: require('../../../assets/images/avatars/bottts17.png') },
  { id: '18', imageSource: require('../../../assets/images/avatars/bottts18.png') },
  { id: '19', imageSource: require('../../../assets/images/avatars/bottts19.png') },
  { id: '20', imageSource: require('../../../assets/images/avatars/bottts20.png') },
  // Add more images as needed
];

const getImageSourceById = (id) => {
    const item = data.find((item) => item.id === id);
    return item ? item.imageSource : null;
  };

const HeaderChat = ({
    isActive,
    user,
    selectedChat,
    isTyping,
    loading,
    userSelectedFromConnectCard
}) => {
    const navigation = useNavigation()

    useEffect(() => { 
      console.log("userSelected is", userSelectedFromConnectCard)
    }, [])


  return (
    <View style={{
        overflow: 'hidden',
        paddingBottom: 5,
        backgroundColor: "transparent",
      }}
      >
        <View style={{
          height: 70,
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Pressable onPress={()=>navigation.goBack()} style={{marginRight: 10}}>
              <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
            </Pressable>
            <Pressable 
            onPress={()=> 
              {
                userSelectedFromConnectCard?.firstName &&
                navigation.navigate("Profile", {
                  theUser: userSelectedFromConnectCard
              })}
            }
            >
            <Image
              source={getImageSourceById(userSelectedFromConnectCard?.profilePic)}
              style={{
                height: 50,
                width: 50,
                //borderRadius: 8
                borderRadius: 50
              }}
            />
            </Pressable>
            <View style={{marginLeft: 10}}>
            <Pressable onPress={()=>
            {
              userSelectedFromConnectCard?.firstName &&
              navigation.navigate("Profile", {
                theUser: userSelectedFromConnectCard
            })}
            }
            
                >
              <Text style={{fontFamily: "Poppins_600SemiBold", fontSize: 16}}>
                  {userSelectedFromConnectCard?.firstName ? userSelectedFromConnectCard?.firstName : "Deleted Account"}  
              </Text>
              </Pressable>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                {isActive && !isTyping && !loading ? (
                  <View style={{
                    backgroundColor: 'green',
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    marginRight: 5
                  }} />
                ) : null}
                <Text style={{fontFamily: "Poppins_400Regular", fontSize: 13}}>{loading ? "Loading..." : isTyping ? "Typing..." : isActive ? "Active" : "Offline"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
  )
}

export default HeaderChat

const styles = StyleSheet.create({})