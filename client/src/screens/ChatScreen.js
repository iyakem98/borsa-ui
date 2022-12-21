import {View, Text,FlatList} from 'react-native'
import ChatListItem from '../components/Chats/ChatListItem'
import ChatListHeader from '../components/Chats/ChatListItem/ChatListHeader'
import chats from '../../assets/data/chats.json'


const ChatScreen = () => {
    return(
        <View style = {{backgroundColor: "white",}}>
            <FlatList
                data = {chats}
                renderItem = {({item}) => <ChatListItem chat = {item} 
            />}
            />

        </View>
        
    )
}

export default ChatScreen