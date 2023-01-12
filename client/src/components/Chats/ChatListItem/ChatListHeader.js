import {View, Text, TextInput, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const ChatListHeader = () => {
  return (
    <View style = {styles.container}>
        <View style = {styles.input}>
        <Ionicons name="search" size={24} color="gray" />
            <TextInput
                style = {{ paddingHorizontal: 10,
                    paddingVertical: 7,
                     width: "100%",
                     fontSize: 17,
                     //color: '#593196'
        }} 
                placeholder='search'
                placeholderTextColor="gray" 
                />
            </View>
        <Ionicons name="filter-sharp" size={24} color="#593196" />
    </View>
  )
}
const styles = StyleSheet.create ({
    container: {
       paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },

    input: {
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: '70%',
        borderRadius: 20,
        paddingLeft: 10,
        alignItems: 'center'

    },

    cheader: {
        fontWeight: 'bold',
        fontSize: 40,

    }
})
 export default ChatListHeader