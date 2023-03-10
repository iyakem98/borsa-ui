import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BuyerCard from '../components/Connect/BuyerCard'
import TravelerCard from '../components/Connect/TravelerCard2'
import { getConsumers, getTravelers } from '../features/auth/authSlice'


const ConnectScreen = () => {
  const { consumers } = useSelector(
    (state) => state.auth
  )
  const { travelers} = useSelector(
    (state) => state.auth
  )
  const { user} = useSelector(
    (state) => state.auth
  )
  
    const dispatch = useDispatch()
    const [isBuyer, setIsBuyer] = useState(false)
    const [isTraveler, setIsTraveler] = useState(false)
    function tweakBuyer() {
        setIsBuyer(false)
        console.log(isBuyer)
    }
    function tweakBuyer2() {
        setIsBuyer(true)
        console.log(isBuyer)
    }
    
    // const getConsumers = async () => {
    //   try{
    //     const {data} = await axios.get('http://192.168.100.2:5000/api/users/consumers')
    //     console.log(data)
    //     setConsumers(data)
    // setConsumers((state) => {
    //   // console.log(state)
    //   return state
    // })
        

    //   }
    //   catch(error){
    //     console.log('error in getting customers')
    //   }
         
    //     }
        useEffect(() => {
           dispatch(getTravelers())
          //  console.log(travelers)
           dispatch(getConsumers())
          //  console.log(consumers)
          //  console.log(isBuyer)
          console.log("my travelerrrrrrrs are:", travelers)
          console.log("my buyerrrrrrrrs are:", consumers)
          let u = AsyncStorage.getItem('user')
          console.log("userrrrrr:", user)
        }, [travelers, consumers])
        
  return (
  //  <ScrollView>
  //  {travelers  && travelers.map((traveler) => (
  //   <View key={traveler._id}>
  //     <TravelerCard  traveler={traveler} />
  //   </View>
    
  //  ))}
  //  </ScrollView>
  // <ScrollView>
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
                        Travelers
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
                        Buyers
                    </Text>
                </Pressable>

            </View>
            {/* {isBuyer ?
              <View style = {{
                paddingTop: 50,
                backgroundColor: 'white'
            }}>
                 <FlatList
            data = {consumers}
            renderItem = {({item}) => <BuyerCard buyer = {item} 
        />}
        />
            </View>

            
            : 
            <View style = {{
              paddingTop: 50,
              backgroundColor: 'white'
          }}>
               <FlatList
          data = {travelers}
          renderItem = {({item}) => <TravelerCard traveler= {item} 
      />}
      />
        </View>
            } */}
            {isBuyer ? (
            <View style = {{
              paddingTop: 50,
              backgroundColor: 'white'
          }}>
           < FlatList
          data = {consumers}
          renderItem = {({item}) => <BuyerCard buyer= {item} 
      />}
      />
          </View> )
          : (
            <View style = {{
              paddingTop: 50,
              backgroundColor: 'white'
          }}>
           < FlatList
          data = {travelers}
          renderItem = {({item}) => <TravelerCard traveler= {item} 
      />}
      />
          </View>
          )
           
            }
            {/* {isTraveler && 
            <View style = {{
              paddingTop: 50,
              backgroundColor: 'white'
          }}>
           < FlatList
          data = {travelers}
          renderItem = {({item}) => <TravelerCard traveler= {item} 
      />}
      />
          </View>
           
            } */}
            </View>

           
        
  // </ScrollView>
  )
}

export default ConnectScreen

const styles = StyleSheet.create({
  pressActiveB: {
      //backgroundColor: '#593196',
      //borderRadius: 30,
      padding: 10,
      width: 100,
      alignItems: 'center',
      borderStyle: 'solid',
      borderBottomWidth: 2,
      borderColor: '#593196'


  },

  pressDisabledB : {
      alignItems: 'center',
      padding: 10,
      width: 100,
      
  },

  pressActiveT: {
    //backgroundColor: '#593196',
    //borderRadius: 30,
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'green'


},

pressDisabledT : {
    alignItems: 'center',
    padding: 10,
    width: 100,
    
}
})