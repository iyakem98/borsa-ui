import { Dimensions, ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Shared/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get("screen").width

const AddPost = ({navigation}) => {
    const [selected, setSelected] = useState(1)

    const [isAlreadyTraveler, setIsAlreadyTraveler] = useState(false)

    const { user} = useSelector(
        (state) => state.auth
      )

      const [spinner, setSpinner] = useState(false)

    const checkTraveler = async () => {
        setSpinner(true)
        let config = {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem('myToken')}`
              }}
        
        let {data} =   await axios.get(`http://143.198.168.244/api/travels/my`,
        config)
        console.log("=======", data.data)
        if(data.data.length>0){
            Alert.alert('Already a Traveler', 'Do you want to delete your previous traveler card and add a new one?', [
                
                {text: 'OK', onPress: async () => {
                    navigation.navigate("My Cards")
                }},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
              ]);
        }else{

        navigation.navigate("FromTo", {
            cardType: selected,
          })
        }


       setSpinner(false)
  
      }

   
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Add Post"} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{
                    marginTop: 20,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 18,
                    marginBottom: 10,
                }}>
                    Are you a traveling or getting items?
                </Text>
                <View style={styles.horizontal}>
                    <Pressable style={[styles.component, selected === 1 ? {
                        borderColor: "#514590",
                        borderColor: "#13b955",
                        borderWidth: 2
                    } : {
                        borderColor: "#f7f7f7",
                    }]} onPress={()=>{
                        if(!spinner) {
                            setSelected(1)
                        }
                    }}>
                        <View style={[styles.radioWrapperTr, selected !== 1 ? {
                            borderColor: "#ccc"
                        } : {}]}>
                            {selected === 1 ? (
                                <View style={[styles.radioTr, selected !== 1 ? {
                                    backgroundColor: "#ccc"
                                } : {}]} />
                            ) : null}
                        </View>
                        <Text style={styles.compTxt}>Traveling</Text>
                    </Pressable>
                    <Pressable style={[styles.component, selected === 2 ? {
                        borderColor: "#514590",
                        //borderColor: '#13b955',
                        borderWidth: 2
                    } : {
                        borderColor: "#f7f7f7",
                    }]} onPress={()=>{
                        if(!spinner) {
                            setSelected(2)
                        }
                    }}>
                        <View style={[styles.radioWrapper, selected !== 2 ? {
                            borderColor: "#ccc"
                        } : {}]}>
                            {selected === 2 ? (
                                <View style={[styles.radio, selected !== 2 ? {
                                    backgroundColor: "#ccc"
                                } : {}]} />
                            ) : null}
                        </View>
                        <Text style={styles.compTxt}>Shipping</Text>
                    </Pressable>
                </View>
                <Pressable style={{
                    backgroundColor: `${selected == 1 ? '#514590' : '#514590'}`,
                    paddingVertical: 15,
                    borderRadius: 5,
                    marginBottom: 25,
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 15
                }} 
                //onPress={()=>navigation.navigate("FromTo")}
                onPress={()=>{
                //     navigation.navigate("FromTo", {
                //     cardType: selected,
                 
                //   })
                  if(selected==1){
                    checkTraveler()
                }
                else{
                    navigation.navigate("FromTo", {
                        cardType: selected,
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
                    }}>{spinner ? "Loading" : "Next"}</Text>
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
    radioWrapperTr: {
        // backgroundColor: "#aaa",
        height: 21,
        width: 21,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#13b955",
        position: "absolute",
        top: 15,
        right: 15
    },
    radio: {
        backgroundColor: "#514590",
        height: 14,
        width: 14,
        borderRadius: 10
    },

    radioTr: {
        backgroundColor: '#13b955',
        height: 14,
        width: 14,
        borderRadius: 10
    }
})