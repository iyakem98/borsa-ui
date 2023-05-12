import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { ChatState } from '../../../context/ChatProvider'



function SearchBar() {
  // console.log(chats)
  // var chatArr = chats
  // console.log('chattt', chatArr)
    const handleFocus = () => {
        console.log('focused')
    }
    const {
      searchFirstName, setsearchFirstName
  } = ChatState();
    
  return (
//     <View style = {styles.container}>
//     <View style = {styles.input}>
    
  
//    <TextInput
//             style = {{ //paddingHorizontal: 10,
//                 // paddingVertical: 7,
//                  width: "100%",
//                  fontSize: 17,
//                  color: '#593196'
//     }} 
//             placeholder='search for users'
//             placeholderTextColor="gray" 
//             autoCapitalize="none"
//             autoFocus={false}
            
//             />   
// <Text></Text>  
     
            
//         </View>
            
// </View>
<>
<View>
<TextInput
         
            placeholder='Search for users'
            placeholderTextColor="gray" 
            autoCapitalize="none"
            // autoFocus={true}
            onFocus={handleFocus}
            onChangeText={(e) => setsearchFirstName(e)}
            />   
</View>
</>

  )
}

const styles = StyleSheet.create ({
    box : {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        // height: 70,
        backgroundColor: '#fff'
    }, 
    container: {
       paddingVertical: 16,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },

    input: {
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: '80%',
        borderRadius: 20,
        // paddingLeft: 10,
        alignItems: 'center',
        marginLeft: 40,
        marginBottom: 20,
        
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
      },

    cheader: {
        fontWeight: 'bold',
        fontSize: 40,

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
      },
      content: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray'
      },
      row: {
        flexDirection: 'row'
      },
      name: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16
      },
      subTitle: {
        color: "gray",
        marginTop: 2,
        marginLeft: 2,
        fontSize: 15
      },
      Tex: {
        marginTop: 200
      }
})

export default SearchBar