import express from 'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'
import {addOrder, getMyOrders, getOrders, getOrderById} from '../controllers/orderController.js'

router.route("/").post(addOrder).get(getOrders);
router.route("/myOrders").get(getMyOrders);
router.route("/:id").get(getOrderById);

export default router