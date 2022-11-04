import express from 'express'

import {
    registerDoctor,
    fetchAllDoctors,
    fetchDoctor,
    modifyDoctor,
} from './../controllers/doctors.controller.js'
import authenticate from './../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, registerDoctor)
router.get('/', authenticate, fetchAllDoctors)
router.get('/:id', authenticate, fetchDoctor)
router.patch('/:id', authenticate, modifyDoctor)

export default router
