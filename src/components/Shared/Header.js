import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Header = ({
  backBtn,
  title,
  shadow
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, shadow ? styles.shadow : null]}>
      {backBtn ? (
        <Pressable onPress={()=>navigation.goBack()} style={{
          marginRight: 10
        }}>
          <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
        </Pressable>
      ) : (null)}
      {title ? (
        <Text style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18
        }}>{title}</Text>
      ) : (null)}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    height: 65,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  }
})