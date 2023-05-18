import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment';
import { isSameUser } from '../../ChatConfig/ChatLogics';
import { Ionicons } from '@expo/vector-icons';

const MessageTemplate = ({
    m,
    i,
    user,
    messages,
    todayDateLabel,
    yesterdayDateLabel,
    olderDateLabel
}) => {
    let date;
    let today = moment()
    let d = today.diff(m?.createdAt, 'days')
    const formatted_date =  moment(m?.createdAt).format("LT");
    
    return (
        <View style={{}}>
            <Text style={{
                textAlign: "center"
            }}>{d === 0 && !todayDateLabel ? "Today" : d === 1 && !yesterdayDateLabel ? "Yesterday" : !olderDateLabel ? m?.createdAt.slice(0, 10) : null}</Text>
            <View style = {[styles.container, {
                backgroundColor: m.sender._id === user._id ? "#593196" : "#E8E8E8",
                alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                marginTop: isSameUser(messages, m , i , user._id) ? 5 : 10, 
                borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
            }]}>
                <Text key={m._id} style={{color: m?.sender?._id === user?._id ? "white" : "black"}}>
                {m.content}
                </Text>
                <View style={{flexDirection:"row", marginTop: 2, alignItems: "center"}}>
                    <Text style={{
                        color: m?.sender?._id === user?._id ? "#fff" : "#404040",
                        fontSize: 12,
                    }}>{formatted_date}</Text>
                    {m?.sender?._id === user?._id  && m.receiver != null && m?.marked ? (
                        <Ionicons name="checkmark-done" size={20} color="white" style={{marginLeft:10}} />
                    ) : m?.sender?._id === user?._id  && m?.receiver != null && !m?.marked ? (
                        <Ionicons name="checkmark-outline" size={17} color="white" />
                    ) : null}
                </View>
            </View>
        </View>
    )
}

export default MessageTemplate

const styles = StyleSheet.create({
    container: {
      //backgroundColor: "#E8E8E8",
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 8,
      maxWidth: '80%',
  
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