import express from 'express'
import { addImg, delImg, getImg } from '../controllers/imgController.js'

import { upload } from '../middleware/imgMiddleware.js'
import {protect} from '../middleware/authMiddleware.js'
// import {getImg} from '../controllers/imgController'
const router = express.Router()


// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/try").post(tryChats)
// router.route("/remove").delete(protect, deleteChat)
// router.route("/user").get(protect, checkUserID)
router.route("/addImg").post(protect, upload.single('image'), addImg)
router.route("/retrieveImg").get(protect, getImg)
router.route("/delImg").delete(protect, delImg)


export default router