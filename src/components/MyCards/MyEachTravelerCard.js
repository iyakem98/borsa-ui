import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MyEachTravelerCard = () => {
  return (
    <View style = {styles.container}>
        <Text>
            This is each Traveler Card.
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
    }
})

export default MyEachTravelerCard