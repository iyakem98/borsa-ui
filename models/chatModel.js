import mongoose from 'mongoose'

const chatSchema = mongoose.Schema ({
    chatName: {
        type: String,
        trim: true,
        default: "sender"
    },

    /*text: {
        type: String,
        required: [true, 'Please add a text value'],
      }, */

    /*userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, */
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }
}, 
{
    timestamps: true,

}
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat