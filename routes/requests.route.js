import express from 'express'

import {
    createRequest,
    fetchAllRequests,
    deleteRequest,
} from '../controllers/request.controller.js'
import authenticate from '../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, createRequest)
router.get('/', authenticate, fetchAllRequests)
router.delete('/:id', authenticate, deleteRequest)

export default router
