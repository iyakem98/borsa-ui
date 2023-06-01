import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

const data = [
    { id: '0', imageSource: require('../../../assets/images/avatars/blank-avatar.png') },
    { id: '1', imageSource: require('../../../assets/images/avatars/bottts1.png') },
    { id: '2', imageSource: require('../../../assets/images/avatars/bottts2.png') },
    { id: '3', imageSource: require('../../../assets/images/avatars/bottts3.png') },
    { id: '4', imageSource: require('../../../assets/images/avatars/bottts4.png') },
    { id: '5', imageSource: require('../../../assets/images/avatars/bottts5.png') },
    { id: '6', imageSource: require('../../../assets/images/avatars/bottts6.png') },
    { id: '7', imageSource: require('../../../assets/images/avatars/bottts7.png') },
    { id: '8', imageSource: require('../../../assets/images/avatars/bottts8.png') },
    { id: '9', imageSource: require('../../../assets/images/avatars/bottts9.png') },
    { id: '10', imageSource: require('../../../assets/images/avatars/bottts10.png') },
    { id: '11', imageSource: require('../../../assets/images/avatars/bottts11.png') },
    { id: '12', imageSource: require('../../../assets/images/avatars/bottts12.png') },
    { id: '13', imageSource: require('../../../assets/images/avatars/bottts13.png') },
    { id: '14', imageSource: require('../../../assets/images/avatars/bottts14.png') },
    { id: '15', imageSource: require('../../../assets/images/avatars/bottts15.png') },
    { id: '16', imageSource: require('../../../assets/images/avatars/bottts16.png') },
    { id: '17', imageSource: require('../../../assets/images/avatars/bottts17.png') },
    { id: '18', imageSource: require('../../../assets/images/avatars/bottts18.png') },
    { id: '19', imageSource: require('../../../assets/images/avatars/bottts19.png') },
    { id: '20', imageSource: require('../../../assets/images/avatars/bottts20.png') },
    // Add more images as needed
  ];

const WelcomeProPic = () => {
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.auth)

    const getImageSourceById = (id) => {
        const item = data.find((item) => item.id === id);
        return item ? item.imageSource : null;
      };
  return (
    <LinearGradient 
    colors={['#705c9d','#593196']}
    style = {{
        height: "100%",
        //alignItems: 'center',
        paddingTop: 150,
        paddingHorizontal: 15,
        //justifyContent: 'center'
    }}>
    
    {(user?.profilePic == '0')? (

        <View>

        <View style = {{
                //paddingRight: "35%",
                marginBottom: 20,
            }}>
                <Text style = {{
                    fontSize: 30,
                    color: 'white',
                    fontFamily: "Poppins_400Regular"
                }}>
                    Hello {user?.firstName},
                </Text>
            </View>

    <View style = {{
        marginBottom: 60,
    }}>
        <Text style = {{
            fontSize: 35,
            color: 'white',
            fontFamily: "Poppins_400Regular"
        }}>
            Welcome to Borsa!
        </Text>
    </View>
    <View style = {{
        //paddingHorizontal: 20,
        marginBottom: 20,
    }}> 
        <Text style = {{
            fontSize: 18,
            color: 'white',
            fontFamily: "Poppins_400Regular"
        }}>
            Do you want to choose an avatar for your profile picture?
        </Text>
    </View>

    <View style = {{
        flexDirection: 'row',
        width: '100%',
        //paddingHorizontal: 30,
    }}>
        <Pressable onPress={() => navigation.navigate('ProfilePicker')}
            style = {{
                backgroundColor: "#13b955",
                borderRadius: 8,
                marginHorizontal: 5,
                paddingHorizontal: 12,
                paddingVertical: 3,
            }}>

            <Text style = {{
                color: 'white',
                fontFamily: 'Poppins_400Regular',
                fontSize: 18,
            }}>
                Yes
            </Text>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('WelcomePost')}
            style = {{
                borderStyle: 'solid',
                borderWidth: 0.5,
                borderColor: '#fff',
                marginHorizontal: 5,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 8,
            }}>
             <Text style = {{
                color: 'white',
                fontFamily: 'Poppins_400Regular',
                fontSize: 18,
            }}>
                Skip
            </Text>

        </Pressable>
    </View>
        </View>

    ) : (
        <View>

        <View style = {{
                //paddingRight: "35%",
                marginBottom: 20,
            }}>
                <Text style = {{
                    fontSize: 30,
                    color: 'white',
                    fontFamily: "Poppins_400Regular"
                }}>
                    Great!
                </Text>
            </View>

        <View style = {{
            marginBottom: 10,
        }}>
            <Text style = {{
                fontSize: 25,
                color: 'white',
                fontFamily: "Poppins_400Regular"
            }}>
               You have just chosen your avatar!
            </Text>
        </View>
        <View style = {{
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
        }}>
            <Image source = {getImageSourceById(user?.profilePic)} 
            style = {{
                width: 120,
                height: 120,
            }}
            />
        </View>
        <View style = {{
            //paddingHorizontal: 20,
            marginBottom: 40,
        }}> 
            <Text style = {{
                fontSize: 18,
                color: 'white',
                fontFamily: "Poppins_400Regular"
            }}>
                You have just chosen your avatar. You can change it anytime. 
            </Text>
        </View>
    
        <View style = {{
            flexDirection: 'row',
            width: '100%',
            //paddingHorizontal: 30,
        }}>
            <Pressable onPress={() => navigation.navigate('ProfilePicker')}
                style = {{
                    backgroundColor: "#13b955",
                    borderRadius: 8,
                    marginHorizontal: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                }}>
    
                <Text style = {{
                    color: 'white',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 18,
                }}>
                    Continue
                </Text>
    
            </Pressable>
            <Pressable onPress={() => navigation.navigate('WelcomePost')}
                style = {{
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    marginHorizontal: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 8,
                }}>
                 <Text style = {{
                    color: 'white',
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 18,
                }}>
                    Back to Avatars
                </Text>
    
            </Pressable>
        </View>
            </View>
    )}

   {/* <View style = {{
        width: "100%",
        alignItems: 'center',
        paddingTop: 1,
        paddingLeft: 40,
    }}>
        <Image 
                  source = {require ('../../../assets/images/avatars/bottts8.png')} 
                  style = {{
                    width: 160,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 20,
                    background: 'white'
                  }}
                />
        </View>
        <View style = {{
        width: "100%",
        position: 'absolute',
        bottom: 80,
        left: 10,
        //alignItems: 'center',
        //paddingTop: 40,
    }}>
        <Image 
                  source = {require ('../../../assets/images/avatars/bottts12.png')} 
                  style = {{
                    width: 160,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 20,
                    background: 'white'
                  }}
                />
        </View>

        <View style = {{
        width: "100%",
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 10,
        right: 40,
        //alignItems: 'center',
        //paddingTop: 40,
    }}>
        <Image 
                  source = {require ('../../../assets/images/avatars/bottts11.png')} 
                  style = {{
                    width: 160,
                    height: 160,
                    resizeMode: 'cover',
                    marginBottom: 20,
                    background: 'white'
                  }}
                />
                </View> */}

   

    </LinearGradient>
  )
}

export default WelcomeProPic