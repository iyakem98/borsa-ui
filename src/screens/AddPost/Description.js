import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Shared/Header'
import { TextInput } from 'react-native-paper'

const Description = ({navigation}) => {
    const [messages, setMessages] = useState("")
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Buyer"} backBtn />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular"
                }}>
                    Message(optional)
                </Text>
                <TextInput
                    label="Email"
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
                }} onPress={()=>navigation.navigate("PostDescription")}>
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