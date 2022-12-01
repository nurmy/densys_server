import express from 'express'

import {
    createBooking,
    fetchAllBookings,
} from './../controllers/booking.controller.js'
import authenticate from './../utils/authenticate.js'

const router = express.Router()

router.post('/', authenticate, createBooking)
router.get('/:doctor_id', authenticate, fetchAllBookings)

export default router
