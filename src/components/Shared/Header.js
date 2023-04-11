import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={{
      paddingHorizontal: 15,
      height: 65,
      flexDirection: "row",
      alignItems: "center"
    }}>
      <Pressable onPress={()=>navigation.goBack()}>
        <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})