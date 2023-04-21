import { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { async } from 'q'
import { API_BASE_URL } from '../../utils/config'
import { useSelector } from 'react-redux'
import axios from 'axios'
const width = Dimensions.get("screen").width

const items = [
    { label: 'Medical Supliment', value: '1' },
    { label: 'Electronics', value: '2' },
]

const Description = ({navigation}) => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false)
    const [selectectedItems, setSelectectedItems] = useState()
    const [showModal, setShowModal] = useState(false)
    const [kilo, setKilo] = useState()
    const [itmName, setItmName] = useState()
    const [itmDesc, setItmDesc] = useState()

    const [luggageSpace, setLuggageSpace] = useState()
    const [proofCode, setProofCode] = useState()

    // const multiSelect = useRef(null)

    const route = useRoute()

    const { user } = useSelector((state) => state.auth)

    const postBuyer = async () => {
        if(!itmName || !kilo){
            alert("Please fill the required fields.")
        }else{
            //console.log("param", user.token)

            let buyerData = 
            {
                "departure": route.params.buyerCountryFrom,
                "destination": route.params.buyerCountryTo,
                "item": itmName,
                "totalWeight": kilo,
                "startDate": route.params.buyerDateFrom,
                "endDate": route.params.buyerDateTo,
                "description": itmDesc
              }


        try {
            axios.post('http://143.198.168.244/api/buyers/', buyerData,
            {
                'headers': { Authorization: `Bearer ${user.token}` }
        })
          } catch (e) {
            console.log("failed", e);
          }

        }
    }

    const postTraveler = async () => {
        if(!luggageSpace || !proofCode){
            alert("Please fill the required fields.")
        }else{
            console.log("param", route.params)

            let travelerData = 
            
                {
                    "departure": route.params.travelerCountryFrom,
                    "destination": route.params.travelerCountryTo,
                    "proofCode": proofCode,
                    "luggageSpace": luggageSpace,
                    "departureDate": route.params.travelerDate
                  }
              


        try {
            axios.post('http://143.198.168.244/api/travels/', travelerData, {'headers': { Authorization: `Bearer ${user.token}` }})
          } catch (e) {
            console.log("failed", e.response);
          }

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={route.params.cardType == 2 ? "Buyer" : "Traveler"} backBtn />
            {
              route.params.cardType == 2 &&
              <>
               <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    {/* Select included items2 */}
                    {/* {route.params.cardType} */}
                </Text>
                
                <View style={{
                    //flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginTop: 2,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Item name
                    </Text>
                    <TextInput
                        label="Name of item"
                        value={itmName}
                        onChangeText={text => setItmName(text)}
                        mode="outlined"
                        style={{
                            width: "100%",
                            marginTop:10
                        }}
                        // error={userPasswordError}
                        outlineStyle={{
                            backgroundColor: "#fff",
                        }}
                        placeholderTextColor= "#eee"
                    />
                </View>

                <View style={{
                    //flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Description (optional)
                    </Text>
                    <TextInput
                        label="Describe your item"
                        value={itmDesc}
                        onChangeText={text => setItmDesc(text)}
                        mode="outlined"
                        style={{
                            width: "100%",
                            marginTop:2,
                            height:100,
                        }}
                        // error={userPasswordError}
                        outlineStyle={{
                            backgroundColor: "#fff",
                        }}
                        placeholderTextColor= "#eee"
                    />
                </View>

                <View style={{
                    //flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginTop: 7,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Weight (in kg)
                    </Text>
                    <TextInput
                        label="Ex. 50kg"
                        value={kilo}
                        onChangeText={text => setKilo(text)}
                        mode="outlined"
                        style={{
                            width: "100%",
                            marginTop:10
                        }}
                        keyboardType="numeric"
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
                }} onPress={()=>postBuyer()}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>
              </>  
            }

{
              route.params.cardType == 1 &&
              <>
               <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    {/* Select included items2 */}
                    {/* {route.params.cardType} */}
                </Text>
                
                <View style={{
                    //flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginTop: 2,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Proof code
                    </Text>
                    <TextInput
                        label="Name of item"
                        value={proofCode}
                        onChangeText={text => setProofCode(text)}
                        mode="outlined"
                        style={{
                            width: "100%",
                            marginTop:10
                        }}
                        // error={userPasswordError}
                        outlineStyle={{
                            backgroundColor: "#fff",
                        }}
                        placeholderTextColor= "#eee"
                    />
                </View>

                <View style={{
                    //flexDirection: "row",
                    alignItems: "left",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}>
                    <Text style={{
                        fontFamily: "Poppins_400Regular"
                    }}>
                        Luggage space (in kg)
                    </Text>
                    <TextInput
                        label="Describe your item"
                        value={luggageSpace}
                        keyboardType="numeric"
                        onChangeText={text => setLuggageSpace(text)}
                        mode="outlined"
                        style={{
                            width: "100%",
                            marginTop:2,
                            height:100,
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
                }} onPress={()=>postTraveler()}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>
              </>  
            }
           
            
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