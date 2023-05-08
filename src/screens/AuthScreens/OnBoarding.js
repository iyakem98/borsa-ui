import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const OnBoarding = ({navigation}) => {
    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@doNotShowOnBoarding', "true")
        } catch (e) {
        // saving error
        }
    }

    return (
        <View>
            <Image 
                source={{
                    uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                }}
                style={{
                    height: windowHeight,
                    width: windowWidth,
                    position: "absolute"
                }}
            />
            {/* rgba(0,0,0,0.8) */}
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', '#444']}
                style={{
                    height: windowHeight,
                    width: windowWidth
                }}
            />
            <View style={{
                position: "absolute",
                bottom: 20,
                left: 15,
                right: 15
            }}>
                <Text style={{
                    color: "#fff",
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 30
                }}>
                    Find cheap ways to deliver your packages
                </Text>
                <Text style={{
                    color: "#ddd",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    marginTop: 10
                }}>
                    We will help you connect with peoples across the world to deliver your package or in reverse be the delivery person
                </Text>
                <Pressable style={{
                    backgroundColor: "#514590",
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    marginTop: 50,
                    width: "100%"
                }} onPress={()=>{
                    storeData();
                    navigation.navigate('Register')
                }}>
                    <Text style={{
                        color: "#fff",
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        textAlign: "center"
                    }}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({})