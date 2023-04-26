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
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchChat } from '../../features/chat/chatSlice';


const BuyerCard = ({buyer}) => {
    // console.log(buyer.user)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)
    const { selectedChat, setSelectedChat, chats, setChats, chatSelected, setchatSelected,  chattId, setchattId, loading,  setloading } = ChatState(); 
    const navigation = useNavigation();
    const [showModal, setshowModal] = useState(false)
    const [modal, setModal] = useState(false)

    const viewDetail = (user) => {
        alert("detail")
    }

    const [def, setDef] = useState("https://www.hollywoodreporter.com/wp-content/uploads/2023/01/GettyImages-1319690076-H-2023.jpg?w=1296")
  const [image, setImage] = useState(def);
  useEffect(() =>{

    dispatch(fetchChat())
    // console.log(chattts[1])
    
  
}, [user])

    const BuyerChat = async(buyerData)=> {
        // console.log(buyerData)
        // console.log(buyerID)
        const userId = buyerData._id
        console.log(buyerData)
        // const checkbuyer = await AsyncStorage.getItem('initialChat') 
        // const checkbuyerarr = []
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
            if(chattts.length > 0){
                chattts.map(async(chat) => {
                    if(chat.users[0]._id == userId || chat.users[1]._id == userId){
                        navigation.navigate('Messaging', {userSelected:
                    
                            buyerData})
                        setloading(true)
                        setchatSelected(true)
                        setchattId(chat._id)
                    }
                    else if (chat == null){
                        setloading(false)
                        navigation.navigate('Messaging', {userSelected:
                    
                            buyerData})
                        const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                        setchatSelected(true)
                        setchattId(data._id)
        
        
                    }
        
                  })
    
            }
            else{
                setloading(false)
                navigation.navigate('Messaging', {userSelected:
            
                    buyerData})
                const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
                setchatSelected(true)
                setchattId(data._id)
            }
            // -----------------
            // chattts.map(async(chat) => {
            //     if(chat.users[0]._id == userId || chat.users[1]._id == userId){
            //         navigation.navigate('Messaging', {userSelected:
            
            //             buyerData})
            //         setloading(true)
            //         setchatSelected(true)
            //         setchattId(chat._id)
            //     }
            //     else if (chat == null){
            //         setloading(false)
            //         navigation.navigate('Messaging', {userSelected:
                
            //             buyerData})
            //         const {data} = await axios.post(`${API_BASE_URL}chat`, {userId}, config)
            //         setchatSelected(true)
            //         setchattId(data._id)
    
    
            //     }
                
    
            //   })
            // ------------------------------------------ 
            // setloading(true)
            // navigation.navigate('Messaging', {userSelected:
            
            //     buyerData})
            //     const {data} = await axios.post(`${API_BASE_URL}chat/`, {userId}, config)
               
            //     setchatSelected(true)
            //     setchattId(data._id)
            // -----------------------------
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

            {/* <Entypo name="magnifying-glass" size={20} color='#593196' style = {{marginHorizontal: 5, marginTop: 5}} /> */}

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

            }} onPress= {() => BuyerChat(buyer.user)}>
                <Text style = {{
                    fontSize: 18,
                    color: 'white'
                }}>
                    Start chatting
                </Text>
            </Pressable>
            <View>
            {/* <Pressable style = {{
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
            </Pressable> */}
        </View>
        </View>

       
        
    </View>

    {showModal && <Modal
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
                        // flex: 1,
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
                        // flex: 1,
                        flexDirection:"row"
                    }}>
                         <Foundation name="shopping-bag" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; {buyer.item}</Text> */}
                         <Text>{buyer.item}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}>
                         <MaterialCommunityIcons name="weight-kilogram" size={20} color="black" />
                         {/* <Text> &nbsp; &nbsp; {buyer.TotalWeight}</Text> */}
                         <Text>{buyer.TotalWeight}</Text>
                    </View>

                    <View style={{
                        marginTop:10,
                        fontSize:18,
                        // display:"flex",
                        // flex: 1,
                        flexDirection:"row"
                    }}>
                        <MaterialIcons name="pending-actions" size={20} color="black" />
                        {/* <Text> &nbsp; &nbsp; {buyer.status}</Text> */}
                        <Text>{buyer.status}</Text>
                    </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>&times;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>}
      </Pressable>
    
    </>
    // <View>
    //     {/* <Text>{buyer}</Text> */}
    // </View>
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