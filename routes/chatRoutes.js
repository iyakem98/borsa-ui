import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { accessChat, fetchChats, tryChats } from '../controllers/chatController.js'
const router = express.Router()


router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/try").post(tryChats)


export default router