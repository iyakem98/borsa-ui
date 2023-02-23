import express from 'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'
import { sendMessage, allMessages, sendMessage2, updateMessageMarkedStatus } from '../controllers/messageController.js'
import { upload } from '../middleware/imgMiddleware.js'


 router.route("/").post(protect, upload.single('image'),  sendMessage)
 router.route("/send2").post(protect, sendMessage2)
router.route("/:chatId").get(protect, allMessages)
router.route("/marked").put(protect, updateMessageMarkedStatus)

export default router