import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      bringer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      orderItems: [
        {
          name: { type: String, required: true },
          category: {type: String, required: true},
          qty: { type: Number, required: true },
          image: { type: String, required: false },
          weight: { type: Number, required: true },
        },
      ],

      deliveryPrice: {
        type: Number,
        required: true,
      },

      orderDate: {
        type: Date,
        required: true,
      }

      /*isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
 
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      }, */
    }, 
    {
      timestamps: true,
    }
  )
  
  const Order = mongoose.model('Order', orderSchema)
  
  export default Order