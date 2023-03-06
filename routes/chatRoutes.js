import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { accessChat, checkUserID, deleteChat, fetchChats, singleChat, singleChat2, tryChats } from '../controllers/chatController.js'
const router = express.Router()


router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/single/:id").get(protect,singleChat);
router.route("/try").post(tryChats)
router.route("/remove").delete(protect, deleteChat)
router.route("/singleTest/:id").get(protect,singleChat2);
// router.route("/user").get(protect, checkUserID)
router.route("/clean").get(checkUserID)


export default router