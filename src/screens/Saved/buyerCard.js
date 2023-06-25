import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const width = Dimensions.get("screen").width

const BuyerCard = ({
    item,
    addToWislistTraveler
}) => {
    // console.log(item)
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(true);
    const locationPickUp = item?.destination.split(", ")
    const locationPickUpLength = locationPickUp.length
    const locationDeparture = item?.departure.split(", ")
    const locationDepartureLength = locationDeparture.length

    const { user } = useSelector((state) => state.auth)

    return (
        <Pressable style={styles.container} onPress={()=>{
            navigation.navigate('Messaging', {userSelected: item.user})
            console.log("yeeeeeeeee", item?.user)
        }}>
            <View style={styles.topWrapper}>
                <View style={styles.horizontal}>
                    {/* <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1681844931547-54cb3b439453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        }}
                        style={styles.image}
                    /> */}
                    <View style={styles.image}>
                        <AntDesign name="gift" size={30} color="#555" />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium"
                        }}>{item?.item[0]}</Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                            color: "#777"
                        }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                    </View>
                </View>
                <View style={styles.horizontal}>
                {user?.isImperial? (
                         <Text style={{
                            fontSize: 15,
                            fontFamily: "Poppins_600SemiBold",
                        }}>
                            {(item?.totalWeight*2.20462).toFixed(1)}
                            <Text style={{
                                fontFamily: "Poppins_400Regular",
                                fontSize: 13
                            }}>lb</Text>
                        </Text>
                    ):(
                         <Text style={{
                            fontSize: 15,
                            fontFamily: "Poppins_600SemiBold",
                        }}>
                            {(item?.totalWeight*1.0).toFixed(1)}
                            <Text style={{
                                fontFamily: "Poppins_400Regular",
                                fontSize: 13
                            }}>kg</Text>
                        </Text>
                    )}
                    {/* <Pressable style={styles.dottedButton} onPress={()=>{
                        setModalOpen(true)
                    }}>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </Pressable> */}
                    <Pressable style={{
                        backgroundColor: "#eee",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 7,
                        marginLeft: 12
                    }} onPress={() => addToWislistTraveler(item._id)}>
                        <Text style={{
                            color: "red",
                        }}>Remove</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.bottomWrapper}>
                <View>
                    <Text style={styles.txtCountry}>
                    {locationDepartureLength === 3 ? locationDeparture[2] : locationDeparture[1]}
                    </Text>
                    <Text style={styles.txtCity}>
                    {locationDepartureLength === 3 ? <>{`${locationDeparture[0]}, ${locationDeparture[1]}`}</> : locationDeparture[0]}
                    </Text>
                    <Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 12,
                        color: "#777"
                    }}>
                        {item?.startDate ? item?.startDate.slice(0, 10) : ""}
                    </Text>
                </View>
                <View style={styles.horizontal}>
                    <View style={styles.dot} />
                    <View style={styles.dottedLine} />
                    <MaterialCommunityIcons name="airplane-takeoff" size={24} color="black" />
                    <View style={styles.dottedLine} />
                    <View style={styles.dot} />
                </View>
                <View style={{alignItems: "flex-end"}}>
                    <Text style={styles.txtCountry}>
                    {locationPickUp[locationPickUpLength - 1]}
                    </Text>
                    <Text style={styles.txtCity}>
                    {locationPickUpLength === 3 ? <>{`${locationPickUp[0]}, ${locationPickUp[1]}`}</> : locationPickUp[0]}
                    </Text>
                    <Text style={styles.date}>
                        {item?.endDate ? item?.endDate.slice(0, 10) : ""}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default BuyerCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        // height: 150,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#eee",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: "space-between"
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingRight: 20
    },
    txtCountry: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15
    },
    txtCity: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: "#777"
    },
    bottomWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    date: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: "#777"
    },
    dottedLine: {
        borderStyle: "dotted",
        borderColor: "#999",
        borderWidth: 1,
        width: width * 0.15,
        height: 1,
        borderRadius: 1
    },
    dot: {
        backgroundColor: "#999",
        height: 5,
        width: 5,
        borderRadius: 5
    },
    dottedButton: {
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center"
    }
})