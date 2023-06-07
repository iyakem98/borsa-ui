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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  
  const notificationListener = useRef();
  const responseListener = useRef();

  const [showOnBoarding, setShowOnBoarding] = useState(true);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus", existingStatus);
        }

        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            console.log("finalStatus", finalStatus);
            return;
        }

        // Project ID can be found in app.json | app.config.js; extra > eas > projectId
        // token = (await Notifications.getExpoPushTokenAsync({ projectId: "YOUR_PROJECT_ID" })).data;
        token = (await Notifications.getExpoPushTokenAsync()).data;

        // The token should be sent to the server so that it can be used to send push notifications to the device
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FE9018",
        });
    }

    console.log("first", token)

    return token;
  }

  // async function schedulePushNotification() {
  //   await allowsNotificationsAsync()
  // }
  

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

  // const allowsNotificationsAsync = async() => {
  //   const settings = await Notifications.getPermissionsAsync();
  //   return (
  //     settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  //   );
  // }

  // const getPushToken = async() => {
  //   const res = await registerForPushNotificationsAsync();
  //   return res
  // }

  useEffect(() => {
    // console.log("first", getPushToken())
    // const subscription = Notifications.addPushTokenListener(registerDevicePushTokenAsync);
    // return () => subscription.remove();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("-----", notification)
        setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("======", response)
        const {
            notification: {
                request: {
                    content: {
                      data: { screen },
                    },
                },
            },
        } = response;

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        if (screen) {
            // props.navigation.navigate(screen);
        }
    });

    return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=>{
    checkOnBoardingData();
    checktracking();
    // schedulePushNotification();
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