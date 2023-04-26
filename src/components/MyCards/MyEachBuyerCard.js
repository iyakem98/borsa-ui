import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MyEachBuyerCard = ({buyer}) => {
  return (
    <View style = {styles.container}>
        <Text>
            {buyer.totalWeight}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
    }
})

export default MyEachBuyerCard