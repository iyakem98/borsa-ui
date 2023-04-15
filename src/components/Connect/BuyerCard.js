import {View, Modal, Image, Text, StyleSheet, ImageBackground, Pressable} from 'react-native'
import { Entypo, MaterialIcons, Octicons, Ionicons, Foundation, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ChatState } from '../../context/ChatProvider';
import { useNavigation } from '@react-navigation/native';
import { getSenderFull } from '../../ChatConfig/ChatLogics';
import { getUserDetails } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const BuyerCard = ({buyer}) => {
    // console.log(buyer.user)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId, loading,  setloading } = ChatState(); 
    const navigation = useNavigation();
    const [showModal, setshowModal] = useState(false)
    const [modal, setModal] = useState(false)

    const viewDetail = (user) => {
        alert("detail")
    }

    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);

    const BuyerChat = async(buyerData)=> {
        // console.log(buyerData)
        // console.log(buyerID)
        const userId = buyerData._id
        const checkbuyer = await AsyncStorage.getItem('initialChat') 
        const checkbuyerarr = []
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
        
                }
            }
            // --------
            // if((checkbuyer != null || checkbuyer != undefined) ){
            //     checkbuyerarr.push()
            //     for(var i = 0; i <checkbuyerarr.length ; i++){
            //         if(checkbuyerarr[i] ==  buyerData._id){
            //             setloading(true)
            //             navigation.navigate('Messaging', {userSelected:
                    
            //                     buyerData})
            //              const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
            //             setchatSelected(true)
            //              setchattId(data._id)
            //              await AsyncStorage.setItem('initialChat') 
            //         }
            //     }
            //     // if(checkbuyer == buyerData._id){
            //     //     console.log('true')
            //     // }
            //     // setloading(true)
            //     // // navigation.navigate('Messaging', {userSelected:
            
            //     // //         buyerData})
            //     //  const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
            //     // setchatSelected(true)
            //     //  setchattId(data._id)
            //     // else{
            //     //     console.log('false')
            //     // }
            // }
            // else{
            //     await AsyncStorage.removeItem('initialChat') 
            //     setloading(false)

            //     navigation.navigate('Messaging', {userSelected:
            
            //         buyerData})
            //  const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
            // setchatSelected(true)
            //  setchattId(data._id)
            //  const BuyerID = data.users[1]._id
            //  await AsyncStorage.setItem('initialChat', BuyerID)
            // }
            // ----------
            // setloading(true)
            // setloading(true)
            
            setloading(true)
            navigation.navigate('Messaging', {userSelected:
            
                buyerData})
                const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
               
                setchatSelected(true)
                setchattId(data._id)
            // if(data.latestMessage != null){
                
            // }
            // const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
            
            //     setchatSelected(true)
            // setchattId(data._id)
            // const BuyerID = data.users[1]._id
            // console.log(data.users[1]._id)
            // console.log(buyerData._id)
            // await AsyncStorage.setItem('initialChat', BuyerID)
            // const checkbuyer = await AsyncStorage.getItem('initialChat') 
            // console.log(checkbuyer)          
            // console.log(data.latestMessage)
            // if(data.latestMessage != null || data.latestMessage != undefined){
            //     setloading(true)
            //     setchatSelected(true)
            // setchattId(data._id)
            // }
            
        
            // navigation.navigate('Messaging', {chatId: data._id, userSelected:
            
            //     user != null ? getSenderFull(user, data.users) : null })
                
            
            // return data
        }
        catch(err){
            console.log(err)
        // }
    }
    }
    const goToUserProfile = async () => {
        
        
        //navigation.navigate("User Details")

    };
  return (
    <>
    <Pressable onPress={() =>{
         setshowModal(true)
          setModal(true)
    }}>

    
<View style = {styles.container}>
        <View style = {{
            //backgroundColor: "white",
            //paddingVertical: 8,
            height: 83,
            flexDirection: 'row'
        }}>
            <View style = {{
                width: "30%"
            }}>
                <Image 
                    source = {require ('../../..//assets/images/macbook.jpeg')} 
                    style = {styles.productImage}
                    />
            </View>

            <View>

            <View style = {{
                flexDirection: 'row',
                height: 30,
               // width: '72%',
                
            }}>
               
            <View style = {{
                paddingTop: 8,
                paddingRight: 5
            }}>
                <Text style = {{
                    fontSize: 20
                   }}>
                       Macbook Air
                    </Text>

            </View>
            <View style = {{
                paddingTop: 8,
            }}>
                <Text style = {{
                    fontSize: 14,
                    fontWeight: 'bold'
                   }}>
                      1kg
                    </Text>

            </View>
            </View>
            
            <View style = {{
                flexDirection: 'row',
                marginTop: 1
            }}>
            <Text style = {{
                color: 'gray'
            }}>
                {'By '}
            </Text>
            <Text style = {{
                color:'gray'
            }}>
               April 12th, 2023
            </Text>

            </View>

            <View style = {{
                flexDirection: 'row',
                width: "74%",
                //justifyContent: 'space-around',
                marginTop: 10
            }}>
                 <Text style = {{
                    fontSize: 16,
                    fontWeight: 'bold'
                   }}>
                        {buyer.user.address ? buyer.user.address : "New York"}
                    </Text>
           {/* <FontAwesome5 name="shipping-fast" size={25} color="#593196" /> */}
            <AntDesign name="arrowright" size={22} color="#593196" style ={{marginHorizontal: 5}} />

            <Text style = {{
                    fontSize: 16,
                    fontWeight: 'bold'
                   }}>
                        {buyer.destination ? buyer.destination : "Addis Ababa"}
                    </Text>


            </View>

           


            </View>
            
            
            
            
            <View></View>
            <View style = {{
                //flexDirection: 'row',
                justifyContent: 'left',
                paddingHorizontal: 10,
                marginTop: 8
            }}>

    

              
              
                
            </View>
        </View>
        <View style = {styles.container_bottom}>
        <View style = {{
            width: '16%'
        }}>
            <Image 
                source={{uri: buyer.user.profilePic}}
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
                    {buyer.user.firstName + " " + buyer.user.lastName}
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
                backgroundColor: '#593196',
               // backgroundColor: '#e8e8e8',
                width: "90%",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 4,
                paddingVertical: 5,
                borderRadius: 30,
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

            }} onPress={() => BuyerChat(buyer.user)}>
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
                        <Text>{buyer.user.firstName+' '+buyer.user.lastName}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <Ionicons name="location" size={20} color="black" />
                       {/* <Text> &nbsp; &nbsp; {buyer.user.address}</Text> */}
                       <Text>{buyer.user.address}</Text>
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
                         <Text>{buyer.luggageSpace}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={20} color="black" />
                        {/* <Text> &nbsp; &nbsp; {traveler.status}</Text> */}
                        <Text>{buyer.status}</Text>
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
        backgroundColor: 'white',
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
        //backgroundColor: '#f5f5f5',
        flex : 1,
        marginBottom: 8,
        height: 57,
       // backgroundColor: "#E8E8E8",
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 5,
        borderStyle: 'solid',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor:'gray',
        zIndex: -100,
       
        
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

    productImage: {
        width: 100,
        height: 90,
        resizeMode: 'cover',
        marginBottom: 20,
        background: 'white',
        marginRight: 18,
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
      itemViews: {
        marginHorizontal: 3,
        backgroundColor: "#a991d4",
        backgroundColor: '#593196',
        padding: 2,
        borderRadius: 5,
        marginBottom: 3
      }

    
})
export default BuyerCard