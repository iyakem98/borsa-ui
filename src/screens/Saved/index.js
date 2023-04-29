import { ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TravelerCard from './travelerCard'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw';
import { useIsFocused, useRoute } from "@react-navigation/native";

const width = Dimensions.get("screen").width

const Saved = () => {
    const isFocused = useIsFocused();
    const [selectedTab, setSelectedTab] = useState(2);
    const [isLoading, setIsLoading] = useState(true);
    const [buyerData, setBuyerData] = useState([]);
    const [travelerData, setTravelerData] = useState([]);

    const getData = async (index) => {
        const checkIndex = index === 1 ? '@savedTravelers' : '@savedBuyer'
        setSelectedTab(index)
        setIsLoading(true)
        try {
            console.log("index", index)
            // await AsyncStorage.removeItem(checkIndex)
            const jsonValue = await AsyncStorage.getItem(checkIndex)
            // // const jsonValue =  null
            if(jsonValue) {
                const data = await JSON.parse(jsonValue)
                console.log("====[[[", data)
                if(index === 1) {
                    setTravelerData(data)
                } else 
                if(index === 2) {
                    setBuyerData(data)
                }
            } else {
                if(index === 1) {
                    setTravelerData([])
                } else if(index === 2) {
                    setBuyerData([])
                }
            }
        } catch(e) {
            // error reading value
        }
        setIsLoading(false)
    }

    const addToWislistTraveler = async(_id) => {
        setIsLoading(true)
        try {
            if(selectedTab === 1) {
                const travelerDataArr = travelerData.filter((item)=>(
                    _id !== item._id
                ))
                await AsyncStorage.setItem('@savedTravelers', JSON.stringify(travelerDataArr));
            } else if(selectedTab === 2) {
                const buyerDataArr = buyerData.filter((item)=>(
                    _id !== item._id
                ))
                await AsyncStorage.setItem('@savedBuyer', JSON.stringify(buyerDataArr));
            }
        } catch (e) {
          console.log("ERROR WHILE FETCH AND STORING WISHLIST: ", e)
        }
        getData(selectedTab)
    }

    useEffect(()=>{
        if(isFocused){
            getData(selectedTab)
        }
    }, [])

    // useEffect(()=>{
    //     if(selectedTab === 2) {

    //     }
    // }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header title={"Saved"} /> */}
            <View style={{
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 15
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    width: width - 30,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderRadius: 10
                }}>
                    <Pressable style={{
                        backgroundColor: selectedTab === 1 ? "#fff" : "#eee",
                        borderRadius: 5,
                        width: "49%",
                        paddingVertical: 13,
                        alignItems: "center"
                    }} onPress={()=>{
                        getData(1)
                    }}>
                        <Text style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 14
                        }}>Traveler</Text>
                    </Pressable>
                    <Pressable style={{
                        backgroundColor: selectedTab === 2 ? "#fff" : "#eee",
                        borderRadius: 5,
                        width: "49%",
                        paddingVertical: 13,
                        alignItems: "center"
                    }} onPress={()=>{
                        getData(2)
                    }}>
                        <Text style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 14
                        }}>Buyer</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{
                backgroundColor: "#fff",
                flexGrow: 1,
                paddingHorizontal: 10,
                paddingTop: 10
            }}>
                {isLoading ? (
                    <View style={{
                        paddingTop: 20
                    }}>
                        <ActivityIndicator size="large" color="#777" />
                    </View>
                ) : (selectedTab === 1 && travelerData.length === 0) || (selectedTab === 2 && buyerData.length === 0) ? (
                    <View style={{
                        alignItems: "center",
                        paddingTop: 60
                    }}>
                        <EmptyUnDraw />
                        <Text style={{
                            fontFamily: "Poppins_500Medium",
                            marginTop: 20,
                            textAlign: "center",
                            fontSize: 16
                        }}>Wishlist is empty</Text>
                    </View>
                ) : (
                    <>
                        {selectedTab === 1 && travelerData.length ? (
                            // travelerData.map((item, index)=>{
                            //     return (
                                    // <TravelerCard key={index} item={item} addToWislistTraveler={addToWislistTraveler} />
                            <View>
                                <FlatList
                                    data={travelerData}
                                    renderItem={({item}) => <TravelerCard item={item} addToWislistTraveler={addToWislistTraveler} />}
                                    keyExtractor={(item, index) => index}
                                />
                            </View>
                            //     )
                            // })
                        ) : selectedTab === 2 && buyerData.length ? buyerData.map((item, index)=>{
                            return (
                                <TravelerCard key={index} item={item} addToWislistTraveler={addToWislistTraveler} />
                            )
                        }) : null}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Saved

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
})