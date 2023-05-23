import { View, Text, Pressable, ScrollView, StyleSheet} from "react-native"
import { ChatState } from "../../context/ChatProvider";
import { Button } from "react-native-paper";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
 

const TravelerHeader = () => {
    const { 
        travelerFilterOn,
        setTravelerFilterOn,
        travelerFilter,
        setTravelerFilter,
        buyerFilter,
        setBuyerFilter,
        buyerFilterOn,
        setBuyerFilterOn
      } = ChatState();

      const toggleFilter = () => {
        setTravelerFilterOn(!travelerFilterOn)
      }
  return (
    <View style = {{
        paddingBottom: 10,
    }}>
        {travelerFilterOn? (
        <View style = {{
            //backgroundColor: 'yellow',
            maxHeight: "100%",
        }}>

            <Pressable onPress={toggleFilter}
                style = {{
                    //backgroundColor: '#E8E8E8',
                    paddingLeft: 10,
                    width: "10%"

                }}
            >
            <Ionicons name="close-circle" size={28} color="black" />
            </Pressable>

            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollView}>
                
                <Text style={{
                    marginTop: 20,
                    marginBottom: 3,
                    fontFamily: "Poppins_400Regular",
                    //fontSize: 18,
                }}>
                    Pick Up
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderWidth: 0,
                    borderBottomWidth: 1,
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
                        //onPress={(value)=>findLocationFrom(value.terms)}
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
                            //borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#000",
                            width:300,
                            color: '#5d5d5d',
                            //fontSize: 16,
                            borderRadius:10,
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
                    //fontSize: 18,
                }}>
                    Destination
                </Text>
                <View style={{
                    borderWidth: 1,
                    borderWidth: 0,
                    borderBottomWidth: 1,
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
                        //onPress={(value)=>findLocationTo(value.terms)}
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
                            borderColor: "#000",
                            //borderWidth: 1,
                            borderStyle: "solid",
                            width:300,
                            color: '#5d5d5d',
                            //fontSize: 16,
                            borderRadius:10,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        />
                </View>
                </ScrollView>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 30,
                }}>
                    <Pressable style = {{
                        backgroundColor: '#593196',
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                        marginHorizontal: 2,
                    }}>
                        <Text style = {{
                            color: 'white'
                        }}>
                            Apply 
                        </Text>
                    </Pressable >
                    <Pressable style = {{
                        backgroundColor: '#E8E8E8',
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                        marginHorizontal: 2,
                    }}>
                        <Text>
                            Discard
                        </Text>
                    </Pressable>
                </View>
        </View>    
            ): (
            <View style = {{
                flexDirection: 'row',
                //justifyContent:'space-around',
                alignItems: 'center',
            }}>
                <View>
                <Pressable onPress={toggleFilter}
                    style = {{
                        backgroundColor: '#e8e8e8',
                        //backgroundColor: '#a991d4',
                        //backgroundColor: 'black',
                        //backgroundColor: '#009cdc',
                        //backgroundColor: "#593196",
                        //backgroundColor: '#7267e7',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                }}>
                    <Ionicons name="filter" size={24} color="black" />
                    <Text style = {{
                        fontSize: 18,
                        marginLeft: 2,
                        //color: 'white'
                    }}>
                       Filter results
                    </Text>
                </Pressable>
                </View>
                
            </View>
        )}

       
    </View>
  )
}

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

export default TravelerHeader