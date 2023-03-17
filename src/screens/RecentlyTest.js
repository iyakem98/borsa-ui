
import { Pressable, Text, View } from 'react-native'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
function RecentlyTest() {
    const [date, setDate] = useState(null)
    const [lastseendateandtime, setlastseendateandtime] = useState(null)
    const [status, setStatus] = useState("online")
    const [getUser, setUser] = useState(null)
    const datte  = moment()
    console.log(datte.format())
    const { user } = useSelector((state) => state.auth)
    // setDate(datte.format("YYYY-MM-DD"))
    useEffect(() => {
      // setDate(datte.format("LT") + " " +  datte.format("YYYY-MM-DD"))
      // console.log(user.lastSeen)
      // getUserData()
    }, [])
    useEffect(() => {
      // setDate(datte.format("LT") + " " +  datte.format("YYYY-MM-DD"))
      // console.log(user.lastSeen)
      // getUserData()
    }, [lastseendateandtime])
    useEffect(() => {
       async function getUserData ()  {
    
        try{
          const userId = user._id
          console.log(userId)
          const   config = {
              
            headers: {
             
              Authorization: `Bearer ${user.token}`
            },
            // body: JSON.stringify({
            //   imgsource: newPhoto.base64,
            // }),
            // body: formData
           };
      
          const {data} = await axios.get(`http://192.168.100.2:5000/api/users/ret/${user._id}`, config)

          console.log(data.lastSeen)
          // setlastseendateandtime(moment(data.lastSeen).format("dddd, MMMM Do YYYY") + " " + moment(data.lastSeen).format("LT"))
    
        }
        catch(err){
          console.log(err)
        }
        
       }
       getUserData()
    }, [])
   
  //  const getUserData = async () => {
    
  //   try{
  //     const userId = user._id
  //     console.log(userId)
  //     const   config = {
          
  //       headers: {
         
  //         Authorization: `Bearer ${user.token}`
  //       },
  //       // body: JSON.stringify({
  //       //   imgsource: newPhoto.base64,
  //       // }),
  //       // body: formData
  //      };
  
  //     const {data} = await axios.get(`http://192.168.100.2:5000/api/users/ret/${user._id}`, config)
  //     // console.log(data.lastSeen)
  //     setlastseendateandtime(moment(data.lastSeen).format("dddd, MMMM Do YYYY") + " " + moment(data.lastSeen).format("LT"))

  //   }
  //   catch(err){
  //     console.log(err)
  //   }
    
  //  }
  
    const UpdateLastSeenAndStatus = async(status) =>{
      try{

      
      const   config = {
          
        headers: {
         
          Authorization: `Bearer ${user.token}`
        },
        // body: JSON.stringify({
        //   imgsource: newPhoto.base64,
        // }),
        // body: formData
       };
       const now = moment()
       const UpdatedLastSeen = now.format()
       const {data} = await axios.put('http://192.168.100.2:5000/api/users/stat', {
        userId : user._id,
        status: status,
        lastSeen : UpdatedLastSeen
        
        
      },
      config)
      console.log('user status and last seen are updated')
    }
    catch(error){
      console.log(error)
    }
       

    }
    



  return (
    <View>
      {/* <Pressable onPress={() => {
        // UpdateLastSeenAndStatus(status)
        getUserData()
        }}>
        <Text>click here to update user's status and last seen </Text>
       
       
      </Pressable> */}
      <Text>the time before user moves out of the app  is at {lastseendateandtime} </Text>
        {/* <Text>today's date is {date} </Text>
        <Text>user is away and last seen at user's last seen at = </Text>
        <Text>user is back online</Text> */}
    </View>
  )
}

export default RecentlyTest