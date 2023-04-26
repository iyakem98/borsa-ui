// import { StatusBar } from 'expo-status-bar';
import {AppState, StatusBar, StyleSheet, Text, View } from 'react-native';
import ChatListItem from './src/components/Chats/ChatListItem';
import ChatScreen from './src/screens/ChatScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import Navigator from './src/navigation/Navigator';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';  
import ChatProvider from './src/context/ChatProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import AppContainer from './AppContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_800ExtraBold
} from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestTrackingPermissionsAsync,
  getTrackingPermissionsAsync,
} from 'expo-tracking-transparency';

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  const [showOnBoarding, setShowOnBoarding] = useState(true)

  const checkOnBoardingData = async () => {
    try {
      // const res = await AsyncStorage.removeItem('doNotShowOnBoarding')
      const res = await AsyncStorage.getItem('@doNotShowOnBoarding')
      setShowOnBoarding(res ? false : true)
    } catch (e) {
    // saving error
    }
  }

  const checktracking = async()=>{
    try {
      const granted = await getTrackingPermissionsAsync()
      if (granted) {
        // Your app is authorized to track the user or their device
        console.log("GRANTED")
      } else {
        console.log("NOT GRANTED")
        await requestTrackingPermissionsAsync();
      }
    } catch(e) {
      console.log("ERROR ON TRACKING")
    }
  }

  useEffect(()=>{
    checkOnBoardingData();
    checktracking();
  }, [])
  
  if(fontsLoaded) {
    return (
      <Provider store={store}>
        <PaperProvider>
        {/* <ChatProvider>
        <PersistGate loading={nul
          l} persistor={persistor}>
          <View style={styles.container}>
            <Navigator/>
            <StatusBar style="auto" />
          </View>
          </PersistGate>
          </ChatProvider> */}
          <StatusBar
            animated={true}
            backgroundColor="#aaa"
            barStyle={'default'}
            showHideTransition={'fade'}
            hidden={false}
          />
          <SafeAreaProvider style={{
            backgroundColor: "#000",
            flex: 1
          }}>
            <ChatProvider>
              <PersistGate loading={null} persistor={persistor}>
                <AppContainer showOnBoarding={showOnBoarding} />
              </PersistGate>
            </ChatProvider>
          </SafeAreaProvider>
        </PaperProvider>
        <FlashMessage position="top" />
      </Provider>
    );
  } else {
    <Text>{error}</Text>
  }
}

const styles = StyleSheet.create({
  // "proxy": "http://192.168.100.2:5002/",
  container: {
    flex: 1,
    backgroundColor: '#f9f8fc',
    justifyContent: 'center',
    
  },
});
