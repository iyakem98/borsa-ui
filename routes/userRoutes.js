import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, registerUser, updateUserProfile, getTravelers, getConsumers} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route ('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(getUserProfile).put(protect, updateUserProfile)
router.route('/travelers').get(getTravelers)
router.route('/consumers').get(getConsumers)



export default router 