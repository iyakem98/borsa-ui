
import React from 'react';
import { Text } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AuthScreen extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '1078318868264-95l71fhnqnt70dh6q38t31hn2ukurdll.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return <TouchableOpacity style={{
    backgroundColor:"white",
    marginTop:"30vw",
    width: '60vw',
    marginLeft:"20vw",
    height: '47px',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    letterSpacing:2,
    cursor:"pointer",
  }} onPress={this.onPress}>Toggle Auth</TouchableOpacity>;
  }
}