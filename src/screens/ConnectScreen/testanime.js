import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native';
function Testanime() {
  

  return (
    <View style={styles.animationContainer}>
      <LottieView
        
        // ref={animation}
        // resizeMode="cover"
        style={{
          // width: 200,
          height: 250,
          // backgroundColor: '',
        }}
        // style={{flex: 1}}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/Animation - 1689355162679.json')}
        autoPlay
        loop
      />
      <LottieView
        
        // ref={animation}
        // resizeMode="cover"
        style={{
          width: 500,
          height: 200,
          // backgroundColor: '',
        }}
        // style={{flex: 1}}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/animation_lks476w7.json')}
        autoPlay
        loop
      />
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View> */}
    </View>
   
  )
  
}
const styles = StyleSheet.create({
    animationContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonContainer: {
      paddingTop: 20,
    },
  });
export default Testanime