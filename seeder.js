import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import User from './models/userModel.js'
import Chat from './models/chatModel.js'
import Message from './models/messageModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async() => {
    try {
        await User.deleteMany()
        await Chat.deleteMany()
        await Message.deleteMany()
   
        const createdUsers = await User.insertMany(users)
        
        const adminUser = createdUsers[0]._id

        
        console.log(`Data Imported!`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany()
        await Chat.deleteMany()
        await Message.deleteMany()
   
        
        
        console.log(`Data Destroyed!`.yellow.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}


