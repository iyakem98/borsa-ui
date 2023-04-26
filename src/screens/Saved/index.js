import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TravelerCard from './travelerCard'
import EmptyUnDraw from '../../assets/svg/emptyUnDraw';
const width = Dimensions.get("screen").width

const Saved = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [buyerData, setBuyerData] = useState([]);
    const [travelerData, setTravelerData] = useState([]);

    const getData = async (index) => {
        setSelectedTab(index)
        setIsLoading(true)
        try {
            const jsonValue = await AsyncStorage.getItem(index === 1 ? '@savedTravelers' : '@savedBuyers')
            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log("====[[[", data)
            if(data) {
                // setTravelerData(data)
            } else {
                setTravelerData([])
            }
        } catch(e) {
            // error reading value
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        getData(1)
    }, [])

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
                ) : travelerData.length === 0 ? (
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
                        {travelerData.map((item, index)=>{
                            return (
                                <TravelerCard index={index} item={item} key={index} />
                            )
                        })}
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