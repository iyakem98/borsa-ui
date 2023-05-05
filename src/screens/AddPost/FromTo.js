import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import GooglePlaces from 'react-native-autocomplete-googleplaces-tnmt'
import { useRoute } from '@react-navigation/native'

const FromTo = ({navigation}) => {
    const [countryFromCode, setCountryFromCode] = useState('FR')
    const [countryFrom, setCountryFrom] = useState(null)
    const [countryToCode, setCountryToCode] = useState('ET')
    const [countryTo, setCountryTo] = useState(null)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showDatePickerFrom, setShowDatePickerFrom] = useState(false)
    const [showDatePickerTo, setShowDatePickerTo] = useState(false)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [mode, setMode] = useState('date');


    const [travelerDate, setTravelerDate] = useState("")
    const [travelerFrom, setTravelerFrom] = useState("")
    const [travelerTo, setTravelerTo] = useState("")

    const route = useRoute()

   
    const findLocationFrom = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[lngth-2].value
        console.log("workeeeeeed", `${city}, ${country}`)
        setCountryFrom(`${city}, ${country}`)
    }

    const findLocationTo = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[lngth-2].value
        console.log("workeeeeeed", `${city}, ${country}`)
        setCountryTo(`${city}, ${country}`)
    }

    const findTravelerFrom = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[lngth-2].value
        console.log("workeeeeeed", `${city}, ${country}`)
        setTravelerFrom(`${city}, ${country}`)
    }

    const findTravelerTo = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[lngth-2].value
        console.log("workeeeeeed", `${city}, ${country}`)
        setTravelerTo(`${city}, ${country}`)
    }

    const [showDatePickerTravelerFrom, setShowTravelerDatePickerFrom] = useState(false)

    useEffect(()=>{
        console.log(moment(from).format('L'))
    }, [from])
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={route.params.cardType == 2 ? "Buyer" : "Traveler"} backBtn />
            {route.params.cardType == 2 && 
            <>
                <ScrollView contentContainerStyle={styles.scrollView}>
                
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Pick Up
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    
                   
                   <View style={styles.container}>
                        <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findLocationFrom(value.terms)}
				/>
                </View>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Destination
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    

                <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findLocationTo(value.terms)}
				/>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Date from
                </Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} onPress={()=>{
                    setShowDatePickerFrom(true)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{from.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Date to
                </Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} onPress={()=>{
                    setShowDatePickerTo(true)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{to.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
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
                onPress={()=>
                    {
                        if(!countryFrom || !countryTo || !from || !to){
                            alert("Please fill all the fields.")
                        }
                        else
                        {
                            navigation.navigate("PostAdditional", {
                                cardType: 2,
                                buyerCountryFrom: countryFrom,
                                buyerCountryTo: countryTo,
                                buyerDateFrom: from,
                                buyerDateTo: to
                              })
                        }
                    }
                    
                }
                
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>

            {showDatePickerFrom ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display='inline'
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setFrom(moment(selectedDate).format('YYYY-MM-DD'))
                        setShowDatePickerFrom(false)
                    }}
                />
            ) : null}
            {showDatePickerTo && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display='inline'
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTo(moment(selectedDate).format('YYYY-MM-DD'))
                        setShowDatePickerTo(false)
                    }}
                />
            )}
            
            </>
            }

    {route.params.cardType == 1 && 
            <>
                <ScrollView contentContainerStyle={styles.scrollView}>
                
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Departure
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    
                   
                   <View style={styles.container}>
                        <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findTravelerFrom(value.terms)}
				/>
                </View>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Destination
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    

                <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findTravelerTo(value.terms)}
				/>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                   Flight Date
                </Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} onPress={()=>{
                    setShowTravelerDatePickerFrom(true)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{travelerDate.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
                
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
                onPress={()=>
                    {
                        if(!travelerFrom || !travelerTo || !travelerDate){
                            alert("Please fill all the fields.")
                        }
                        else
                        {
                            navigation.navigate("PostAdditional", {
                                cardType: 1,
                                travelerCountryFrom: travelerFrom,
                                travelerCountryTo: travelerTo,
                                travelerDate: travelerDate,
                              })
                        }
                    }
                    
                }
                
                >
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>

            {showDatePickerTravelerFrom ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display='inline'
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTravelerDate(moment(selectedDate).format('YYYY-MM-DD'))
                        console.log("daaaaaaate is:", selectedDate)
                        setShowTravelerDatePickerFrom(false)
                    }}
                />
            ) : null}
          
            
            </>
            }
            
        </SafeAreaView>
    )
}

export default FromTo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollView: {
        paddingHorizontal: 15,
        flexGrow: 1
    },
    container1: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})