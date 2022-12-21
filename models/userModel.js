import mongoose from 'mongoose'
import bcrypt from "bcryptjs";


/*const reviewSchema = mongoose.Schema({ //this is a separate schema for each review that a user has; I have added it here because it is fully related to the userModel
    reviewer: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User" 
    },

    rating: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
) 

const destinationSchema = mongoose.Schema({ //this is a separate schema for each destination that a traveler has
    city: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true,
    },

    flightDate: {
        type: Date,
    }
}) 

const itemSchema = mongoose.Schema({ //this is a separate schema for each item a buyer wants 

    itemType: {
        type: String,
        required: true
    },

    itemWeight: {
        type: String,
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

}) */

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        
    },

    isTraveler: {
        type: Boolean,
        required: true,
        default: false
    },

    isConsumer: {
        type: Boolean,
        required: true,
        default: false
    },

    city: {
        type: String,
        required: true,
        default: "Addis Ababa"
    },
    
    country: {
        type: String,
        required: true,
        default: "Ethiopia"
    },

    profilePic: {
        type: String,
        required: true, 
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    /* reviews: [reviewSchema], //this is supposed to handle an array of all the reviews of the user 
    rating: {  //this is supposed to handle the average rating out of all the ratings that the user has been given
        type: Number,
        required: true,
        default: 0,
    },

    numReviews: { //this handles the number of reviews a user has. Typically, if a user has less than 3 reviews, we won't display it to others because it might be unreliable
        type: Number,
        required: true,
        default: 0
    }, 

    destinations: [destinationSchema],  //this is supposed to handle a list of all destinations a traveler is traveling to
    
    totalSpace: {  //this is supposed to handle the total space that a traveler has 
        type: String,
        required: true
    }, 

    showTravelerCard: {  //this is a boolean on whether or not a traveler wants to be visible to others 
        type: Boolean,
        required: true,
        default: true,
    },

    itemList: [itemSchema],  //this is supposed to hancle a list of items that a buyer wants 

    totalItemWeight: { //this handles the added total weight of all the items that a buyer wants
        type: String,
        required: true,
    },

    showBuyerCard: { //this is a boolean on whether or not a buyer wants to be visible to others 
        type: Boolean,
        required: true,
        default: true,
    }, */

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    

    
}, {
    timestamps: true,

})

userSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User