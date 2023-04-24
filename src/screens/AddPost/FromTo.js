import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useRoute } from '@react-navigation/native'

const FromTo = ({navigation}) => {
    const route = useRoute()
    const params = route?.params;

    const [countryFromCode, setCountryFromCode] = useState('FR')
    const [countryFrom, setCountryFrom] = useState(null)
    const [countryToCode, setCountryToCode] = useState('ET')
    const [countryTo, setCountryTo] = useState(null)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showDatePickerFrom, setShowDatePickerFrom] = useState(false)
    const [showDatePickerTo, setShowDatePickerTo] = useState(false)
    const [showDatePickerTravelerFrom, setShowTravelerDatePickerFrom] = useState(false)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [mode, setMode] = useState('date');
    const [travelerDate, setTravelerDate] = useState("")
    const [travelerFrom, setTravelerFrom] = useState("")
    const [travelerTo, setTravelerTo] = useState("")

    const handlePlaceFrom = (data) => {
        
         let Country = ""
         let City = ""

      if(place.address_components){
         for(let i=0; i<place.address_components.length; i++){
          let types = place.address_components[i].types
          if(types.indexOf("country") != -1 && Country==""){
            Country = place.address_components[i].long_name
          }

           if(types.indexOf("locality") != -1 && City==""){
             City = place.address_components[i].long_name
          }

        }
      }
       
            console.log("Country:", Country)
            console.log("State:", State)

            setCountryFrom(`${City}, ${Country}`)

    }

     const handlePlaceTo = (data) => {
        
         let Country = ""
         let City = ""

      if(place.address_components){
         for(let i=0; i<place.address_components.length; i++){
          let types = place.address_components[i].types
          if(types.indexOf("country") != -1 && Country==""){
            Country = place.address_components[i].long_name
          }

           if(types.indexOf("locality") != -1 && City==""){
             City = place.address_components[i].long_name
          }

        }
      }
       
            console.log("Country:", Country)
            console.log("State:", State)

            setCountryTo(`${City}, ${Country}`)

    }

    useEffect(()=>{
        console.log(moment(from).format('L'))
    }, [from])
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={params && params?.cardType === 2 ? "Buyer" : "Traveler"} backBtn />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    {params && params?.cardType === 2 ? "Pick Up" : "Departure"}
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    {/* <CountryPicker
                        {...{
                            countryCode: countryFromCode,
                            withFilter: true,
                            withFlag: true,
                            withCountryNameButton: true,
                            withAlphaFilter: false,
                            withCallingCode: false,
                            withEmoji: true,
                            onSelect: (country) => {
                                setCountryFromCode(country.cca2)
                                setCountryFrom(country)
                            },
                        }}
                        visible={false}
                    /> */}
                    <GooglePlacesAutocomplete
                        placeholder='Take off location'
                        onPress={(data) => {
                           handlePlaceFrom(data)
                            console.log(data);
                        }}
                        query={{
                            key: 'AIzaSyBEQjAi9JOrXgaekQKY6oeSYb8C_5rAudU',
                            language: 'en',
                            types: '(cities)'
                        }}
                        />
                </View>
                <Text style={{
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular"
                }}>
                    {params && params?.cardType === 2 ? "Destination" : "Destination"}
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 5
                }}>
                    {/* <CountryPicker
                        {...{
                            countryCode: countryToCode,
                            withFilter: true,
                            withFlag: true,
                            withCountryNameButton: true,
                            withAlphaFilter: false,
                            withCallingCode: false,
                            withEmoji: true,
                            onSelect: (country) => {
                                setCountryToCode(country.cca2)
                                setCountryTo(country)
                            },
                        }}
                        visible={false}
                    /> */}

                    <GooglePlacesAutocomplete
                        placeholder='Destination location'
                        onPress={(data) => {
                            handlePlaceFrom(data)
                            console.log(data);
                        }}
                        query={{
                            key: 'AIzaSyBEQjAi9JOrXgaekQKY6oeSYb8C_5rAudU',
                            language: 'en',
                            types: '(cities)'
                        }}
                        />
                </View>
                {params && params?.cardType === 2 ? (
                    <>
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
                    </>
                ) : (
                    <>
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
                    </>
                )}
                <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 15
                }} onPress={()=>{
                    if(!travelerFrom || !travelerTo || !travelerDate){
                        alert("Please fill all the fields.")
                    } else {
                        navigation.navigate("PostAdditional", {
                            cardType: params && params?.cardType,
                            travelerCountryFrom: travelerFrom,
                            travelerCountryTo: travelerTo,
                            travelerDate: travelerDate,
                        })
                    }
                }}>
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
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTravelerDate(moment(selectedDate).format('L'))
                        setShowTravelerDatePickerFrom(false)
                    }}
                />
            ) : null}
            {showDatePickerFrom ? (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setFrom(moment(selectedDate).format('L'))
                        setShowDatePickerFrom(false)
                    }}
                />
            ) : null}
            {showDatePickerTo && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTo(moment(selectedDate).format('L'))
                        setShowDatePickerTo(false)
                    }}
                />
            )}
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
})