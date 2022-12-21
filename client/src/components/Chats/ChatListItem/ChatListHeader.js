import {View, Text, StyleSheet} from 'react-native'

const ChatListHeader = () => {
  return (
    <View style = {styles.container}>
        <Text style = {styles.cheader}>
            Chats
        </Text>
    </View>
  )
}
const styles = StyleSheet.create ({
    container: {
        paddingTop: 50,
        paddingBottom: 30
    },

    cheader: {
        fontWeight: 'bold',
        fontSize: 40,

    }
})
export default ChatListHeader