import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import moment from 'moment'


//auth user and get token
//POST/api/user/login
const authUser = asyncHandler(async(req, res) => {
    const {email, password} = await req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            isTraveler: user.isTraveler,
            isAdmin: user.isAdmin,
            profilePic: user.profilePic,
            city: user.city,
            country: user.country,
            token: generateToken(user._id),
            status: user.status,
            lastSeen: user.lastSeen,
            route: user.route

        })

        console.log('Login successful!')
    }
    else {
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})

//Register a new user
//POST/api/users
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const {firstName, lastName, email, password, userName, isTraveler, profilePic, city, country} = await req.body

    const userExists = await User.findOne({email})

    const userNameTaken = await User.findOne({userName})

   
    if (userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }

    if (userNameTaken) {
        res.status(400)
        throw new Error ('Username Taken! put in another one')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        userName,
        isTraveler,
        profilePic,
        city,
        country,
    })

    if (user) {
        res.status(201).json ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            isTraveler: user.isTraveler,
            city: user.city,
            country: user.country,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    }

    else {
        res.status(400)
        throw new Error ('Invalid new data')
    }
})

const getUserProfile = asyncHandler(async(req, res) => {
    const {userId} = await req.body

    console.log(userId + ' is my userid in the backend')


    const user = await User.findById(userId)

    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            isTraveler: user.isTraveler,
            isAdmin: user.isAdmin,
            profilePic: user.profilePic,
            city: user.city,
            country: user.country,
            //token: generateToken(user._id),
        })

        console.log('Login successful!')
    }
    else {
        res.status(401)
        throw new Error ('invalid userId')
    }
})
const getUserData = asyncHandler(async(req, res) => {
   
    
    //const user = await User.findById(req.user._id)

    const userId = req.params.id
    console.log(userId)
  

    //console.log(firstName + ' ' + email)
    //const user = await User.findById(req.params._id)

    const user = await User.findById(userId)


    if(user) {
        // var date = new Date(user.lastSeen)
        // var d = date.getDate()
        
        // var fomatted_date = moment(user.lastSeen).format('YYYY-MM-DD');  
        // var fomatted_date = moment(user.lastSeen).format("LT");  
        // var fomatted_date = moment(user.lastSeen).format("dddd, MMMM Do YYYY"); 
        // var formated_time =   moment(user.lastSeen).format("LT"); 
        // console.log('last seen at ' + fomatted_date + " " +  formated_time)
        // console.log(user.lastSeen)
        // res.json({
        //     _id: user._id,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     email: user.email,
        //     isTraveler: user.isTraveler,
        //     city: user.city,
        //     country: user.country,
        //     isAdmin: user.isAdmin,
        // })
        res.json({
           _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            isTraveler: user.isTraveler,
            isAdmin: user.isAdmin,
            profilePic: user.profilePic,
            city: user.city,
            country: user.country,
            token: generateToken(user._id),
            status: user.status,
            lastSeen: user.lastSeen,
            route: user.route,
            status: user.status,
            lastSeen: user.lastSeen
            
        })
    }
    else {
        res.status(404)
        throw new Error ('User not found')
    }
    console.log('backend for user profile')
   
})
//auth user profile
//GET/api/user/profile

const updateRoute = asyncHandler(async(req, res) => {
    console.log('route handler')
    
    //const user = await User.findById(req.user._id)

    const {userId, route} = await req.body
    const user = await User.findById(userId)
    
    try{
        const user = await User.findByIdAndUpdate(userId, {
            route: route,
            
        
        })
        return res.status(200).json({ 
            // _id: user._id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // userName: user.userName,
            // email: user.email,
            // isTraveler: user.isTraveler,
            // isAdmin: user.isAdmin,
            // profilePic: user.profilePic,
            // city: user.city,
            // country: user.country,
            // token: generateToken(user._id),
            // status: user.status,
            // lastSeen: user.lastSeen,
            // route: user.route,
            // status: user.status,
            // lastSeen: user.lastSeen
            mess: "user's route updated successfully"
         })
    }
    catch(err){
        return res.status(400).json({mess: err})
    }

    


    
    
   
   
})
const updateStatus = asyncHandler(async(req, res) => {
    console.log('backend for user profile')
    
    //const user = await User.findById(req.user._id)

    const {userId, status, lastSeen} = await req.body
    const user = await User.findById(userId)
    const now = moment()

    // var fomatted_date = moment(user.lastSeen).format("dddd, MMMM Do YYYY"); 
    // var formated_time =   moment(user.lastSeen).format("LT"); 
    // const lastSeen = now.format()
    // console.log('last seen at ' + fomatted_date + " " +  formated_time)
    
    // console.log(userId + ' ' + 'userId in backend')
  

    //console.log(firstName + ' ' + email)
    //const user = await User.findById(req.params._id)
    try{
        const user = await User.findByIdAndUpdate(userId, {
            status: status,
            lastSeen: lastSeen
        
        })
        return res.status(200).json({ 
            // _id: user._id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // userName: user.userName,
            // email: user.email,
            // isTraveler: user.isTraveler,
            // isAdmin: user.isAdmin,
            // profilePic: user.profilePic,
            // city: user.city,
            // country: user.country,
            // token: generateToken(user._id),
            // status: user.status,
            // lastSeen: user.lastSeen,
            // route: user.route,
            // status: user.status,
            // lastSeen: user.lastSeen
            mess: "user updated successfully"
         })
    }
    catch(err){
        return res.status(400).json({mess: err})
    }

    


    
    
   
   
})

//auth user profile
//PUT/api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    
    const {userId} = await req.body

    if(user) {
        user.firstName = req.body.firstName || user.firstName,
        user.lastName = req.body.lastName || user.lastName,
        user.email = req.body.email || user.email,
        user.city = req.body.city || user.city,
        user.country = req.body.country || user.country

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isTraveler: updatedUser.isTraveler,
            isConsumer: updatedUser.isConsumer,
            city: updatedUser.city,
            country: updatedUser.country,
            token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(404)
        throw new Error ('User not found')
    }
})

const getTravelers = asyncHandler(async(req, res) => {
    console.log('backend to get travelers')
    const users = await User.find({isTraveler: "true"})

    
    res.json(users)

    
})

const getConsumers = asyncHandler(async(req, res) => {
    console.log('backend to get consuners')
    const users = await User.find({isTraveler: "false"})

    
    res.json(users)

    
})





export {authUser, getUserData, registerUser, updateUserProfile, getTravelers, getConsumers, updateStatus, updateRoute}

