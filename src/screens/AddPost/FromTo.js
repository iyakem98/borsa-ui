import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, SectionList, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const FromTo = ({navigation}) => {
    const currentDate = new Date()
    const [countryFromCode, setCountryFromCode] = useState('FR')
    const [countryFrom, setCountryFrom] = useState(null)
    const [countryToCode, setCountryToCode] = useState('ET')
    const [countryTo, setCountryTo] = useState(null)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showDatePickerFrom, setShowDatePickerFrom] = useState(false)
    const [showDatePickerTo, setShowDatePickerTo] = useState(false)
    const from = currentDate.toISOString()
    const [to, setTo] = useState("")
    const [mode, setMode] = useState('date');
    const[showExpiryDate, setShowExpiryDate] = useState(false)
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 90);


    const [travelerDate, setTravelerDate] = useState("")
    const [travelerFrom, setTravelerFrom] = useState("")
    const [travelerTo, setTravelerTo] = useState("")

    const route = useRoute()

   
    const findLocationFrom = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[0].value
        if (lngth > 2) {
            city += ', ' + ar[1].value
        }
        console.log("workeeeeeed", `${city}, ${country}`)
        setCountryFrom(`${city}, ${country}`)
    }

    const findLocationTo = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1].value
        let city = ar[0].value
        if (lngth > 2) {
            city += ', ' + ar[1].value
        }
        console.log("workeeeeeed", `${city}, ${country}`)
        setCountryTo(`${city}, ${country}`)
    }

    const findTravelerFrom = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1]?.value
        let city = ar[0]?.value
        if (lngth > 2) {
            city += ', ' + ar[1].value
        }
        console.log("workeeeeeed", `${city}, ${country}`)
        setTravelerFrom(`${city}, ${country}`)
    }

    const findTravelerTo = (ar) => {
        let lngth = ar.length
        let country = ar[lngth-1]?.value
        let city = ar[0]?.value
        if (lngth > 2) {
            city += ', ' + ar[1].value
        }
        console.log("workeeeeeed", `${city}, ${country}`)
        setTravelerTo(`${city}, ${country}`)
    }

    const [showDatePickerTravelerFrom, setShowTravelerDatePickerFrom] = useState(false)

    const setExpiryOn = () => {
        setShowExpiryDate(true)
    }

    const setExpiryOff = () => {
        if(showDatePickerTo == true){
            setShowDatePickerTo(false)
        }

        setShowExpiryDate(false)
    }

    const setShowFalser = () => {
        setTravelerDate(moment(date).format('YYYY-MM-DD'))
        //setTravelerDate(date.toLocaleString())
        setShowTravelerDatePickerFrom(false)
    }

    useEffect(()=>{
        console.log(moment(from).format('L'))
    }, [from])
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={route.params?.cardType == 2 ? "Shipping" : "Traveling"} backBtn />
            {route.params.cardType == 2 && 
            <>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>
                
                <Text style={{
                    marginTop: 20,
                    marginBottom: 3,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 18,
                }}>
                    Pick Up
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderWidth: 0,
                    //borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingHorizontal: 5,
                    //paddingVertical: 5,
                    borderRadius: 5,
                    //width: "95%"
                }}>
                    
                   
                   <View style={styles.container}>
                      {/*  <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findLocationFrom(value.terms)} 
            /> */}

                <GooglePlacesAutocomplete
                        placeholder='Enter your pickup location'
                        onPress={(value)=>findLocationFrom(value.terms)}
                        query={{
                            key: 'AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4',
                            language: 'en',
                            types: '(cities)'
                        }}
                        //keyboardAppearance= {'dark'}
                        styles={{
                          textInputContainer: {
                            // backgroundColor: 'grey',
                          },
                          textInput: {
                            borderStyle: "solid",
                            borderColor: "#000",
                            borderWidth: 0.4,
                            width:300,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderRadius:5,
                            marginTop: 10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />

                </View>
                </View>
                <Text style={{
                    marginTop: 20,
                    marginBottom: 3,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 18,
                }}>
                    Destination
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderWidth: 0,
                    //borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingHorizontal: 5,
                    //paddingVertical: 5,
                    borderRadius: 5,
                    //width: "95%"
                }}>
                    

                {/*<GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findLocationTo(value.terms)}
            /> */}

                <GooglePlacesAutocomplete
                        placeholder='Enter your destination'
                        onPress={(value)=>findLocationTo(value.terms)}
                        query={{
                            key: 'AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4',
                            language: 'en',
                            types: '(cities)'
                        }}
                        styles={{
                          textInputContainer: {
                            // backgroundColor: 'grey',
                          },
                          textInput: {
                            borderStyle: "solid",
                            borderColor: "#000",
                            borderWidth: 0.4,
                            width:300,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderRadius:5,
                            marginTop: 10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />
                </View>
               {/* <Text style={{
                    marginTop: 20,
                    marginBottom: 3,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 18,
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
                   justifyContent: "space-between",
                   //borderWidth: 1,
                   borderColor: "gray",
                   //borderWidth: 0,
                   borderWidth: 1,
                   borderColor: 'lightgray',
                   paddingHorizontal: 5,
                   //paddingVertical: 5,
                   borderRadius: 5,
                   marginTop: 10,
                }} onPress={()=>{
                    if (showDatePickerFrom == false && showDatePickerTo == true) {
                        setShowDatePickerTo(false)
                    }
                    setShowDatePickerFrom(!showDatePickerFrom)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{from.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable> */}

                {showExpiryDate? (
                    <View>
                    <Text style={{
                    marginTop: 20,
                    marginBottom: 3,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 18,
                }}>
                    Expire card on
                </Text>
                <Pressable style={{
                     borderWidth: 1,
                     borderColor: "#777",
                     paddingHorizontal: 15,
                     paddingVertical: 11,
                     borderRadius: 5,
                     flexDirection: "row",
                     justifyContent: "space-between",
                     //borderWidth: 1,
                     borderColor: "gray",
                     //borderWidth: 0,
                     borderWidth: 1,
                     borderColor: 'lightgray',
                     paddingHorizontal: 5,
                     //paddingVertical: 5,
                     borderRadius: 5,
                     marginTop: 10,
                    
                }} onPress={()=>{
                    if (showDatePickerTo == false && showDatePickerFrom == true){
                        setShowDatePickerFrom(false)
                    }
                    setShowDatePickerTo(!showDatePickerTo)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{to.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
                <View style = {{
                        marginTop: 10,
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={setExpiryOff}
                        style = {{
                            backgroundColor: "#eee",
                            paddingVertical: 8,
                            paddingHorizontal: 18,
                            borderRadius: 5,

                        }}>
                           <Text style = {{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 16,
                            //color: 'white',
                           }}>
                            Cancel Expiry Date
                           </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                ) : (
                    <View>
                    <Text style = {{
                         marginTop: 20,
                         marginBottom: 3,
                         fontFamily: "Poppins_400Regular",
                         fontSize: 16,
                    }}>
                        Shipping cards typically expire in 90 days. Would you like to set a custom expiry date?
                    </Text>
                    <View style = {{
                        marginTop: 18,
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={setExpiryOn}
                        style = {{
                            backgroundColor: "#514590",
                            backgroundColor: '#7267e7',
                            paddingVertical: 8,
                            paddingHorizontal: 18,
                            borderRadius: 5,

                        }}>
                           <Text style = {{
                            fontFamily: "Poppins_400Regular",
                            fontSize: 16,
                            color: 'white',
                           }}>
                            Add expiry date
                           </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
                
                
                <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginTop: showExpiryDate? "60%" : "68%",
                    //marginBottom: 25,
                    width: "100%",
                    //position: "absolute",
                    bottom: 0,
                    //left: 15
                    
                }}
                onPress={()=>
                    {
                        if(!countryFrom || !countryTo){
                            alert("Please fill all the fields.")
                        }
                        else
                        {
                            navigation.navigate("PostAdditional", {
                                cardType: 2,
                                buyerCountryFrom: countryFrom,
                                buyerCountryTo: countryTo,
                                buyerDateFrom: currentDate.toISOString(),
                                buyerDateTo: showExpiryDate? to : futureDate.toISOString()
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
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setFrom(moment(selectedDate).format('YYYY-MM-DD'))
                        setTimeout(() => {
                            setShowDatePickerFrom(false)
                          }, 5000);
                    }}
                />
            ) : null}
            {showDatePickerTo && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTo(moment(selectedDate).format('YYYY-MM-DD'))
                        setTimeout(() => {
                            setShowDatePickerTo(false)
                          }, 5000);
                    }}
                />
            )}
            
            </>
            }

    {route.params.cardType == 1 && 
            <>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>
                
                <Text style={{
                   marginTop: 20,
                   marginBottom: 3,
                   fontFamily: "Poppins_400Regular",
                   fontSize: 18,
                }}>
                    Departure
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderWidth: 0,
                    //borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingHorizontal: 5,
                    //paddingVertical: 5,
                    borderRadius: 5,
                }}>
                    
                   
                   <View style={styles.container}>
                       {/* <GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findTravelerFrom(value.terms)}
            /> */}
                <GooglePlacesAutocomplete
                        placeholder='Enter your departure city'
                        onPress={(value)=>findTravelerFrom(value.terms)}
                        query={{
                            key: 'AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4',
                            language: 'en',
                            types: '(cities)'
                        }}
                        styles={{
                          textInputContainer: {
                            // backgroundColor: 'grey',
                          },
                          textInput: {
                            borderStyle: "solid",
                            borderColor: "#000",
                            borderWidth: 0.4,
                            width:300,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderRadius:5,
                            marginTop: 10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />
                </View>
                </View>
                <Text style={{
                     marginTop: 20,
                     marginBottom: 3,
                     fontFamily: "Poppins_400Regular",
                     fontSize: 18,
                }}>
                    Destination
                </Text>
                <View style={{
                    //borderWidth: 1,
                    borderColor: "gray",
                    borderWidth: 0,
                    //borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingHorizontal: 5,
                    //paddingVertical: 5,
                    borderRadius: 5,
                }}>
                    

                {/*<GooglePlaces 
					apiKey="AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4" //required (Get from https://developers.google.com/places/web-service/get-api-key)
					onAddressSelect={(value)=>findTravelerTo(value.terms)}
            /> */}
                 <GooglePlacesAutocomplete
                        placeholder='Enter your destination'
                        onPress={(value)=>findTravelerTo(value.terms)}
                        query={{
                            key: 'AIzaSyA_-VSJ-j1yY2kl50xxcNcRqvZiK3-Kng4',
                            language: 'en',
                            types: '(cities)'
                        }}
                        styles={{
                          textInputContainer: {
                            // backgroundColor: 'grey',
                          },
                          textInput: {
                            //height: 50,
                            borderWidth: 0.4,
                            width:300,
                            color: '#5d5d5d',
                            fontSize: 16,
                            borderRadius:5,
                            marginTop: 10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />
                </View>
                <Text style={{
                     marginTop: 20,
                     marginBottom: 3,
                     fontFamily: "Poppins_400Regular",
                     fontSize: 18,
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
                    justifyContent: "space-between",
                    //borderWidth: 1,
                    borderColor: "gray",
                    //borderWidth: 0,
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    paddingHorizontal: 5,
                    //paddingVertical: 5,
                    borderRadius: 5,
                    marginTop: 10,
                }} onPress={()=>{
                    setShowTravelerDatePickerFrom(true)
                }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>{travelerDate.toLocaleString()}</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
                
                <Pressable style={{
                    backgroundColor: "#13b955",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    width: "100%",
                    //position: "absolute",
                    bottom: 0,
                    //left: 15
                    marginTop: "75%",
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
                        textAlign: "center",
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>

            {showDatePickerTravelerFrom ? (
                <View>
                    <View>
                      
                             <Pressable style = {{
                                //backgroundColor: '#e8e8e8',
                                width: '20%',
                                alignItems: 'center',
                                marginLeft: 3,
                            }}
                                onPress={setShowFalser}>
                                <AntDesign name="closecircle" size={24} color="red" />
                            </Pressable>
                       
                    
                    </View>
                    
                     <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    // is24Hour={true}
                    onChange={(date, selectedDate)=>{
                        setTravelerDate(moment(selectedDate).format('YYYY-MM-DD'))
                        console.log("daaaaaaate is:", selectedDate)
                        setTimeout(() => {
                            setShowTravelerDatePickerFrom(false)
                          }, 5000);
                    }}
                />
                </View>
               
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