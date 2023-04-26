import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const items = [
    { label: 'Medical Supliment', value: '1' },
    { label: 'Electronics', value: '2' },
]

const Description = ({navigation}) => {
    const route = useRoute()

    const params = route.params;
    const [selectectedItems, setSelectectedItems] = useState([])
    const [selectedLabels, setSelectedLabels] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [kilo, setKilo] = useState();

    useEffect(()=>{
        console.log(params)
    }, [])

    const handleNext = () => {
        const data = {...params}
        if(kilo) {
            data.luggageSpace = kilo
        }
        if(selectedLabels) {
            data.item = selectedLabels
        }
        // console.log("first", data)
        navigation.navigate("PostDescription", data)
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Header title={params.cardType == 2 ? "Buyer" : "Traveler"} backBtn />
               <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Select included items
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowModal(!showModal)
                    }}
                    style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, borderColor: "#514590", borderWidth: 1 }}
                >
                    <Text style={{fontFamily: "Poppins_400Regular"}}>Picker</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}>
                    {(selectectedItems || []).map((item, index) => {
                        return (
                            <View style={{
                                backgroundColor: "#eee",
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 7,
                                marginTop: 20, 
                                borderRadius: 5
                            }}>
                                <Text key={index} style={{
                                    marginRight: 5,
                                    marginLeft: 2
                                }}>
                                    {item.label}
                                </Text>
                                <Ionicons name="close-circle-outline" size={24} color="#777" />
                            </View>
                        )
                    })}
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Weight(kilo)
                    </Text>
                    <TextInput
                        label="Ex. 50kg"
                        value={kilo}
                        onChangeText={text => setKilo(text)}
                        mode="outlined"
                        style={{
                            width: 120
                        }}
                        // error={userPasswordError}
                        outlineStyle={{
                            backgroundColor: "#fff",
                        }}
                        placeholderTextColor= "#eee"
                    />
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
                }} onPress={()=>handleNext()}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>
            {showModal ? (
                <View style={{
                    position: "absolute",
                    top: 0,
                    width: width,
                    height: height,
                    paddingTop: 70,
                    backgroundColor: "#fff",
                }}>
                    {/* <Pressable 
                        onPress={() => {
                            setShowModal(!showModal)
                        }} 
                        style={{
                            marginRight: 10,
                            paddingLeft: 15,
                            height: 50, 
                            width: '100%', 
                            justifyContent: 'center', 
                            backgroundColor: '#dadde3'
                    }}>
                        <MaterialIcons name="keyboard-backspace" size={25} color="#514590" />
                    </Pressable> */}
                    <MultipleSelectPicker
                        items={items}
                        onSelectionsChange={(ele) => {
                            let arr = []
                            ele.map((item)=>{
                                arr.push(item.label)
                            })
                            setSelectectedItems( ele ) 
                            setSelectedLabels(arr)
                        }}
                        selectedItems={selectectedItems}
                        buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}
                        buttonText='hello'
                        checkboxStyle={{ height: 20, width: 20 }}
                    />
                    <Pressable style={{
                        backgroundColor: "#514590",
                        paddingVertical: 15,
                        borderRadius: 5,
                        marginBottom: 25,
                        width: width - 30,
                        position: "absolute",
                        bottom: 35,
                        left: 15
                    }} onPress={()=>setShowModal(!showModal)}>
                        <Text style={{
                            color: "#fff",
                            fontFamily: "Poppins_400Regular",
                            fontSize: 14,
                            textAlign: "center"
                        }}>{"Select"}</Text>
                    </Pressable>
                </View>
            ) : null}
        </SafeAreaView>
    )
}

export default Description

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollView: {
        paddingHorizontal: 15,
        flexGrow: 1
    },
})