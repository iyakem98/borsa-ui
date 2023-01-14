import { View, Text, Pressable, Stylesheet, TextInput, Image, StyleSheet } from "react-native"
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import emailjs from '@emailjs/browser';
const ContactScreen = () => {

  return (
    <View style = {{
        //paddingTop: 20,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        alignItems: 'center',
    }}>
        <View style = {{
          height: "50%",
          width: "100%",
          backgroundColor: "#593196",
          //backgroundColor: '#a991d4',
          alignItems: 'center',
          paddingTop: 40
        }}>

        
            <Image 
                source = {require ('../../data/logos/lwhiteclearbg.png')} 
                style = {{
                    width: 80,
                    height: 130,
                    resizeMode: 'cover',
                    marginBottom: 10,
                }}
                /> 
        <View style = {{
          width: "90%",
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 30,
        }}>

          <View>
              
              <View style = {{
                flexDirection: 'row',
              }}>
                <MaterialIcons name="email" size={17} color="white" />
                <Text style = {{
                  color: 'white',
                  marginLeft: 5,
                  marginBottom: 7
                }}>
                  info@borsa.world
                </Text>
              </View>

              <View style = {{
                flexDirection: 'row'
              }}>
                <Entypo name="phone" size={17} color="white" />
                <Text style = {{
                  color: 'white',
                  marginLeft: 5,
                }}>
                  +251913633037
                </Text>
              </View>
          </View>

          <View>
             
             <View style = {{
              flexDirection: 'row'
             }}>
              <Entypo name="location-pin" size={17} color="white" />
              <Text style = {{
                marginLeft: 5,
                color: '#fff'
              }}>
                Bole MM next to church
              </Text>
             </View>

          </View>
        </View>
      

        </View>

        <View  style = {{
          height: "50%",
          width: "100%",
          alignItems: 'center',
          backgroundColor: '#f9f8fc'
        }}>

          <View style = {{
            height: 430,
            width: "90%",
            backgroundColor: '#fff',
            position: "absolute",
            paddingTop: 30,
            zIndex: 1000,
            marginTop: -100,
            paddingHorizontal: 10,
            borderRadius: 30,

            shadowColor: 'gray',
                  shadowOffset: {
                      width: 0,
                      height: 1,
                  },
                  
                  shadowOpacity: 0.60,
                  shadowRadius: 1.0,

                  elevation: 1,

          }}>

          <View style = {{
                    width: "100%",
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                }}>
                <TextInput placeholder='First Name'
                  style = {{
                    width: '43%',
                    //paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,
  
                  }}
                  />

                <TextInput placeholder='Last Name'
                  style = {{
                    width: '43%',
                    //paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderStyle: 'solid',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgray",
                    fontSize: 18,
                    marginBottom: 16,
  
                  }}
                  />
  
                </View>

                <TextInput placeholder='Enter your email'
                style = {{
                  width: '85%',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: 'solid',
                  borderBottomWidth: 0.5,
                  borderColor: "lightgray",
                  fontSize: 18,
                  marginBottom: 16,

                }}
                />

              <TextInput placeholder='Enter your message'
                style = {{
                  width: '100%',
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderStyle: 'solid',
                  borderWidth: 0.5,
                  height: 220,
                  borderColor: "lightgray",
                  fontSize: 18,
                  marginBottom: 16,

                }}
                />

                <Pressable style = {{
                  backgroundColor: '#13b955',
                  width: "50%",
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                  marginLeft: 'auto',
                  marginRight: 'auto',

                }}>
                  <Text style = {{
                    color: 'white',
                    fontSize: 17
                  }}>
                    Send message
                  </Text>
                </Pressable>

            
          </View>

        </View>
    </View>
  )
}

export default ContactScreen