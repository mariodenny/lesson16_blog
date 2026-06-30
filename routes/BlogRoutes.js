import express from 'express'
const router = express.Router()
import { isAuthenticated } from '../middlewares/authMiddleware.js'
import {
    dashboard,
    createForm,
    createPost
} from '../controllers/BlogController.js'


router.get("/", isAuthenticated, dashboard)
router.get("/create", isAuthenticated, createForm)
router.post("/create", isAuthenticated, createPost)

export default router
