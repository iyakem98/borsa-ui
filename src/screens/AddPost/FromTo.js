import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import CountryPicker from 'react-native-country-picker-modal'
import DatepickerRange from 'react-native-range-datepicker';
import { AntDesign } from '@expo/vector-icons'

const FromTo = ({navigation}) => {
    const [countryFromCode, setCountryFromCode] = useState('FR')
    const [countryFrom, setCountryFrom] = useState(null)
    const [countryToCode, setCountryToCode] = useState('ET')
    const [countryTo, setCountryTo] = useState(null)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState()
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Buyer"} shadow backBtn />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    From
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5
                }}>
                    <CountryPicker
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
                    />
                </View>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    To
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5
                }}>
                    <CountryPicker
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
                    />
                </View>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Departure Date
                </Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} onPress={()=>setVisible(true)}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>14/05/22</Text>
                    <AntDesign name="calendar" size={24} color="#777" />
                </Pressable>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Arrival Date
                </Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: "#777",
                    paddingHorizontal: 15,
                    paddingVertical: 11,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }} onPress={()=>setVisible(true)}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium"
                    }}>14/05/22</Text>
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
                }} onPress={()=>navigation.navigate("FromTo")}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{"Next"}</Text>
                </Pressable>
            </ScrollView>
            {visible ? (
                <View style={{
                    position: "absolute",
                    top: 0
                }}>
                    <DatepickerRange
                        startDate="13052017"
                        untilDate="26062017"
                        onConfirm={( startDate, untilDate ) => setDate({ startDate, untilDate })}
                    />
                </View>
            ) : null}
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