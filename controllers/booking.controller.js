import BookingModel from './../models/booking.model.js'

export const createBooking = async (req, res) => {
    try {
        const doc = new BookingModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            notes: req.body.notes || undefined,
            doctor_id: req.body.doctor_id,
            book_time: req.body.book_time,
        })

        const booking = await doc.save()

        res.json({
            ...booking._doc,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create booking',
        })
    }
}

export const fetchAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find({
            doctor_id: req.params.doctor_id,
            // book_time: {
            //     $gt: ISODate(Date.now()),
            // },
        })

        res.json(bookings)
    } catch (err) {
        res.status(500).json({
            error: 'Failed to find booking',
        })
    }
}
