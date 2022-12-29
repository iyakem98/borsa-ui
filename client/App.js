// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatListItem from './src/components/Chats/ChatListItem';
import ChatScreen from './src/screens/ChatScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import Navigator from './src/navigation/Navigator';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';  
import ChatProvider from './src/context/ChatProvider';
import { useEffect } from 'react';

export default function App() {
 
  return (
    
    <Provider store={store}>
      <ChatProvider>
   <PersistGate loading={null} persistor={persistor}>
    <View style={styles.container}>
      <Navigator/>
      {/* <StatusBar style="auto" /> */}
    </View>
     </PersistGate>
     </ChatProvider>
     </Provider>
    
  );
}

const styles = StyleSheet.create({
  // "proxy": "http://192.168.100.2:5002/",
  container: {
    flex: 1,
    backgroundColor: '#f9f8fc',
    justifyContent: 'center',
    
  },
});
