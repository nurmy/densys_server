import express from 'express'

import {
    registerDoctor,
    fetchAllDoctors,
    fetchDoctor,
    modifyDoctor,
    countDoctors,
} from './../controllers/doctors.controller.js'
import authenticate from './../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, registerDoctor)
router.get('/', authenticate, fetchAllDoctors)
router.get('/:spec_id/count', authenticate, countDoctors)
router.get('/:spec_id', authenticate, fetchAllDoctors)
router.patch('/:id', authenticate, modifyDoctor)

export default router
