import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { accessChat, checkUserID, deleteChat, fetchChats, tryChats } from '../controllers/chatController.js'
const router = express.Router()


router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/try").post(tryChats)
router.route("/remove").delete(protect, deleteChat)
// router.route("/user").get(protect, checkUserID)
router.route("/clean").get(checkUserID)


export default router