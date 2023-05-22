import { Dimensions, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef } from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

const ChatInput = ({
    sendMessage,
    newmessage,
    setNewMessage,
    chattId,
    socket,
    typing,
    typingHandler,
    activeHandler
}) => {
    // console.log('socket value', socket.current.connected)
    // console.log('typing value', typing )
    
  return (
    <>
    {/* {typing &&<View>
            <Text>Typing</Text>

    </View>} */}
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
            height: 45,
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
            placeholder='Type your message...'
            // onChange={typingHandler}
            onChange={() => {

               activeHandler()
               typingHandler()
                // console.log("", typing)
            }}
            onFocus={()=>{
            if(newmessage.length > 0) {
                // socket.current.emit('typing', chattId);

            } else {
                // socket.current.emit("stop typing", chattId);
            }
            }}
            onBlur={()=>{
            // socket.current.emit("stop typing", chattId);
            }}
        />
        <Pressable style={{
            
            backgroundColor: "#13b955",
            //backgroundColor: '#a991d4',
            //backgroundColor: 'black',
            //backgroundColor: '#009cdc',
           //backgroundColor: "#593196",
            height: 35,
            width: 35,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
        }} onPress={() => {
            if(newmessage == null || newmessage == undefined || newmessage == ""){
            console.log('undefined')
            } else {
            sendMessage()
            }
        }}>
            
            <AntDesign name="arrowup" size={22} color="#fff" />
        </Pressable>
        </View>
    </View>
    </>
  )
}

export default ChatInput

const styles = StyleSheet.create({
    input: {
      backgroundColor: "#f0f0f0",
      paddingTop: Platform.OS === 'ios' ? 8 : 0,
      fontSize: 16,
      paddingHorizontal: 10,
      borderRadius: 8,
      height: "100%",
      width: width - 75
    },
})