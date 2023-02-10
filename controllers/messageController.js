import ayncHandler from "express-async-handler";
import Message from "../models/messageModel.js"
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

const sendMessage = ayncHandler(async (req, res) => {
  
    // const requests = [req.file.filename, req.body.image]
    // const { content, chatId} = req.body
    // console.log(req)
    const content = req.body.content
    const chatId = req.body.chatId
    // var image =  req.file.filename || req.body.image
    var image = req.file.filename
    // console.log(globalFile)
    // else{
    //     image = req.file.filename
    // }
    // console.log(req.body.image)
    // var image = req.file.filename 
    // if(image = req.file.filename){
    //     console.log(true)
    //     // image = req.file.filename
    // }
    // else{
    //     console.log(false)
    //     // image = req.body.image
    // }

   

  

    if ( !chatId) {
        console.log("Invalid data passed into request")
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        image: image,
    }

    console.log('aaaa')

    try {
        var message = await Message.create(newMessage) 
        message = await message.populate("sender", "firstName lastName userName profilePic isTraveler city country")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path:"chat.users",
            select: "firstName lastName userName profilePic"
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.json(message);
    } catch (error) {
        res.json(400)
        throw new Error (error.message)
    }


})
const sendMessage2 = ayncHandler(async (req, res) => {
    // const requests = [req.file.filename, req.body.image]
    // const { content, chatId} = req.body
    // console.log(req)
    const content = req.body.content
    const chatId = req.body.chatId
    // var image =  req.file.filename || req.body.image
    
    var image = req.body.image
   
    // else{
    //     image = req.file.filename
    // }
    // console.log(req.body.image)
    // var image = req.file.filename 
    // if(image = req.file.filename){
    //     console.log(true)
    //     // image = req.file.filename
    // }
    // else{
    //     console.log(false)
    //     // image = req.body.image
    // }

   

  

    if ( !chatId) {
        console.log("Invalid data passed into request")
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        image: image,
    }

    console.log('aaaa')

    try {
        var message = await Message.create(newMessage) 
        message = await message.populate("sender", "firstName lastName userName profilePic isTraveler city country")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path:"chat.users",
            select: "firstName lastName userName profilePic"
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.json(message);
    } catch (error) {
        res.json(400)
        throw new Error (error.message)
    }


})

const allMessages = ayncHandler(async (req, res) => {

    try {
        const messages = await Message.find({chat: req.params.chatId})
            .populate("sender", "firstName lastName userName profilePic isTraveler")
            .populate("chat")

        res.json(messages)

    } catch (error) {
        res.status(400)
        throw new Error (error.message)
    }
    
})

export {sendMessage, allMessages, sendMessage2}