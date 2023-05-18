import { Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

const ChatInput = ({
    sendMessage,
    newmessage,
    setNewMessage,
    chattId,
    socket
}) => {
  return (
    <View
        style={{
            paddingTop: 5,
            width: '100%',
            overflow: "hidden",
        }}
    >
        <View style={{
            backgroundColor: '#fff',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            height: 60,
            paddingVertical: 5,
            paddingHorizontal: 15
        }}>
        <TextInput
            value={newmessage}
            onChangeText={(text)=>{
            setNewMessage(text)
            }}
            style = {styles.input} 
            multiline
            placeholder='type your message...'
            onFocus={()=>{
            if(newmessage.length > 0) {
                socket.current.emit('typing', chattId);
            } else {
                socket.current.emit("stop typing", chattId);
            }
            }}
            onBlur={()=>{
            socket.current.emit("stop typing", chattId);
            }}
        />
        <Pressable style={{
            backgroundColor: "#593196",
            height: 50,
            width: 50,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center"
        }} onPress={() => {
            if(newmessage == null || newmessage == undefined || newmessage == ""){
            console.log('undefined')
            } else {
            sendMessage()
            }
        }}>
            <FontAwesome name="send-o" size={22} color="#fff" />
        </Pressable>
        </View>
    </View>
  )
}

export default ChatInput

const styles = StyleSheet.create({
    input: {
      backgroundColor: "#f0f0f0",
      paddingTop: Platform.OS === 'ios' ? 15 : 0,
      fontSize: 16,
      paddingHorizontal: 10,
      borderRadius: 8,
      height: "100%",
      width: width - 90
    },
})