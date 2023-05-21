import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment';
import { isSameUser } from '../../ChatConfig/ChatLogics';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const MessageTemplate = ({
    m,
    i,
    user,
    todayDateLabel,
    yesterdayDateLabel,
    olderDateLabel,
    todayDate,
    yesterdayDate,
    olderDate,
    prevDate,
    d,
    dataDiff,
    showDate
}) => {
    const formatted_date =  moment(m?.createdAt).format("LT");
    
    return (
        <View style={{}}>
            <View style = {[styles.container, {
                backgroundColor: m?.sender?._id === user?._id ? "#7267e7" : "#edecfa",
                alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                marginTop: 10, 
                //borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                //borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
            }]}>
                <Text key={m._id} style={{
                    color: m?.sender?._id === user?._id ? "white" : "black",
                    marginBottom: 10,
                    fontSize: 16,
                    }}>
                {m.content}
                </Text>
                <View style={{flexDirection:"row", 
                
                     alignItems: "center", 
                     paddingTop: 5, 
                     position: 'absolute', 
                     right: 3,
                     bottom: 3,
                   }}>
                    <Text style={{
                        color: m?.sender?._id === user?._id ? "lightgray" : "#404040",
                        fontSize: 11,
                        marginRight: m?.sender?._id === user?._id && m?.receiver ? 1 : 1,
                        marginTop: m?.sender?._id === user?._id && m?.receiver ? 1 : 0,
                    }}>{formatted_date}</Text>
                    {m?.sender?._id === user?._id && m.receiver != null && m?.marked ? (
                        <Ionicons name="checkmark-done" size={17} color="lightgray" />
                    ) : m?.sender?._id === user?._id && m?.receiver != null && !m?.marked ? (
                        <Ionicons name="checkmark-outline" size={17} color="lightgray" />
                    ) : m?.sender?._id === user?._id && !m?.marked ? (
                        <ActivityIndicator size={17} color="lightgray" />
                    ) : null}
                </View>
            </View>
            {/* {d !== dataDiff && i !== 0 ? (
                <Text style={{
                    textAlign: "center",
                    marginTop: 22,
                }}>{d === 0 && !todayDateLabel ? "Today" : d === 1 && !yesterdayDateLabel ? "Yesterday" : !olderDateLabel ? m?.createdAt.slice(0, 10) : null}</Text>
            ) : null} */}
        </View>
    )
}

export default MessageTemplate

const styles = StyleSheet.create({
    container: {
      //backgroundColor: "#E8E8E8",
      backgroundColor: '#fff',
      position: 'relative',
      marginHorizontal: 10,
      paddingTop: 7,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 15,
      minWidth: '23%',
      maxWidth: '80%',
      minHeight: "2%",
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      
      shadowOpacity: 0.10,
      shadowRadius: 1.0,
  
      elevation: 1,
    },
})