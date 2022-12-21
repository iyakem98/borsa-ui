import { useEffect } from 'react'
import {View, Text, StyleSheet, ImageBackground, FlatList, KeyboardAvoidingView, Platform} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'
import bg from '../../assets/images/BG.png'
import messages from '../../assets/data/messages.json'
import Message from '../components/Message'
import InputBox from '../components/Chats/InputBox'



const MessagingScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({title: route.params.name})
  }, [route.params.name])

  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.bg}
    keyboardVerticalOffset = {Platform.OS === 'ios'? 60 : 90}
  >
     <View style = {styles.bg}>
       <FlatList
        data = {messages}
        renderItem = {({item}) => <Message message={item}/>}
        style = {styles.list}
        inverted
       />
       <InputBox/>
    </View>
  </KeyboardAvoidingView>
   
  )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "#ebe4fa",
        backgroundColor: "#fff"
    },

    list: {
        padding: 10,
    }
})

export default MessagingScreen