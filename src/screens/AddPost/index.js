import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Shared/Header'
import { useRoute } from '@react-navigation/native'

const width = Dimensions.get("screen").width

const AddPost = ({navigation}) => {
    
   

    const route = useRoute()
    const params = route?.params?.cardToAdd

    const [selected, setSelected] = useState(params ? 2 : 1)


    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Add Post"} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Are you a traveler or a buyer?
                </Text>
                <View style={styles.horizontal}>
                    <Pressable style={[styles.component, selected === 1 ? {
                        borderColor: "#514590",
                        borderWidth: 2
                    } : {
                        borderColor: "#f7f7f7",
                    }]} onPress={()=>setSelected(1)}>
                        <View style={[styles.radioWrapper, selected !== 1 ? {
                            borderColor: "#ccc"
                        } : {}]}>
                            {selected === 1 ? (
                                <View style={[styles.radio, selected !== 1 ? {
                                    backgroundColor: "#ccc"
                                } : {}]} />
                            ) : null}
                        </View>
                        <Text style={styles.compTxt}>Traveler</Text>
                    </Pressable>
                    <Pressable style={[styles.component, selected === 2 ? {
                        borderColor: "#514590",
                        borderWidth: 2
                    } : {
                        borderColor: "#f7f7f7",
                    }]} onPress={()=>setSelected(2)}>
                        <View style={[styles.radioWrapper, selected !== 2 ? {
                            borderColor: "#ccc"
                        } : {}]}>
                            {selected === 2 ? (
                                <View style={[styles.radio, selected !== 2 ? {
                                    backgroundColor: "#ccc"
                                } : {}]} />
                            ) : null}
                        </View>
                        <Text style={styles.compTxt}>Buyer</Text>
                    </Pressable>
                </View>
                <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 15
                }} 
                onPress={()=>navigation.navigate("FromTo", {
                    cardType: selected,
                  })}
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollView: {
        paddingHorizontal: 15,
        flexGrow: 1
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    component: {
        width: "48%",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        paddingHorizontal: 15,
        height: width * 0.3,
        justifyContent: "center",
        backgroundColor: "#fff",
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 2,
    },
    compTxt: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium"
    },
    radioWrapper: {
        // backgroundColor: "#aaa",
        height: 21,
        width: 21,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#514590",
        position: "absolute",
        top: 15,
        right: 15
    },
    radio: {
        backgroundColor: "#514590",
        height: 14,
        width: 14,
        borderRadius: 10
    }
})