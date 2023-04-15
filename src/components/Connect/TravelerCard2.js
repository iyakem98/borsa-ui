import {View, Image, Modal, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
// import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { getSenderFull } from '../../ChatConfig/ChatLogics';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { Entypo, MaterialIcons, Octicons, Ionicons, Foundation, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


const TravelerCard = ({traveler}) => {
    
    // console.log(traveler.user._id)
    const { user } = useSelector((state) => state.auth)
    // const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId, loading,  setloading } = ChatState(); 
    const dispatch = useDispatch()
    const navigation = useNavigation();
    var travelerId = useRef(null)
    const [isBuyer, setIsBuyer] = useState(false)
    function tweakBuyer() {
        setIsBuyer(!isBuyer)
    }

    const [modal, setModal] = useState(false)
    const [showModal, setshowModal] = useState(false)
    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);

    
    const TravelerChat = async(travData) => {
        // console.log(travData)
        const userId = travData._id
        // console.log(userId)
        // // console.log(userId)
        // // // console.log(travelerId.current)
        try{
            const config = {
              headers: {
                  Authorization: `Bearer ${user.token}`
        
              }
          }
        //   setloading(true)
          navigation.navigate('Messaging', {userSelected:
            
            travData})
            const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            // console.log(data._id)
            setchatSelected(true)
            setchattId(data._id)
            // console.log(data._id)
            // setchatSelected(true)
        
            // navigation.navigate('Messaging', {chatId: data._id, userSelected:
            
            //     user != null ? getSenderFull(user, data.users) : null })
                
            }
            // return data
            
            
        catch(err){
            console.log(err)
        }
    }
  return (
    <>
   <Pressable onPress={() =>{
         setshowModal(true)
          setModal(true)
    }}>

     
    <View style = {styles.container}>
        <View style = {{
            backgroundColor: "white",
            paddingTop: 6
        }}>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10
            }}>
                   <Text style = {{
                    fontSize: 20
                   }}>
                        {traveler.user.address ? traveler.user.address : "New York"}
                    </Text>
           
                    <Ionicons name="md-airplane-sharp" size={28} color="#593196" style = {{
                   
            }} />

            <Text style = {{
                    fontSize: 20
                   }}>
                        {traveler.destination ? traveler.destination : "Citeh"}
                    </Text>

         

            </View>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 8
            }}>

               <View style = {{
                flexDirection: 'row'
               }}>
                <Text>
                    Departure: 
                </Text>
                <Text style = {{
                    marginLeft: 3,
                }}>
                    {/*{traveler.departureDate} */}
                    April 12, 2023
                </Text>
               </View>

                 <View style = {{
                flexDirection: 'row',
               }}>
                <MaterialIcons name="luggage" size={24} color="#593196" />
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 18,
                }}>
                   {traveler.luggageSpace}
                </Text>
                <Text style = {{
                    marginLeft: 3,
                    fontWeight: 'bold',
                    fontSize: 18
                }}>
                    {/*{traveler.departureDate} */}
                    kg
                </Text>
               </View>
                
            </View>
        </View>
        <View style = {styles.container_bottom}>
        <View style = {{
            width: '16%'
        }}>
            <Image 
                source={{uri: traveler.user.profilePic}}
                alt="user"  
                style = {styles.image}
                resizeMode = 'cover'
             />
             
            {/* <Pressable style = {{
                borderStyle: 'solid',
                borderBottomWidth: 0.8,
                marginLeft: 6,
                width: "65%",
                paddingHorizontal: 2,
                borderColor: "#593196",
             }}>
                <Text style = {{
                    color: '#593196',
                    //color: 'gray',
                    fontWeight: 'bold'
                }}>
                    View Profile
                </Text>
            </Pressable> */}
        </View>
        

        <View style = {{
            width: '40%',
            paddingHorizontal: 10
        }}>
            <View style = {{
                flexDirection: 'row',
            }}>
                <Text style = {{
                    fontSize: 17,
                    marginTop: 2
                }}>
                    {traveler.user.firstName + " " + traveler.user.lastName}
                </Text>
                {/* <Entypo name="magnifying-glass" size={20} color='#593196' style = {{marginHorizontal: 5, marginTop: 5}} /> */}
                
            </View>

            {/* <Pressable style = {{
                border: '1px solid green',
                //backgroundColor: '#a991d4',
                width: "70%",
                alignItems: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30

            }} 
             onPress= {() => {
                setModal(true)
                console.log("traveler:", traveler)
             }}
            >
                <Text style = {{
                    fontSize: 18,
                    color: 'green'
                }}>
                    View Profile
                </Text>
            </Pressable> */}

        </View>
        <View style = {{
            width: "50%"
        }}>
        <Pressable style = {{
                backgroundColor: '#13b955',
                width: "90%",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: '#13b955',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
        
                elevation: 1,

            }} onPress={() => TravelerChat(traveler.user)}>
                <AntDesign name="message1" size={24} color="white" style = {{
                    marginRight: 5
                }} />
                <Text style = {{
                    fontSize: 18,
                    color: 'white'
                }}>
                    Message
                </Text>
            </Pressable>
        </View>
        

        </View>
        
        <View>
           
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModal(false);
          setshowModal(false)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                      <Image source={{ uri: image }} style={{ 
                        width: 200,
                        height: 200,
                        // borderRadius: "100%",
                        borderRadius: 100,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        }} />
                    <View style={{
                        marginTop:10,
                        fontSize:20,
                        fontWeight:700
                    }}>
                        <Text>{traveler.user.firstName+' '+traveler.user.lastName}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <Ionicons name="location" size={20} color="black" />
                       {/* <Text> &nbsp; &nbsp; {traveler.user.address}</Text> */}
                       <Text>{traveler.user.address}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         <Foundation name="shopping-bag" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; Unknown</Text> */}
                         <Text>Unknown</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                         <MaterialCommunityIcons name="weight-kilogram" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; {traveler.luggageSpace}</Text> */}
                         <Text>{traveler.luggageSpace}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={20} color="black" />
                        {/* <Text> &nbsp; &nbsp; {traveler.status}</Text> */}
                        <Text>{traveler.status}</Text>
                    </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>&times;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
    </Pressable>
    </>
    // <View>
    //     {/* <Text>{traveler}</Text> */}
    // </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: "100%",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E8E8E8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,

    },
    container_bottom: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        flex : 1,
        marginBottom: 8,
        height: "8%",
       // backgroundColor: "#E8E8E8",
        paddingVertical: 10,
        paddingHorizontal: 5,
        //borderStyle: 'solid',
       
        
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: '#13b955'
        
    },

  

    destination: {
        flexDirection: 'row',
       // backgroundColor: "#13b955",
        marginVertical: 5,
        borderRadius: 30,
        paddingHorizontal: 6,
        width: 220
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#593196',
      },
      buttonClose: {
        backgroundColor: 'green',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:19
      },
      modalText: {
        marginBottom: 16,
        textAlign: 'center',
      },

    
})

export default TravelerCard