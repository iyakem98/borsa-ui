
import Order from '../models/orderModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

const getOrders = asyncHandler(async(req, res) => {
    
    const users = 'I will show you all orders admin!'

    
    res.json(users)

    
})

const getMyOrders = asyncHandler(async(req, res) => {
    
    const users = 'I will show you YOUR orders'

    
    res.json(users)

    
})

const getOrderById = asyncHandler(async(req, res) => {
    
    const users = 'I will show you each order by id admin'

    
    res.json(users)

    
})

const addOrder = asyncHandler(async(req, res) => {
    
    const {
        orderItems,
        bringer,
        shippingAddress,
        deliveryPrice,
        orderDate,
        shippingPrice,
        totalPrice,
      } = req.body
    
      if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        })
    
        const createdOrder = await order.save()
    
        res.status(201).json(createdOrder)
      }

    
    res.json(users)

    
})

export {getOrders, getOrderById, getMyOrders, addOrder}