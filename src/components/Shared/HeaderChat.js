import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { Image } from 'react-native'

const HeaderChat = ({
    isActive,
    isActive2,
    active,
    activeHandler,
    user,
    selectedChat,
    isTyping,
    loading,
    userSelectedFromConnectCard
}) => {
  const navigation = useNavigation()

  useEffect(() => {
    isActive()
   console.log('is acitve 2', isActive2)
    
  }, [])
  // console.log('active in header', isActive)
  // console.log("is active", active)
  // console.log("is active", isActive)
  // console.log("is typing", isTyping)
   
  return (
    <View style={{
        overflow: 'hidden',
        paddingBottom: 5,
        backgroundColor: "transparent"
      }}>
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
            <Image
              source={{uri: user?.profilePic}}
              style={{
                height: 50,
                width: 50,
                borderRadius: 8
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontFamily: "Poppins_600SemiBold", fontSize: 16}}>{userSelectedFromConnectCard && userSelectedFromConnectCard.firstName ? userSelectedFromConnectCard?.firstName : selectedChat?.users[0]?._id === user?._id ? selectedChat?.users[1]?.firstName : selectedChat?.users[0]?.firstName} {userSelectedFromConnectCard && userSelectedFromConnectCard.lastName ? userSelectedFromConnectCard?.lastName : selectedChat?.users[0]?._id === user?._id ? selectedChat?.users[1]?.lastName : selectedChat?.users[0]?.lastName}</Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                {/* {isActive && !isTyping && !loading ? (
                  <View style={{
                    backgroundColor: 'green',
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    marginRight: 5
                  }} />
                ) : null} */}
                {isActive2 ? (
                  <View style={{
                    backgroundColor: 'green',
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    marginRight: 5
                  }} />
                ) : null}
                <Text style={{fontFamily: "Poppins_400Regular", fontSize: 13}}>{loading ? "Loading..." : isTyping ? "Typing..." : isActive2 ? "Active" : "Offline"}</Text>
                {/* {isActive2 &&<Text style={{fontFamily: "Poppins_400Regular", fontSize: 13}}>Active</Text>} */}
                {/* {isTyping &&<Text style={{fontFamily: "Poppins_400Regular", fontSize: 13}}>Typing ...</Text>} */}
              </View>
            </View>
          </View>
        </View>
      </View>
  )
}

export default HeaderChat

const styles = StyleSheet.create({})