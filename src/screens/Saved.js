import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Shared/Header'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

const width = Dimensions.get("screen").width

const Saved = () => {
    const [selectedTab, setSelectedTab] = useState(1)
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
                    }} onPress={()=>setSelectedTab(1)}>
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
                    }} onPress={()=>setSelectedTab(2)}>
                        <Text style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 14
                        }}>Seller</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView contentContainerStyle={{
                backgroundColor: "#fff",
                flexGrow: 1,
                paddingHorizontal: 10,
                paddingTop: 10
            }}>
                {[1,2,3,4].map((item, index)=>{
                    return (
                        <View key={index} style={{
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
                        }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // paddingRight: 20
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Image
                                        source={{
                                            uri: "https://images.unsplash.com/photo-1681844931547-54cb3b439453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        }}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 5,
                                            marginRight: 10
                                        }}
                                    />
                                    <View>
                                        <Text style={{
                                            fontSize: 16,
                                            fontFamily: "Poppins_500Medium"
                                        }}>Test Test</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            color: "#777"
                                        }}>Test@test.com</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontFamily: "Poppins_600SemiBold",
                                        marginRight: 10
                                    }}>
                                        60
                                        <Text style={{
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 13
                                        }}>Kg</Text>
                                    </Text>
                                    <Pressable style={{
                                        // position: "absolute",
                                        // top: 10,
                                        // right: 10
                                    }}>
                                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 25
                            }}>
                                <View style={{
                                }}>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 15
                                    }}>
                                        Ethiopia
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 12,
                                        color: "#777"
                                    }}>
                                        Addis Ababa
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 12,
                                        color: "#777"
                                    }}>
                                        19-02-22
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <View style={{
                                        backgroundColor: "#999",
                                        height: 5,
                                        width: 5,
                                        borderRadius: 5
                                    }} />
                                    <View style={{
                                        borderStyle: "dotted",
                                        borderColor: "#999",
                                        borderWidth: 1,
                                        width: width * 0.15,
                                        height: 1,
                                        borderRadius: 1
                                    }} />
                                    <MaterialCommunityIcons name="airplane-takeoff" size={24} color="black" />
                                    <View style={{
                                        borderStyle: "dotted",
                                        borderColor: "#999",
                                        borderWidth: 1,
                                        width: width * 0.15,
                                        height: 1
                                    }} />
                                    <View style={{
                                        backgroundColor: "#999",
                                        height: 5,
                                        width: 5,
                                        borderRadius: 5
                                    }} />
                                </View>
                                <View style={{
                                    alignItems: "flex-end"
                                }}>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 15
                                    }}>
                                        Ethiopia
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 12,
                                        color: "#777"
                                    }}>
                                        Addis Ababa
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Poppins_500Medium",
                                        fontSize: 12,
                                        color: "#777"
                                    }}>
                                        19-02-22
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
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