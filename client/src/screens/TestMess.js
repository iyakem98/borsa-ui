import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'

function TestMess() {
  const [mess, setMess] = useState()
  const [latestMess, setlatestMess] = useState()
  const [latestDate, setlatestDate] = useState()
  const { user } = useSelector((state) => state.auth)
  const [testvar1, settestvar1] = useState(true)
  const [testvar2, settestvar2] = useState(false)

  useEffect(() => {
    settestvar1(true)
    settestvar2(false)
  },[])
  const sendMessage = async() => {
    setlatestMess(mess)
    setMess('')
    const formatted_date = moment().format("LT")
    setlatestDate('')
    setlatestDate(formatted_date)
    try{
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`

        },
         
        
    }
    const {data} = await axios.post('http://192.168.100.2:5000/api/message/send2', {
      content : mess,
      chatId: "63ffba24699fd16a5e7a0d89",
      image: "",
      receiver: "63ec0beda890816a94c748ae"
      
      
    },
    config)
    console.log('message sent successfully')
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <View>
      {/* <Text>{latestMess}</Text>
      <Text>{latestDate}</Text>
      <TextInput 
      value={mess}
      onChangeText={setMess}
      // onChange={() => {
      //   setNewMessage()
      //   // typingHandler()
       

      // }
      // }
      // onChange={setNewMessage}
      style = {styles.input} 
      placeholder='type your message...'/> */}
      {testvar1 &&<Text>test varibale 1</Text>}
      {testvar2 &&<Text>test varibale 2</Text>}
      <Pressable style={styles.btn} onPress={() => {
        settestvar1(false)
        settestvar2(true)
      }}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

export default TestMess

const styles = StyleSheet.create({
 
 
 
input: {
    // flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 200,
    height: "20%",
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
},
btn: {
  marginTop: 50,
  backgroundColor: "red"
}


  
});