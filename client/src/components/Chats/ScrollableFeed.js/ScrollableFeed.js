import React, { useEffect, useRef } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../../ChatConfig/ChatLogics'
const ScrollableFeed = ({messages}) => {
  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth)
  useEffect(() =>{
    console.log(messages)
  }, [])
  return (
   <ScrollView
    ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
    style = {{
      backgroundColor: "#fff", 
      height: "80%",
      paddingBottom: 1
      }}>
    {messages && messages.map((m, i) => (
      // <Text>{m.sender._id}</Text>

      <View style = {[styles.container, {
        backgroundColor:  `${
          m.sender._id === user._id ? "#593196" : "#E8E8E8"
      }`,
        alignSelf:  `${
          m.sender._id === user._id ? "flex-end" : "flex-start"
      }`,
      marginTop: isSameUser(messages, m , i , user._id)? 3: 10, 
    }]}>
         <Text key={m._id} style={{
          /*backgroundColor: `${
              m.sender._id === user._id ? "#593196" : "#E8E8E8"
          }`,
          alignSelf: `${
            m.sender._id === user._id ? "flex-end" : "flex-start"
        }`, 
        */
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          
         /* borderRadius : 20,
          padding: 5,
          maxWidth: "75%",
          //marginLeft: isSameSenderMargin(messages, m , i, user._id),
          marginLeft: 5, */
          
      }}>
      
          {m.content}
      </Text>
      
      </View>
      
       
    ))}
   </ScrollView>
  // <View>
  //   {messages && messages.map(m => (
  //     <View key={m._id}>
  //       <Text>
  //         {m.content}
  //       </Text>
  //     </View>
  //   ))}
  // </View>
  )
}
const styles = StyleSheet.create({
  container: {
      //backgroundColor: "#E8E8E8",
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 10,
      maxWidth: '80%',

      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 1,
      },
      
      shadowOpacity: 0.10,
      shadowRadius: 1.0,

      elevation: 1,
  },
  time: {
      alignSelf: "flex-end"
  }
})
export default ScrollableFeed