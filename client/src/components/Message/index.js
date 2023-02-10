import {View, Text, StyleSheet} from 'react-native'
import dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Message = ({message}) => {

  const isMyMessage = () => {
    return message.user.id === 'u1'
  }
  return (
    <View style = {[styles.container, {
        backgroundColor: isMyMessage()? "#593196" : "#E8E8E8",
        alignSelf: isMyMessage()? "flex-end": "flex-start",
    }]}>
        <Text style = {{
            color: isMyMessage()? "white":"black"
        }}>
            {message.text}
        </Text>
        <Text style = {[styles.time, {
            color: isMyMessage()? "#cfcbcb" : "gray"
        }]}>
            {dayjs(message.createdAt).fromNow(true)}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "#E8E8E8",
        margin: 5,
        padding: 10,
        borderRadius: 10,
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
    time: {
        alignSelf: "flex-end"
    }
})

// export default Message