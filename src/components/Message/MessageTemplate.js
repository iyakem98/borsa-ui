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
            <View style = {{
                 alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
            }}>
            <View style = {[styles.container, {
                backgroundColor: m?.sender?._id === user?._id ? "#593196" : "#E8E8E8",
                marginTop: 10, 
                //borderBottomRightRadius: m?.sender?._id === user?._id ? 0 : 8,
                //borderBottomLeftRadius: m?.sender?._id === user?._id ? 8 : 0,
            }]}>
                <Text key={m._id} style={{color: m?.sender?._id === user?._id ? "white" : "black"}}>
                {m.content}
                </Text>
              {/*  <View style={{flexDirection:"row", marginTop: 2, alignItems: "center"}}>
                    <Text style={{
                        color: m?.sender?._id === user?._id ? "#fff" : "#404040",
                        fontSize: 12,
                        marginRight: m?.sender?._id === user?._id && m?.receiver ? 10 : 10,
                        marginTop: m?.sender?._id === user?._id && m?.receiver ? 0 : 3,
                    }}>{formatted_date}</Text>
                    {m?.sender?._id === user?._id && m.receiver != null && m?.marked ? (
                        <Ionicons name="checkmark-done" size={20} color="white" />
                    ) : m?.sender?._id === user?._id && m?.receiver != null && !m?.marked ? (
                        <Ionicons name="checkmark-outline" size={20} color="white" />
                    ) : m?.sender?._id === user?._id && !m?.marked ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : null} 

                    
               
                    
                    </View> */}
            </View>
                    <View style = {{
                        alignItems: 'flex-end',
                        paddingRight: 10,
                    }}>
                        {m?.sender?._id === user?._id && m.receiver != null && m?.marked ? (
                            <Ionicons name="checkmark-outline" size={14} color="black" />
                        ) : m?.sender?._id === user?._id && m?.receiver != null && !m?.marked ? (
                            <Ionicons name="checkmark-outline" size={14} color="black" />
                        ) : m?.sender?._id === user?._id && !m?.marked ? (
                            <Ionicons name="checkmark-outline" size={14} color="#fff" />
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
      marginHorizontal: 10,
      padding: 10,
      //borderRadius: 8,
      borderRadius: 16,
      minWidth: "10%",
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