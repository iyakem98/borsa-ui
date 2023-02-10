import { View, Pressable, Text, ScrollView, Image, ImageBackground, StyleSheet } from "react-native"
import profile from '../../../assets/data/profile.json'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const AccountScreen = () => {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation()
  return (
    <View style = {{
        paddingTop: 30,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
        alignItems: 'center'
    }}>

      <View style = {{
        alignItems: 'center'
      }}>
        <ImageBackground source={{
                uri: "https://www.usmagazine.com/wp-content/uploads/2021/01/The-Weeknd-Save-Your-Tears-Plastic-Surgery-Look-Is-Prosthetics-Feature.jpg?w=700&quality=86&strip=all",
                }}
                style = {{
                  width: 150,
                  height: 150,
                  borderRadius: "80%",
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
                imageStyle = {{
                  borderRadius: "100%"
                }}
                >
                  <View style = {{
                    borderRadius: "50%",
                    backgroundColor: '#593196',
                    backgroundColor: '#a991d4',
                    paddingHorizontal: 2,
                    paddingVertical: 2,
                    marginRight: 20
                  }}>
                    <Entypo name="pencil" size={24} color="black" />
                  </View>
        </ImageBackground>
        <Text style = {{
          fontSize: 25,
          marginTop: 10
        }}>
          {user.firstName + ' ' + user.lastName}
        </Text>
        <Text style = {{
          color:'gray',
        }}>
          {user.userName}
        </Text>
      </View>

      <View style = {{
        width: '90%',
        paddingTop: 40,
      }}>
        
        <Pressable onPress={() => navigation.navigate('Edit UserName')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            username
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.userName}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        
        <Pressable onPress={() => navigation.navigate('Edit Name')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Name
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.firstName + ' ' + user.lastName} 
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit Email')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Email
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              {user.email}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit Location')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Location
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
               {user.city + ', ' + user.country}
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>

        <Pressable onPress={() => navigation.navigate('Edit MyBuyer')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Buyer
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            <Text style = {{
              color: "gray",
              marginRight: 10,
              fontSize: 16,
            }}>
              Yes 
            </Text>
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>
        <Pressable onPress={() => navigation.navigate('Edit MyTraveler')}
          style = {styles.pressable}>

          <Text style = {{
            fontSize: 16,
          }}>
            Traveler
          </Text>

          <View style = {{
            flexDirection: 'row'
          }}>
            {user.isTraveler? (
                <Text style = {{
                  color: "gray",
                  marginRight: 10,
                  fontSize: 16,
                }}>
                  Yes 
                </Text>
            ): (
              <Text style = {{
                color: "gray",
                marginRight: 10,
                fontSize: 16,
              }}>
                Yes 
              </Text>
            )}
            
            <AntDesign name="right" size={17} color="gray" />
          </View>

        </Pressable>        
      </View>

     <View style = {{
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
     }}>
      <Pressable style = {{
        width: "70%",
        backgroundColor: "#fc3939",
        backgroundColor: '#593196',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 20
        
      }}>

        <Text style = {{
          color: 'white'
        }}>
          Save Changes
        </Text>

      </Pressable>
     </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderRadius: 30,
    //borderStyle: 'solid',
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginVertical: 5,
    //borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#E8E8E8',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.00,

    elevation: 1, 
  }
})

export default AccountScreen