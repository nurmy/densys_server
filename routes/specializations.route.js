import express from 'express'

import {
    countSpecializations,
    createSpecialization,
    fetchAllSpecializations,
} from './../controllers/specialization.controller.js'
import authenticate from './../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, createSpecialization)
router.get('/', authenticate, fetchAllSpecializations)
router.get('/count', authenticate, countSpecializations)

export default router
