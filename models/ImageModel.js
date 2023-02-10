import mongoose from 'mongoose'

const ImgSchema = mongoose.Schema ({
   
    image: {
        type: String,
        trim: true,
        required: false
    },

  
    user: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    }],
}, 
{
    timestamps: true,

}
)

export const Img = mongoose.model('Img', ImgSchema)

