import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatListItem from './src/components/Chats/ChatListItem';
import ChatScreen from './src/screens/ChatScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Navigator/>
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8fc',
    justifyContent: 'center',
    
  },
});
