// import { StatusBar } from 'expo-status-bar';
import {AppState, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import ChatListItem from './src/components/Chats/ChatListItem';
import ChatScreen from './src/screens/ChatScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import Navigator from './src/navigation/Navigator';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';  
import ChatProvider from './src/context/ChatProvider';
import { useEffect, useRef, useState } from 'react';
import AppContainer from './AppContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import {SheetProvider} from 'react-native-actions-sheet';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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

  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  

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
    if(Platform.OS == 'ios') {
      try {
        const granted = await getTrackingPermissionsAsync()
        if (granted) {
          // Your app is authorized to track the user or their device
          console.log("GRANTED")
          await requestTrackingPermissionsAsync();
        } else {
          console.log("NOT GRANTED")
          await requestTrackingPermissionsAsync();
        }
      } catch(e) {
        console.log("ERROR ON TRACKING")
      }
    }
  }

  useEffect(()=>{
    if(expoPushToken) {
      sendPushNotification(expoPushToken)
    }
  }, [expoPushToken])

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
            barStyle={'dark-content'}
            showHideTransition={'fade'}
            hidden={false}
          />
          <SafeAreaProvider style={{
            backgroundColor: "#000",
            flex: 1
          }}>
            <ChatProvider>
              <PersistGate loading={null} persistor={persistor}>
                <SheetProvider>
                  <AppContainer showOnBoarding={showOnBoarding} />
                </SheetProvider>
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