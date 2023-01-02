import React, { useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from '../../../ChatConfig/ChatLogics'
const ScrollableFeed = ({messages}) => {
  const { user } = useSelector((state) => state.auth)
  useEffect(() =>{
    console.log(messages)
  }, [])
  return (
   <ScrollView  >
    {messages && messages.map((m, i) => (
      // <Text>{m.sender._id}</Text>
      
        <Text key={m._id} style={{
          backgroundColor: `${
              m.sender._id === user._id ? "#593196" : "#E8E8E8"
          }`,
          color: `${
              m.sender._id === user._id ? "white" : "black"
          }`,
          borderRadius : 20,
          padding: 5,
          maxWidth: "75%",
          marginLeft: isSameSenderMargin(messages, m , i, user._id),
          marginTop: isSameUser(messages, m , i , user._id)? 3: 10,
      }}>
      
          {m.content}
      </Text>
      
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

export default ScrollableFeed