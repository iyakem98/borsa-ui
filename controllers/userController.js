import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'


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

//auth user profile
//GET/api/user/profile
const getUserProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isTraveler: user.isTraveler,
            city: user.city,
            country: user.country,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error ('User not found')
    }

   
})

//auth user profile
//PUT/api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        user.firstName = req.body.firstName || user.firstName,
        user.lastName = req.body.lastName || user.lastName,
        user.email = req.body.email || user.email

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
            current_balance: updatedUser.current_balance,
            token: generateToken(updatedUser._id),
        })
    }
    else {
        res.status(404)
        throw new Error ('User not found')
    }
})

const getTravelers = asyncHandler(async(req, res) => {
    
    const users = await User.find({isTraveler: "true"})

    
    res.json(users)

    
})

const getConsumers = asyncHandler(async(req, res) => {
    
    const users = await User.find({isTraveler: "false"})

    
    res.json(users)

    
})





export {authUser, getUserProfile, registerUser, updateUserProfile, getTravelers, getConsumers}

