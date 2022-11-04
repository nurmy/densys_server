import express from 'express'

import {
    registerPatient,
    fetchAllPatients,
    fetchPatient,
    modifyPatient,
} from './../controllers/patients.controller.js'
import authenticate from './../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, registerPatient)
router.get('/', authenticate, fetchAllPatients)
router.get('/:id', authenticate, fetchPatient)
router.patch('/:id', authenticate, modifyPatient)

export default router
