import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native'
import MyEachBuyerCard from './MyEachBuyerCard'
import MyEachTravelerCard from './MyEachTravelerCard'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTravelerCards, getMyBuyerCards } from '../../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'

const MyCardLists = () => {
    const [loading, setloading] = useState(true)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { myBuyerCards } = useSelector(
        (state) => state.auth
      )
      const { myTravelerCards } = useSelector(
        (state) => state.auth
      )
      const { user} = useSelector(
        (state) => state.auth
      )

      const [isBuyer, setIsBuyer] = useState(false)
      const [t, setT] = useState([])
      const [b, setB] = useState([])

      useEffect(() => {
        navigation.addListener('focus', getUsers)
        // UpdateUserRoute()
       //  console.log(route.name)
         // setImage(null)
        },[myTravelerCards, myBuyerCards])

        const getUsers = async () => {

            const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
              }}
      
          await axios.get(`http://143.198.168.244/api/travels/my`, user._id, config)
              .then((data) => {
                
                // console.log("tttttttttttttttt:", t)
               setT(data.data.data)
               })
              .catch((err) => {
               
              });
           
              await axios.get(`http://143.198.168.244/api/buyers/my`, user._id, config)
              .then((data) => {
               setB(data.data.data)
               })
              .catch((err) => {
               
              });
      
              setloading(false)
          }
             
  return (
   
     <>
     {loading? 
      <View style={{
          paddingTop: 20
      }}>
          <ActivityIndicator size="large" color="#777" />
      </View>
        :
        <View style = {{backgroundColor: "white", paddingVertical: 0}}>
              <View style = {{
                  backgroundColor:'white',
                  flexDirection: 'row',
                  width: '100%',
                  position: 'absolute',
                  zIndex: 10,
                  height: 50,
                  alignSelf: 'center',
                  justifyContent : 'space-around',
                  alignItems: 'center',
                  borderRadius: 30,
                  marginBottom: 10,
              }}
              shadowOffset={{height: 5}}
              shadowColor='black'
              shadowOpacity={0.1}
              >
                  <Pressable style = {isBuyer  ? styles.pressDisabledT : styles.pressActiveT} 
                   onPress={() => {isBuyer ? setIsBuyer(false) : null}}
                  >
                      <Text style = {{
                          fontSize: 18,
                          color: isBuyer? 'black' : 'green',
                          fontWeight: isBuyer? '0' : 'bold'
                      }}>
                          My Traveler Posts
                      </Text>
                  </Pressable>
  
                  <Pressable style = {isBuyer  ? styles.pressActiveB : styles.pressDisabledB} 
                    onPress={() => {!isBuyer ? setIsBuyer(true) : null}}
                  >
                      <Text style = {{
                          fontSize: 18,
                          color: isBuyer ? '#593196' : 'black',
                          fontWeight: isBuyer ? 'bold': '0'
                      }}>
                          My Buyer Posts
                      </Text>
                  </Pressable>
  
              </View>
             
              {isBuyer ? (
              <View style = {{
                paddingTop: 50,
                backgroundColor: 'white'
            }}>
             <FlatList
            data = {b}
            renderItem = {({item}) => <MyEachBuyerCard buyerCard= {item} 
        />
      }
        />
        
       
            </View> 
            
            )
            : (
              <View style = {{
                paddingTop: 50,
                backgroundColor: 'white'
            }}>
               <FlatList
            data = {t}
            renderItem = {({item}) => <MyEachTravelerCard travelerCard= {item} 
        />
      }
        /> 
       
            </View>
            )
             
              }
            
              </View>
     
    
    }
     
              </>
             
          
    // </ScrollView>
    )
}

export default MyCardLists

const styles = StyleSheet.create({

})