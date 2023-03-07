import express from 'express'
const router = express.Router()
import {authUser, getUserData, registerUser, updateUserProfile, getTravelers, getConsumers, updateStatus, updateRoute} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route ('/').post(registerUser)
router.post('/login', authUser)
// router.route('/profile').get(getUserProfile).put(protect, updateUserProfile)
router.route('/travelers').get(getTravelers)
router.route('/consumers').get(getConsumers)
router.route('/route').put(protect, updateRoute)
router.route('/ret/:id').get(protect, getUserData)
router.route('/ret/rec/:id').get(getUserData)
router.route('/stat').put(protect,updateStatus)



export default router 