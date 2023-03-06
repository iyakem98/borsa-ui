import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

function UserRouteTest() {
    const { user } = useSelector((state) => state.auth)
    const route = useRoute()
    const ENDPOINT = "http://192.168.100.2:5000"
    var  otherRoute = null
    var  otherRoute2 = null
    const chatId = "63fa3e721c535416e32d4e85"
    // var timeout = 0
    useEffect(() => {
        // setInterval( () => {
        //     if (timeout > 1)
        //     clearInterval()
        //     console.log('hello')
        // }, 1000);
        // testInt()
        // console.log('hello')

    }, [])
    
    
   
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
  const testFunc = ()=> {
    console.log('eeee')
  }
  var timeout = 0
  
  const testInt = async() => {
    timeout++;
   try{
        const config = {
          
          headers: {
           
            Authorization: `Bearer ${user.token}`
          },
          // body: JSON.stringify({
          //   imgsource: newPhoto.base64,
          // }),
          // body: formData
         };
  
         const {data} = await axios.get(`http://192.168.100.2:5000/api/chat/singleTest/${chatId}`,
      config)
      console.log(data)
      // if(timeout === 3){
      //   clearTimeout(intRef)
      // }
      }
      catch(err){
        console.log(err)
      }
    // if(timeout === 1){
    //     clearInterval(intRef)
    //   }
      // console.log('eeee')
      // try{
      //   const config = {
          
      //     headers: {
           
      //       Authorization: `Bearer ${user.token}`
      //     },
      //     // body: JSON.stringify({
      //     //   imgsource: newPhoto.base64,
      //     // }),
      //     // body: formData
      //    };
  
      //    const {data} = await axios.get(`http://192.168.100.2:5000/api/chat/singleTest/${chatId}`,
      // config)
      // console.log(data)
      // if(timeout === 1){
      //   clearInterval(intRef)
      // }
      // }
      // catch(err){
      //   console.log(err)
      // }
    }
     setTimeout(testInt, 1500)
  
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={testInt} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default UserRouteTest