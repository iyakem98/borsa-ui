import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { useSelector } from 'react-redux'
import FormData from 'form-data'

const Description = ({navigation}) => {
    const route = useRoute()
    const { user } = useSelector((state) => state.auth)
    const params = route.params;

    const [messages, setMessages] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        console.log(params)
    }, [])

    const handlePostTraveler = async() => {
        let data = {...params}

        if(messages) {
            data.description = messages
        }
        try {
            const res = await axios.post("http://143.198.168.244/api/travels", data, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
            console.log("first", res.data)
            navigation.navigate("My Cards")
        } catch (e) {
            console.log("POST ERROR: ", e?.response?.data)
        }
    }

    const handlePostBuyer = async(form) => {
        try {
            const res = await axios.post("http://143.198.168.244/api/travels", form, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
            console.log("first", res.data)
            navigation.navigate("My Cards")
        } catch (e) {
            console.log("POST ERROR: ", e?.response?.data)
        }
    }

    const handlePost = async() => {
        setIsLoading(true)
        const form = new FormData();
        if(params && params.cardType === 2) {
            form.append('departure', params?.departure);
            form.append('startDate', params?.startDate);
            form.append('endDate', params?.endDate);
            form.append('destination', params?.destination);
            form.append('totalWeight', params?.luggageSpace);
            form.append('item', params?.item);
            if(messages) {
                form.append('description', messages);
            }
            handlePostBuyer(form)
        } else {
            handlePostTraveler()
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        console.log(params)
    } ,[])
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={route.params.cardType == 2 ? "Buyer" : "Traveler"} backBtn />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Description(optional)
                </Text>
                <TextInput
                    label="Description"
                    value={messages}
                    onChangeText={text => setMessages(text)}
                    mode="outlined"
                    style={{
                        marginBottom: 13,
                        // paddingVertical: 5
                    }}
                    // error={userPasswordError}
                    outlineStyle={{
                        backgroundColor: "#fff",
                    }}
                    placeholderTextColor= "#eee"
                    multiline
                    numberOfLines={6}
                />
                <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 15
                }} onPress={()=>handlePost()}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>{isLoading ? "Loading" : "Next"}</Text>
                </Pressable>
            </ScrollView>
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