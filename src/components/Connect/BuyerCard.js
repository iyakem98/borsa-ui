import {View, Modal, Image, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
import { Entypo, MaterialIcons, Octicons, Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ChatState } from '../../context/ChatProvider';
import { useNavigation } from '@react-navigation/native';
import { getSenderFull } from '../../ChatConfig/ChatLogics';
import { getUserDetails } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { useState } from 'react'


const BuyerCard = ({buyer}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected, chattId, setchattId } = ChatState(); 
    const navigation = useNavigation();

    const [modal, setModal] = useState(false)

    const viewDetail = (user) => {
        alert("detail")
    }

    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);

    // const BuyerChat = async(buyerID)=> {
    //     const userId = buyerID
    //     try{
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`
        
    //             }
    //         }
    //         const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
    //         // console.log(data._id)
    //         setchatSelected(true)
        
    //         navigation.navigate('Messaging', {chatId: data._id, userSelected:
            
    //             user != null ? getSenderFull(user, data.users) : null })
                
            
    //         // return data
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
    const BuyerChat = async(buyerData)=> {
        const userId = buyerData._id
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
        
                }
            }
            navigation.navigate('Messaging', {userSelected:
            
                buyerData})
                // const {data} = await axios.post('http://192.168.100.2:5000/api/chat/', {userId}, config)
                const {data} = await axios.post(BASE_URL + 'chat/', {userId}, config)
                setchattId(data._id)
                
          
    }

    const goToUserProfile = async () => {
        
        
        //navigation.navigate("User Details")

    };
  return (
    <>
        <View style = {styles.container}>
        <View style = {{
            width: '35%'
        }}>
            <Image 
                source={{uri: buyer.user.profilePic}}  
                style = {styles.image}
                resizeMode = 'cover'
             />
              <View style = {styles.location_container}>
                <Entypo name="location-pin" size={20} color="red" />
                <View>
                    <Text style = {styles.text_loc}>
                        
                        {buyer.user.address},
                    </Text>


             </View>
             </View>
           {/*  <Pressable style = {{
                borderStyle: 'solid',
                borderBottomWidth: 0.8,
                marginLeft: 6,
                width: "65%",
                paddingHorizontal: 2,
                borderColor: "#593196",
             }}>
                <Text style = {{
                    //color: '#593196',
                    //color: 'gray',
                    fontWeight: 'bold'
                }}>
                    View Profile
                </Text>
            </Pressable> */}
        </View>

        <View style = {{
            width: '70%',
            paddingHorizontal: 10
        }}>
            <View style = {{
                flexDirection: 'row',
            }}>
                <Text style = {{
                    fontSize: 20,
                    marginTop: 2
                }}>
                {buyer.user.firstName + ' ' + buyer.user.lastName} 
            </Text>

            <Entypo name="magnifying-glass" size={20} color='#593196' style = {{marginHorizontal: 5, marginTop: 5}} />

            </View>

           
            <View style = {styles.destination}>
            <View style = {{
                //backgroundColor: '#593196',
                //backgroundColor: '#a991d4',
                //borderRadius: "50%",
                //padding: 5,date
                //marginRight: 5
                
            }}>
                 <Octicons name="list-unordered" size={18} color="#593196" style = {{
                    marginRight: 7,
                    
       }} />
            
            </View>
           
            
                <Text style = {{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginRight: 2,
                    marginTop: 1,
                    //color: '#593196'
                }}>
                    {buyer.orders}, 
                </Text>
           </View>
           <View style = {{
                 paddingLeft: "12%",
                 marginTop: -6,
           }}>
            <Text style = {{
                fontWeight: "",
                color: '#343a40'
            }}>
                {buyer.orderDate}
            </Text>
           </View>
           <View style = {styles.space}>
            <View style = {{
                paddingVertical: 5
            }}>
            <Text style = {{
                fontWeight: 'bold',
                 fontSize: 18,  
            }}>
                {buyer.orderWeight}
            </Text>
            </View>
            </View>
            <Pressable style = {{
                backgroundColor: '#593196',
                //backgroundColor: '#a991d4',
                width: "70%",
                alignItems: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30

            }} onPress= {() => BuyerChat(buyer)}>
                <Text style = {{
                    fontSize: 18,
                    color: 'white'
                }}>
                    Start chatting
                </Text>
            </Pressable>
            <View>
            <Pressable style = {{
                border: '1px solid #593196',
                //backgroundColor: '#a991d4',
                width: "70%",
                alignItems: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30

            }} 
             onPress= {() => {
                setModal(true)
                console.log("buyyyyyyyyyer:", buyer)
             }}
            >
                <Text style = {{
                    fontSize: 18,
                    color: '#593196'
                }}>
                    View Profile
                </Text>
            </Pressable>
        </View>
        </View>

       
        
    </View>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                      <Image source={{ uri: image }} style={{ 
                        width: 200,
                        height: 200,
                        borderRadius: "100%",
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        }} />
                    <View style={{
                        marginTop:10,
                        fontSize:20,
                        fontWeight:700
                    }}>
                        {buyer.user.firstName+' '+buyer.user.lastName}
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <Ionicons name="location" size={20} color="black" />
                        &nbsp; &nbsp;
                        {buyer.user.address}
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                         <Foundation name="shopping-bag" size={20} color="black" />
                        &nbsp; &nbsp;
                        {buyer.item}
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                         <MaterialCommunityIcons name="weight-kilogram" size={20} color="black" />
                        &nbsp; &nbsp;
                        {buyer.TotalWeight}
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        display:"flex",
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={20} color="black" />
                        &nbsp; &nbsp;
                        {buyer.status}
                    </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>&times;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flex : 1,
        marginBottom: 8,
        height: "8%",
       // backgroundColor: "#E8E8E8",
        paddingVertical: 10,
        paddingHorizontal: 5,
        //borderStyle: 'solid',
        borderBottomWidth: StyleSheet.hairlineWidth,
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

    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: '#13b955'
        
    },

    location_container: {
        flexDirection: 'row',
        paddingVertical: 5
    },

    destination: {
        flexDirection: 'row',
       // backgroundColor: "#13b955",
        marginVertical: 5,
        borderRadius: 30,
        paddingHorizontal: 6,
        width: 220
    },

    space: {
        width: 70,
    
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
        backgroundColor: '#593196',
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

export default BuyerCard