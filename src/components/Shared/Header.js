import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Header = ({
  backBtn
}) => {
  const navigation = useNavigation();

  return (
    <View style={{
      paddingHorizontal: 15,
      height: 65,
      flexDirection: "row",
      alignItems: "center"
    }}>
      {backBtn ? (
        <Pressable onPress={()=>navigation.goBack()}>
          <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
        </Pressable>
      ) : (null)}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})